 
/*=========================================
Picker Shop BD
Product Details JS
Version : 1.0
=========================================*/

let product = null;
let products = [];
let quantity = 1;

/*=========================================
DOM Elements
=========================================*/

const title = document.getElementById("title");
const pageTitle = document.getElementById("pageTitle");
const productName = document.getElementById("productName");
const breadcrumbProduct = document.getElementById("breadcrumbProduct");

const currentPrice = document.getElementById("currentPrice");
const oldPrice = document.getElementById("oldPrice");

const shortDescription =
document.getElementById("shortDescription");

const productDescription =
document.getElementById("productDescription");

const mainImage =
document.getElementById("mainImage");

const thumbnailGallery =
document.getElementById("thumbnailGallery");

const stockStatus =
document.getElementById("stockStatus");

const productSKU =
document.getElementById("productSKU");

const productCategory =
document.getElementById("productCategory");

const specCategory =
document.getElementById("specCategory");

const ratingCount =
document.getElementById("ratingCount");

/*=========================================
Get Product ID
=========================================*/

const params =
new URLSearchParams(window.location.search);

const productId =
Number(params.get("id"));

/*=========================================
Load Products
=========================================*/

async function loadProduct(){

try{

const response =
await fetch("data/products.json");

products =
await response.json();

product =
products.find(item=>item.id===productId);

if(!product){

window.location.href="products.html";

return;

}

renderProduct();

renderRelatedProducts();

}

catch(error){

console.error(error);

}

}

/*=========================================
Render Product
=========================================*/

function renderProduct(){

pageTitle.innerText =
product.name + " | Picker Shop BD";

title.innerText =
product.name;

productName.innerText =
product.name;

breadcrumbProduct.innerText =
product.name;

currentPrice.innerHTML =
"৳" + product.price;

oldPrice.innerHTML =
"৳" + product.oldPrice;

shortDescription.innerHTML =
product.shortDescription;

productDescription.innerHTML =
product.description;

stockStatus.innerHTML =
product.stock
? "In Stock"
: "Out Of Stock";

productSKU.innerHTML =
product.sku;

productCategory.innerHTML =
product.category;

specCategory.innerHTML =
product.category;

ratingCount.innerHTML =
`(${product.rating})`;

mainImage.src =
product.image;

/* Gallery */

thumbnailGallery.innerHTML="";

product.gallery.forEach(image=>{

thumbnailGallery.innerHTML+=`

<img
src="${image}"
class="thumb"
onclick="changeImage('${image}')">

`;

});

}
/*=========================================
Change Main Image
=========================================*/

function changeImage(image){

mainImage.src = image;

document.querySelectorAll(".thumb").forEach(img=>{

img.classList.remove("active");

if(img.src.includes(image)){

img.classList.add("active");

}

});

}

/*=========================================
Quantity
=========================================*/

const quantityInput =
document.getElementById("quantity");

const increaseQty =
document.getElementById("increaseQty");

const decreaseQty =
document.getElementById("decreaseQty");

if(increaseQty){

increaseQty.addEventListener("click",()=>{

quantity++;

quantityInput.value=quantity;

});

}

if(decreaseQty){

decreaseQty.addEventListener("click",()=>{

if(quantity>1){

quantity--;

quantityInput.value=quantity;

}

});

}

if(quantityInput){

quantityInput.addEventListener("change",()=>{

let value=parseInt(quantityInput.value);

if(isNaN(value)||value<1){

value=1;

}

quantity=value;

quantityInput.value=quantity;

});

}

/*=========================================
Add To Cart
=========================================*/

const addToCartBtn =
document.getElementById("addToCart");

if(addToCartBtn){

addToCartBtn.addEventListener("click",()=>{

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const existing =
cart.find(item=>item.id===product.id);

if(existing){

existing.qty += quantity;

}else{

cart.push({

...product,

qty:quantity

});

}

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

if(typeof updateCartCount==="function"){

updateCartCount();

}

addToCartBtn.innerHTML=

'<i class="fas fa-check"></i> Added';

setTimeout(()=>{

addToCartBtn.innerHTML=

'<i class="fas fa-shopping-cart"></i> Add To Cart';

},1500);

});

}

/*=========================================
Buy Now
=========================================*/

const buyNowBtn =
document.getElementById("buyNow");

if(buyNowBtn){

buyNowBtn.addEventListener("click",()=>{

let checkout=[{

...product,

qty:quantity

}];

localStorage.setItem(

"checkout",

JSON.stringify(checkout)

);

window.location.href="checkout.html";

});

}

/*=========================================
Wishlist
=========================================*/

const wishlistBtn =
document.getElementById("wishlistBtn");

if(wishlistBtn){

wishlistBtn.addEventListener("click",()=>{

let wishlist=

JSON.parse(localStorage.getItem("wishlist"))||[];

const exists=

wishlist.find(item=>item.id===product.id);

if(!exists){

wishlist.push(product);

localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);

}

wishlistBtn.innerHTML=

'<i class="fas fa-heart"></i> Added';

});

}

/*=========================================
Share Product
=========================================*/

function shareProduct(){

if(navigator.share){

navigator.share({

title:product.name,

text:product.shortDescription,

url:window.location.href

});

}else{

navigator.clipboard.writeText(

window.location.href

);

alert("Product link copied.");

}

}
/*=========================================
Related Products
=========================================*/

function renderRelatedProducts(){

const relatedContainer =
document.getElementById("relatedProducts");

if(!relatedContainer) return;

const related = products
.filter(item =>
item.category === product.category &&
item.id !== product.id)
.slice(0,4);

relatedContainer.innerHTML = "";

related.forEach(item=>{

relatedContainer.innerHTML += `

<div class="product-card">

<div class="product-image">

<img src="${item.image}" alt="${item.name}">

</div>

<div class="product-body">

<p class="product-category">

${item.category}

</p>

<h3 class="product-title">

<a href="product.html?id=${item.id}">

${item.name}

</a>

</h3>

<div class="product-price">

<span class="current-price">

৳${item.price}

</span>

<span class="old-price">

৳${item.oldPrice}

</span>

</div>

<a
href="product.html?id=${item.id}"
class="btn">

View Details

</a>

</div>

</div>

`;

});

}

/*=========================================
Product Tabs
=========================================*/

const tabButtons =
document.querySelectorAll(".tab-btn");

const tabContents =
document.querySelectorAll(".tab-content");

tabButtons.forEach(button=>{

button.addEventListener("click",()=>{

tabButtons.forEach(btn=>
btn.classList.remove("active"));

tabContents.forEach(tab=>
tab.classList.remove("active"));

button.classList.add("active");

const tab =
document.getElementById(
button.dataset.tab
);

if(tab){

tab.classList.add("active");

}

});

});

/*=========================================
Dummy Reviews
=========================================*/

function loadReviews(){

const reviewContainer =
document.getElementById("reviewContainer");

if(!reviewContainer) return;

reviewContainer.innerHTML = `

<div class="review-card">

<h4>Rahim Ahmed</h4>

<div class="stars">

★★★★★

</div>

<p>

Excellent quality product.

Fast delivery and original item.

</p>

</div>

<div class="review-card">

<h4>Fatema Begum</h4>

<div class="stars">

★★★★★

</div>

<p>

Very satisfied.

Will purchase again.

</p>

</div>

`;

}

/*=========================================
Image Zoom
=========================================*/

if(mainImage){

mainImage.addEventListener("mousemove",()=>{

mainImage.style.transform="scale(1.25)";

});

mainImage.addEventListener("mouseleave",()=>{

mainImage.style.transform="scale(1)";

});

}

/*=========================================
Initialization
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

loadProduct();

loadReviews();

if(typeof updateCartCount==="function"){

updateCartCount();

}

});

/*=========================================
Performance
=========================================*/

window.addEventListener("pageshow",()=>{

if(typeof updateCartCount==="function"){

updateCartCount();

}

});

/*=========================================
Console
=========================================*/

console.log(

"%cProduct Details Loaded Successfully",

"color:#16a34a;font-size:16px;font-weight:bold;"

);

/*=========================================
End Product JS
=========================================*/
