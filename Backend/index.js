const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const apiRouter = require('./routes/apiRoutes');
const errorHandler = require('./utils/errorHandler');
const connectDB = require('./configs/dbConfig');
const { PORT } = require('./configs/serverConfig');

const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cookieParser());

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    await connectDB();
});