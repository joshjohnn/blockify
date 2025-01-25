import { MongoClient } from "mongodb";

const uri = "mongodb+srv://efirecorp:blocky1234@cluster0.tvm79.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Connection string from MongoDB Atlas or local MongoDB
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}
  client = new MongoClient(uri, options);
  clientPromise = client.connect();


export default clientPromise;
