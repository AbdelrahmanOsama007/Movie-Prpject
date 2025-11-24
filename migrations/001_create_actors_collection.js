const mongoose = require("mongoose");
require("dotenv").config();

const up = async () => {
  try {
    const db = mongoose.connection.db;

    // Create actors collection with schema validation
    await db.createCollection("actors", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "age", "gender", "nationality", "image"],
          properties: {
            name: {
              bsonType: "string",
              description: "Actor name is required and must be a string",
            },
            age: {
              bsonType: "number",
              description: "Actor age is required and must be a number",
            },
            gender: {
              bsonType: "string",
              description: "Actor gender is required and must be a string",
            },
            nationality: {
              bsonType: "string",
              description: "Actor nationality is required and must be a string",
            },
            image: {
              bsonType: "string",
              description: "Actor image is required and must be a string",
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
    await db.collection("actors").createIndex({ name: 1 });

    console.log("✓ Created actors collection with schema validation");

    // Insert fake data
    const actorsCount = await db.collection("actors").countDocuments();
    if (actorsCount === 0) {
      const fakeActors = [
        {
          name: "Leonardo DiCaprio",
          age: 49,
          gender: "Male",
          nationality: "American",
          image: "https://example.com/images/leonardo-dicaprio.jpg",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tom Hanks",
          age: 67,
          gender: "Male",
          nationality: "American",
          image: "https://example.com/images/tom-hanks.jpg",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Meryl Streep",
          age: 74,
          gender: "Female",
          nationality: "American",
          image: "https://example.com/images/meryl-streep.jpg",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Denzel Washington",
          age: 69,
          gender: "Male",
          nationality: "American",
          image: "https://example.com/images/denzel-washington.jpg",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Emma Watson",
          age: 33,
          gender: "Female",
          nationality: "British",
          image: "https://example.com/images/emma-watson.jpg",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chris Hemsworth",
          age: 40,
          gender: "Male",
          nationality: "Australian",
          image: "https://example.com/images/chris-hemsworth.jpg",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Scarlett Johansson",
          age: 39,
          gender: "Female",
          nationality: "American",
          image: "https://example.com/images/scarlett-johansson.jpg",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Brad Pitt",
          age: 60,
          gender: "Male",
          nationality: "American",
          image: "https://example.com/images/brad-pitt.jpg",
          movies: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await db.collection("actors").insertMany(fakeActors);
      console.log(`✓ Inserted ${fakeActors.length} fake actors`);
    } else {
      console.log(
        `⚠ Actors collection already has ${actorsCount} documents, skipping fake data insertion`
      );
    }
  } catch (error) {
    if (error.code === 48) {
      // Collection already exists
      console.log("⚠ Actors collection already exists, skipping creation");
    } else {
      throw error;
    }
  }
};

const down = async () => {
  try {
    const db = mongoose.connection.db;
    await db.collection("actors").drop();
    console.log("✓ Dropped actors collection");
  } catch (error) {
    if (error.code === 26) {
      // Collection doesn't exist
      console.log("⚠ Actors collection does not exist, skipping drop");
    } else {
      throw error;
    }
  }
};

module.exports = { up, down };
