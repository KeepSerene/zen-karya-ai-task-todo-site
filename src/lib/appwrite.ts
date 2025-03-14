import { Client, Databases, ID, Query } from "appwrite";

// Initialize the SDK
const client = new Client();
client
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setEndpoint("https://cloud.appwrite.io/v1");

const databases = new Databases(client);

export { databases, ID, Query };
