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
/*=========================================
Save Order To Firebase
=========================================*/

const placeOrderBtn =
document.getElementById("placeOrderBtn");

try {

if(placeOrderBtn){

placeOrderBtn.disabled = true;

placeOrderBtn.classList.add("loading");

placeOrderBtn.innerHTML = `
<i class="fas fa-spinner fa-spin"></i>
Processing Order...
`;

}

/*=========================================
Create Order In Firestore
=========================================*/

const orderRef = await addDoc(

collection(db, "orders"),

order

);

/*=========================================
Prepare Success Data
=========================================*/

const successData = {

firestoreId: orderRef.id,

orderId: order.orderId,

customerName: order.customer.name,

phone: order.customer.phone,

paymentMethod: order.paymentMethod,

subtotal: order.subtotal,

deliveryCharge: order.deliveryCharge,

discount: order.discount,

grandTotal: order.grandTotal,

status: order.status

};

/*=========================================
Save Last Order Locally
=========================================*/

localStorage.setItem(

"picker_last_order",

JSON.stringify(successData)

);

/*=========================================
Clear Shopping Cart
=========================================*/

cart = [];

localStorage.removeItem("picker_cart");

/*=========================================
Redirect To Success Page
=========================================*/

window.location.href =

"order-success.html?order=" +

encodeURIComponent(order.orderId);

} catch(error) {

console.error(

"Order creation failed:",

error

);

alert(

"Order could not be placed. Please try again."

);

if(placeOrderBtn){

placeOrderBtn.disabled = false;

placeOrderBtn.classList.remove("loading");

placeOrderBtn.innerHTML = `
<i class="fas fa-lock"></i>
Place Order
`;

}

}

}

);

/*=========================================
Phone Validation
=========================================*/

const phoneInput =
document.getElementById("customerPhone");

if(phoneInput){

phoneInput.addEventListener("input",()=>{

phoneInput.value =

phoneInput.value.replace(/[^0-9+]/g,"");

});

}

/*=========================================
Prevent Checkout With Empty Cart
=========================================*/

function checkEmptyCart(){

if(cart.length > 0){

return;

}

if(checkoutItems){

checkoutItems.innerHTML = `

<div class="empty-checkout">

<p>Your shopping cart is empty.</p>

<a href="products.html" class="btn">
Shop Now
</a>

</div>

`;

}

if(placeOrderBtn){

placeOrderBtn.disabled = true;

}

}

/*=========================================
Update Header Cart Count
=========================================*/

function updateCheckoutCartCount(){

const count = cart.reduce(

(total,item)=>

total + Number(item.quantity || 0),

0

);

document

.querySelectorAll(".cart-count")

.forEach(element=>{

element.textContent = count;

});

}

/*=========================================
Initialize Checkout
=========================================*/

function initCheckout(){

renderCheckout();

checkEmptyCart();

updateCheckoutCartCount();

}

document.addEventListener(

"DOMContentLoaded",

initCheckout

);

/*=========================================
Checkout Ready
=========================================*/

console.log(

"%cPicker Shop BD Checkout Ready",

"color:#16a34a;font-size:15px;font-weight:bold;"

);

/*=========================================
End Checkout System
=========================================*/
