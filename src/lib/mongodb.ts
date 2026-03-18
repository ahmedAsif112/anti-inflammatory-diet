import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
}

// Global cache to reuse connection in development (hot reload)
declare global {
    var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
        global._mongoClient = new MongoClient(uri);
    }
    client = global._mongoClient;
} else {
    client = new MongoClient(uri);
}

export async function getDb() {
    await client.connect();
    return client.db("antiinflammatory");
}

export default client;