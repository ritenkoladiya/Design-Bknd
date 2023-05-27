const express = require('express');
const app = express();
const cors = require('cors');


const port = 8000;
require('./Config sequelize');

app.get("/", (res, resp) => {
    resp.end("home page")
});

const userRouter = require("./Router/UserRouter")
const productRouter = require("./Router/ProductRouter")

app.use(cors('*'));
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use("/user_image", express.static("img"))
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})