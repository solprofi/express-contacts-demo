const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");

require("dotenv").config();

connectDb();

const app = express();

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

const port = process.env.PORT || 3000 ;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});