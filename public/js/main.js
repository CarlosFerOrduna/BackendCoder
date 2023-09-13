import productManager from '/js/products.js';
import messagesManager from '/js/messages.js';
import cartManager from '/js/cart.js';

const socket = io();

// PRODUCTS
productManager.loadProducts(socket);
productManager.eventCreateProduct(socket);
productManager.eventDeleteProduct(socket);

// MESSAGES
messagesManager.swalWraper();
messagesManager.loadMessages(socket);
messagesManager.insertMessage(socket);

//addProductInCart
cartManager.addProductInCart();
cartManager.goToCart();
