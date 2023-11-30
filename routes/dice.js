const express = require('express');
const router = express.Router();


// Define your array of products
const products = [
    {
        id: 1,
        name: 'Firey',
        description: 'Description Here',
        price: 29.99,
        image: 'Frontend/assets/dice1.png',
    },
    {
        id: 2,
        name: 'Witchy',
        description: 'Description Here',
        price: 34.99,
        image: 'Frontend/assets/dice2.png',
    },
    {
        id: 3,
        name: 'Popsicle',
        description: 'Description Here',
        price: 34.99,
        image: 'Frontend/assets/dice3.png',
    },
    {
        id: 4,
        name: 'Earthy',
        description: 'Description Here',
        price: 34.99,
        image: 'Frontend/assets/dice4.png',
    },
    {
        id: 5,
        name: 'Galaxy',
        description: 'Description Here',
        price: 34.99,
        image: 'Frontend/assets/dice5.png',
    },

];


// This block logs information and renders the 'dice' template with the 'products' data
router.get('/', function (request, response) {
    console.log('Accessed /dice route');
    console.log('Products:', products);
    response.render('dice', { products });
});

// Sort products by price
router.get('/sort-by-price', function (request, response) {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    response.render('dice', { products: sortedProducts });
});


// Add item to the cart
router.post('/add-to-cart/:productId', function (request, response) {
    const productId = parseInt(request.params.productId, 10);
    
    // Find the product in the array
    const selectedProduct = products.find(product => product.id === productId);

    if (selectedProduct) {
        // Add the product to the cart in the session
        if (!request.session.cart) {
            request.session.cart = [];
        }

        request.session.cart.push(selectedProduct);
        response.redirect('/dice');
    } else {
        response.status(404).send('Product not found');
    }
});

module.exports = router;

