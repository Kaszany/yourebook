const express = require ('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));





app.get('/', (req, res) => {

    res.send('Home')

});

app.get('/api/products', (req, res) => {

    res.send('products')

});

app.get('/api/customers', (req, res) => {

    res.send('customers')

}); 

 