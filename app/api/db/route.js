import clientPromise from "../../lib/mongodb";

export async function GET(req) {
  try {
    console.log("Connecting to MongoDB...");
    const client = await clientPromise; // Ensure this is resolving correctly
    console.log("Connected to MongoDB.");

    const db = client.db("test"); // Replace with your database name
    console.log("Database selected:", db.databaseName);

    const collection = db.collection("test_collection"); // Replace with your collection name
    console.log("Collection selected:", collection.collectionName);

    const data = await collection.find({}).toArray();
    console.log("Data fetched:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
