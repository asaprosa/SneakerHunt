const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const apiRouter = require('./routes/apiRoutes');

const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api', apiRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server started at port ${process.env.PORT}`);
});