// create express server
const express = require("express");
const app = express(); // initialize express
const cors = require("cors"); // for cross browser access
const dotEnv = require("dotenv"); // to store application crediantial
const mongoose = require("mongoose"); // to connect with database
const { request, response } = require("express");

// configure cors
app.use(cors());

// configure express js to receive the form data
app.use(express.json()); // since, we get form data in JSON format  Ex.- request.body.first_name

// configure dotEnv
dotEnv.config();

// get Host_Name and Port number
const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

// need one "router" to write all REST_API configuration.  So, configure the router
app.use("/api", require("./router/productRouter"));

// Now, connecting MongoDB database
// below "connect" function returns a "promis"
mongoose
  .connect(process.env.MONGO_DB_LOCAL_URL)
  .then((response) => {
    console.log("Connected to MongoDB Successful..............");
  })
  .catch((error) => {
    console.error(error);

    // To stop the node js process if unable to connect to DB
    // b'z, w/o MongoDB connection there is no point of doing 'routing' and
    //  getting form data or all b'z there is no DB. So, we stop the process
    process.exit(1);
  });

//  Empty URL, to just see the server is running or not.
app.get("/", (request, response) => {
  response.send(`<h2>Welcome to BigBasket Server side Configuration.</h2>`);
});

//  finally listen to "port"number and "hostname"
app.listen(port, hostname, () => {
  // below message is for confermation only that is server is started or not.
  console.log(`Express Server is starte at http://${hostname}:${port}`);
});
