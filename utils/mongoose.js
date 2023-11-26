const mongoose = require("mongoose");

const mongoConnect = async () => {
  const client = await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.iddzjlv.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
  );
  return client;
};

module.exports = mongoConnect();
