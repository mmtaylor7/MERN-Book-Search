const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://phimu:Revolution9@cluster0.ys8cpey.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log(" Mongoose is connected")
);

module.exports = mongoose.connection;
