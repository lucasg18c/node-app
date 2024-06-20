import mongoose from "mongoose";

interface MongoDatabaseOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: MongoDatabaseOptions) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, { dbName });
      return true;
    } catch (error) {
      console.log("Mongo db error");
      throw error;
    }
  }
}
