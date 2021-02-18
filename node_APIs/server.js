require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();
const routes = require("./routes");

routes.configure(app, router);
app.use(express.json());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
