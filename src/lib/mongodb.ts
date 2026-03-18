import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
    throw new Error("MONGODB_URI is not defined");
}

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

// Global cache
const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(uri, options);
    }
    client = globalWithMongo._mongoClient;
} else {
    client = new MongoClient(uri, options);
}

export async function getDb(dbName = "antiinflammatory") {
    await client.connect();
    return client.db(dbName);
}