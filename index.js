require("dotenv").config();

// server
const express = require("express");
const cors = require("cors");
// importing router
const router = require("./Routes/routes");
const server = express();

server.use(cors());
server.use(express.json());
//this two middleware make req.body accessible otherwise it will throw error
//server.use(express.urlencoded({ extended: true }));
server.use(router);

// for getting uploaded image to frontend
server.use("/foodimage", express.static("./public/image"));
// connecting mongodb
require("./Connections/connection");

const port = 5000 || process.env.port;

server.listen(port, () => {
  console.log(`_EMS server Started at Port ${port}`);
});
