import { MongoClient, Db } from "mongodb";

// Connection URI
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ushuari";

// MongoDB client and database references
let client: MongoClient;
let db: Db;

// Database connection function
export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  // If we already have a connection, return it
  if (client && db) {
    return { client, db };
  }

  // Create a new client connection
  client = new MongoClient(uri);

  // Connect to the server
  await client.connect();

  // Get the database
  db = client.db();

  return { client, db };
}

// Collection names
export const Collections = {
  USERS: "users",
  ORGANIZATIONS: "organizations",
  CASES: "cases",
  CASE_MESSAGES: "caseMessages",
  ADMIN_LIST: "adminList",
};

// Helper to get a collection
export async function getCollection(collectionName: string) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}
