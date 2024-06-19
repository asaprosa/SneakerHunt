const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/apiRoutes');
const errorHandler = require('./utils/errorHandler');
const { PORT } = require('./configs/serverConfig');

const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(PORT, (req, res) => {
    console.log(`Server started at port ${PORT}`);
});