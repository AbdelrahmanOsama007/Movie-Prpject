const mongoose = require("mongoose");
require("dotenv").config();

const up = async () => {
  try {
    const db = mongoose.connection.db;

    // Create category collection with schema validation
    await db.createCollection("categories", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "description"],
          properties: {
            name: {
              bsonType: "string",
              description: "Category name is required and must be a string",
            },
            description: {
              bsonType: "string",
              description:
                "Category description is required and must be a string",
            },
            movies: {
              bsonType: "array",
              items: {
                bsonType: "objectId",
              },
              description: "Movies array must contain ObjectIds",
            },
            createdAt: {
              bsonType: "date",
            },
            updatedAt: {
              bsonType: "date",
            },
          },
        },
      },
    });

    // Create indexes
    await db
      .collection("categories")
      .createIndex({ name: 1 }, { unique: true });

    console.log("✓ Created categories collection with schema validation");

    // Insert fake data
    const categoriesCount = await db.collection("categories").countDocuments();
    if (categoriesCount === 0) {
      const fakeCategories = [
        {
          name: "Action",
          description:
            "High-energy films with intense physical action, stunts, and combat sequences.",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Comedy",
          description:
            "Funny and entertaining films designed to make audiences laugh and feel good.",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Drama",
          description:
            "Serious, plot-driven presentations portraying realistic characters and situations.",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Horror",
          description:
            "Films designed to scare, shock, and thrill viewers with suspense and fear.",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Romance",
          description:
            "Love stories focusing on romantic relationships and emotional connections.",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sci-Fi",
          description:
            "Science fiction films featuring futuristic concepts, technology, and space exploration.",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Thriller",
          description:
            "Suspenseful films that create excitement, tension, and anticipation.",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fantasy",
          description:
            "Films featuring magical, supernatural, or otherworldly elements and creatures.",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await db.collection("categories").insertMany(fakeCategories);
      console.log(`✓ Inserted ${fakeCategories.length} fake categories`);
    } else {
      console.log(
        `⚠ Categories collection already has ${categoriesCount} documents, skipping fake data insertion`
      );
    }
  } catch (error) {
    if (error.code === 48) {
      // Collection already exists
      console.log("⚠ Categories collection already exists, skipping creation");
    } else {
      throw error;
    }
  }
};

const down = async () => {
  try {
    const db = mongoose.connection.db;
    await db.collection("categories").drop();
    console.log("✓ Dropped categories collection");
  } catch (error) {
    if (error.code === 26) {
      // Collection doesn't exist
      console.log("⚠ Categories collection does not exist, skipping drop");
    } else {
      throw error;
    }
  }
};

module.exports = { up, down };
