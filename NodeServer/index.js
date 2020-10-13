const app = require('./express-config');
require('dotenv').config();

app.listen(`${process.env.port}`, () => {
    console.log(`Server started at port : ${process.env.port}`)
});
