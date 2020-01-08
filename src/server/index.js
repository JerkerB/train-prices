const express = require('express');
const routes = require("./routes/routes.js");
const app = express();

routes(app);

app.use(express.static('dist'));

app.listen(3000, () => { })