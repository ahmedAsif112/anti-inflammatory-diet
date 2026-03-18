import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
}

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    tls: true,
    tlsAllowInvalidCertificates: false,
    retryWrites: true,
};
// hwewenf
declare global {
    var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
        global._mongoClient = new MongoClient(uri, options);
    }
    client = global._mongoClient;
} else {
    client = new MongoClient(uri, options);
}

export async function getDb() {
    await client.connect();
    return client.db("antiinflammatory");
}

export default client;