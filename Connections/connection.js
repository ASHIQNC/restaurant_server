const mongoose = require("mongoose");

mongoose
  .connect(process.env.BASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("___Mongodb connected");
  })
  .catch((error) => {
    console.log("connection error", error);
  });
