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
/*=========================================
Render Cart
=========================================*/

function renderCart(){

if(!cartContainer) return;

cartContainer.innerHTML="";

if(cart.length===0){

if(emptyCart){

emptyCart.style.display="block";

}

calculateTotals();

updateCartCount();

return;

}

if(emptyCart){

emptyCart.style.display="none";

}

cart.forEach(item=>{

cartContainer.innerHTML += `

<div class="cart-item">

<div class="product-info">

<img src="${item.image}" alt="${item.name}">

<div class="product-details">

<h4>${item.name}</h4>

<p>${item.category || ""}</p>

</div>

</div>

<div class="product-price">

৳${Number(item.price).toFixed(2)}

</div>

<div class="quantity-box">

<button

class="quantity-btn decrease-btn"

data-id="${item.id}">

-

</button>

<input

class="quantity-input"

type="text"

value="${item.quantity}"

readonly>

<button

class="quantity-btn increase-btn"

data-id="${item.id}">

+

</button>

</div>

<div class="product-price">

৳${(item.price*item.quantity).toFixed(2)}

</div>

<button

class="remove-btn"

data-id="${item.id}">

<i class="fas fa-trash"></i>

</button>

</div>

`;

});

bindCartEvents();

calculateTotals();

updateCartCount();

}

/*=========================================
Bind Events
=========================================*/

function bindCartEvents(){

document.querySelectorAll(".increase-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

increaseQty(btn.dataset.id);

});

});

document.querySelectorAll(".decrease-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

decreaseQty(btn.dataset.id);

});

});

document.querySelectorAll(".remove-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

removeItem(btn.dataset.id);

});

});

}

/*=========================================
Clear Cart
=========================================*/

const clearCartBtn=

document.getElementById("clearCart");

if(clearCartBtn){

clearCartBtn.addEventListener("click",()=>{

if(confirm("Clear your shopping cart?")){

cart=[];

saveCart();

renderCart();

}

});

}

/*=========================================
Coupon System
=========================================*/

const couponBtn=

document.getElementById("applyCoupon");

if(couponBtn){

couponBtn.addEventListener("click",()=>{

const code=

document.getElementById("couponCode")

.value

.trim()

.toUpperCase();

const message=

document.getElementById("couponMessage");

if(code==="PICKER10"){

message.style.color="#16a34a";

message.textContent=

"Coupon Applied (10% Discount)";

let subtotal=cart.reduce(

(sum,item)=>sum+(item.price*item.quantity),

0

);

let delivery=subtotal>2000?0:120;

let discount=subtotal*0.10;

subtotalElement.textContent=

"৳"+subtotal.toFixed(2);

deliveryElement.textContent=

"৳"+delivery.toFixed(2);

totalElement.textContent=

"৳"+(subtotal-discount+delivery).toFixed(2);

}else{

message.style.color="#dc2626";

message.textContent=

"Invalid Coupon Code";

}

});

}
