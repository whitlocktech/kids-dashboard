import http from "http";
import dotenv from "dotenv";
dotenv.config();

import { mongoConnect } from "./utils/mongo.js";
import { setupAdminAccount } from "./model/users/users.model.js";

import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await setupAdminAccount(); // Call the setupAdminAccount function
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
