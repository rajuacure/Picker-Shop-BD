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
/*=========================================
Coupon System
=========================================*/

const couponButton =
document.getElementById("applyCheckoutCoupon");

if(couponButton){

couponButton.addEventListener("click",()=>{

const couponInput =
document.getElementById("checkoutCoupon");

const message =
document.getElementById("checkoutCouponMessage");

const code =
couponInput.value.trim().toUpperCase();

const subtotal = cart.reduce(

(sum,item)=>sum+(item.price*item.quantity),

0

);

discount = 0;

if(code==="PICKER10"){

discount = subtotal * 0.10;

message.style.color="#16a34a";

message.textContent="10% discount applied successfully.";

}else if(code==="FREESHIP"){

deliveryCharge = 0;

message.style.color="#16a34a";

message.textContent="Free delivery applied.";

}else{

message.style.color="#dc2626";

message.textContent="Invalid coupon code.";

}

updateSummary(subtotal);

});

}

/*=========================================
Generate Order ID
=========================================*/

function generateOrderId(){

const now = Date.now();

const random =

Math.floor(Math.random()*9000)+1000;

return "PSBD-"+now+"-"+random;

}

/*=========================================
Checkout Form
=========================================*/

const checkoutForm =
document.getElementById("checkoutForm");

checkoutForm.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

const name =
document.getElementById("customerName").value.trim();

const phone =
document.getElementById("customerPhone").value.trim();

const email =
document.getElementById("customerEmail").value.trim();

const district =
document.getElementById("customerDistrict").value.trim();

const address =
document.getElementById("customerAddress").value.trim();

const payment =

document.querySelector(

'input[name="payment"]:checked'

).value;

const delivery =

document.querySelector(

'input[name="delivery"]:checked'

).value;

if(

!name ||

!phone ||

!district ||

!address

){

alert("Please fill all required fields.");

return;

}

if(cart.length===0){

alert("Your cart is empty.");

return;

}

const subtotal = cart.reduce(

(sum,item)=>

sum+(item.price*item.quantity),

0

);

const total =

subtotal +

deliveryCharge -

discount;

const order = {

orderId:generateOrderId(),

customer:{

name,

phone,

email,

district,

address

},

paymentMethod:payment,

deliveryType:delivery,

products:cart,

subtotal,

deliveryCharge,

discount,

grandTotal:total,

status:"Pending",

createdAt:serverTimestamp()

};
