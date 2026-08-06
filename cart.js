/*=========================================
Picker Shop BD
Cart System
Part 1
=========================================*/

import {
db
} from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/*=========================================
Cart Variables
=========================================*/

let cart = JSON.parse(localStorage.getItem("picker_cart")) || [];

const cartContainer =
document.getElementById("cartItemsContainer");

const emptyCart =
document.getElementById("emptyCart");

const subtotalElement =
document.getElementById("cartSubtotal");

const deliveryElement =
document.getElementById("deliveryCharge");

const totalElement =
document.getElementById("grandTotal");

const cartCount =
document.querySelector(".cart-count");

/*=========================================
Save Cart
=========================================*/

function saveCart(){

localStorage.setItem(

"picker_cart",

JSON.stringify(cart)

);

updateCartCount();

}

/*=========================================
Update Cart Count
=========================================*/

function updateCartCount(){

const totalQty = cart.reduce(

(sum,item)=>sum+item.quantity,

0

);

if(cartCount){

cartCount.textContent = totalQty;

}

}

/*=========================================
Add To Cart
=========================================*/

export function addToCart(product){

const existing = cart.find(

item=>item.id===product.id

);

if(existing){

existing.quantity++;

}else{

cart.push({

...product,

quantity:1

});

}

saveCart();

renderCart();

}

/*=========================================
Remove Item
=========================================*/

function removeItem(id){

cart = cart.filter(

item=>item.id!==id

);

saveCart();

renderCart();

}

/*=========================================
Quantity
=========================================*/

function increaseQty(id){

const item = cart.find(

item=>item.id===id

);

if(item){

item.quantity++;

saveCart();

renderCart();

}

}

function decreaseQty(id){

const item = cart.find(

item=>item.id===id

);

if(item){

item.quantity--;

if(item.quantity<=0){

removeItem(id);

}else{

saveCart();

renderCart();

}

}

}

/*=========================================
Calculate Totals
=========================================*/

function calculateTotals(){

let subtotal = 0;

cart.forEach(item=>{

subtotal += item.price * item.quantity;

});

let delivery = subtotal>2000 ? 0 : 120;

let total = subtotal + delivery;

subtotalElement.textContent =
"৳"+subtotal.toFixed(2);

deliveryElement.textContent =
"৳"+delivery.toFixed(2);

totalElement.textContent =
"৳"+total.toFixed(2);

}
