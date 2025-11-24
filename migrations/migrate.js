const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const MIGRATIONS_DIR = path.join(__dirname);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Get migration status
const getMigrationStatus = async () => {
  const db = mongoose.connection.db;
  try {
    const status = await db.collection("migrations").findOne({});
    return status || { lastRun: null, executed: [] };
  } catch (error) {
    // Migrations collection doesn't exist yet
    return { lastRun: null, executed: [] };
  }
};

// Save migration status
const saveMigrationStatus = async (migrationFile, executed) => {
  const db = mongoose.connection.db;

  // Ensure migrations collection exists
  const collections = await db
    .listCollections({ name: "migrations" })
    .toArray();
  if (collections.length === 0) {
    await db.createCollection("migrations");
  }

  await db.collection("migrations").updateOne(
    {},
    {
      $set: {
        lastRun: new Date(),
        executed: executed,
      },
    },
    { upsert: true }
  );
};

// Run migrations
const runMigrations = async (direction = "up") => {
  await connectDB();

  try {
    // Get all migration files
    const files = fs
      .readdirSync(MIGRATIONS_DIR)
      .filter((file) => file.endsWith(".js") && file !== "migrate.js")
      .sort();

    if (files.length === 0) {
      console.log("No migration files found");
      return;
    }

    const status = await getMigrationStatus();
    const executed = status.executed || [];

    console.log(`\nRunning migrations (${direction})...\n`);

    const filesToProcess =
      direction === "up"
        ? files.filter((file) => !executed.includes(file))
        : files.filter((file) => executed.includes(file)).reverse();

    for (const file of filesToProcess) {
      const migration = require(path.join(MIGRATIONS_DIR, file));

      try {
        if (direction === "up") {
          await migration.up();
          executed.push(file);
          await saveMigrationStatus(file, executed);
          console.log(`✓ Migration ${file} completed\n`);
        } else {
          await migration.down();
          executed.splice(executed.indexOf(file), 1);
          await saveMigrationStatus(file, executed);
          console.log(`✓ Rollback ${file} completed\n`);
        }
      } catch (error) {
        console.error(`✗ Error in ${file}:`, error.message);
        throw error;
      }
    }

    if (filesToProcess.length === 0) {
      console.log("No migrations to run");
    } else {
      console.log(
        `\n✓ All migrations ${
          direction === "up" ? "completed" : "rolled back"
        } successfully`
      );
    }
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// CLI
const direction = process.argv[2] || "up";

if (direction === "up" || direction === "down") {
  runMigrations(direction);
} else {
  console.log("Usage: node migrations/migrate.js [up|down]");
  process.exit(1);
}
