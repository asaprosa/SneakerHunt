const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server started at port ${process.env.PORT}`);
});