/*=========================================
Picker Shop BD
Checkout System
Part 1
=========================================*/

import { db } from "./firebase.js";

import {

collection,

addDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/*=========================================
Cart Data
=========================================*/

let cart = JSON.parse(

localStorage.getItem("picker_cart")

) || [];

const checkoutItems =

document.getElementById("checkoutItems");

const subtotalElement =

document.getElementById("checkoutSubtotal");

const deliveryElement =

document.getElementById("checkoutDelivery");

const discountElement =

document.getElementById("checkoutDiscount");

const totalElement =

document.getElementById("checkoutGrandTotal");

/*=========================================
Variables
=========================================*/

let deliveryCharge = 80;

let discount = 0;

/*=========================================
Render Checkout Items
=========================================*/

function renderCheckout(){

if(!checkoutItems) return;

checkoutItems.innerHTML="";

let subtotal = 0;

cart.forEach(item=>{

subtotal += item.price * item.quantity;

checkoutItems.innerHTML += `

<div class="summary-item">

<span>

${item.name}

× ${item.quantity}

</span>

<strong>

৳${(item.price*item.quantity).toFixed(2)}

</strong>

</div>

`;

});

updateSummary(subtotal);

}

/*=========================================
Update Summary
=========================================*/

function updateSummary(subtotal){

subtotalElement.textContent =

"৳"+subtotal.toFixed(2);

deliveryElement.textContent =

"৳"+deliveryCharge.toFixed(2);

discountElement.textContent =

"৳"+discount.toFixed(2);

const total =

subtotal + deliveryCharge - discount;

totalElement.textContent =

"৳"+total.toFixed(2);

}

/*=========================================
Delivery Charge
=========================================*/

document

.querySelectorAll(

'input[name="delivery"]'

)

.forEach(radio=>{

radio.addEventListener("change",()=>{

deliveryCharge =

radio.value==="inside"

?80

:150;

let subtotal = cart.reduce(

(sum,item)=>

sum+(item.price*item.quantity),

0

);

updateSummary(subtotal);

});

});
