import mongoose from "mongoose";

const dbName = "docker-app";

const connect = (url) => {
  return mongoose.connect(url || `mongodb://mongo:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
export default connect;
