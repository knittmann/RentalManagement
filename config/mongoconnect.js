import mongoose from "mongoose";
import appConfig from "./env";

mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
    console.log('MongoDB Connection Established');
});

mongoose.connection.on("reconnected", () => {
    console.log('MongoDB connection reestablished');
});

mongoose.connection.on("disconnected", () => {
    console.log('MongoDB connection disconnected');
});

mongoose.connection.on("close", () => {
    console.log('MongoDB connection closed');
});

mongoose.connection.on("error", error => {
    console.log('MongoDB ERROR: ' + error);
    process.exit(1);
});

mongoose.set("debug", appConfig.mongoDebug);

const connectMongo = async () => {

  let connectionuri = appConfig.dbConnectionString;

  await mongoose.connect(connectionuri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};

export default connectMongo;