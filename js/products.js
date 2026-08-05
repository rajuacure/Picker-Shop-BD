/*=====================================
Picker Shop BD
Products JS
Version : 1.0
=====================================*/

let allProducts = [];

let filteredProducts = [];

const productsContainer =
document.getElementById("productsContainer");

const searchInput =
document.getElementById("searchInput");

const categoryItems =
document.querySelectorAll(".category-list li");

const sortProducts =
document.getElementById("sortProducts");

const priceRange =
document.getElementById("priceRange");

const priceValue =
document.getElementById("priceValue");

const productCount =
document.getElementById("productCount");

/*==============================
Load Products
==============================*/

async function loadProducts(){

try{

const response =
await fetch("data/products.json");

allProducts =
await response.json();

filteredProducts =
[...allProducts];

renderProducts(filteredProducts);

}

catch(error){

console.error(error);

productsContainer.innerHTML=`

<div class="empty-products">

<h2>

Products Not Found

</h2>

<p>

Please Try Again Later.

</p>

</div>

`;

}

}

/*==============================
Render Products
==============================*/

function renderProducts(products){

productsContainer.innerHTML="";

productCount.textContent=
products.length;

if(products.length===0){

productsContainer.innerHTML=`

<div class="empty-products">

<h2>

No Products Found

</h2>

</div>

`;

return;

}

products.forEach(product=>{

productsContainer.innerHTML+=`

<div class="product-card">

<div class="product-image">

<img
src="${product.image}"
alt="${product.name}">

<span class="discount-badge">

-${product.discount}%

</span>

<div
class="wishlist-btn">

<i class="far fa-heart"></i>

</div>

</div>

<div class="product-body">

<p class="product-category">

${product.category}

</p>

<h3 class="product-title">

<a href="product.html?id=${product.id}">

${product.name}

</a>

</h3>

<div class="product-rating">

★★★★★

<span>

(${product.rating})

</span>

</div>

<div class="product-price">

<span class="current-price">

৳${product.price}

</span>

<span class="old-price">

৳${product.oldPrice}

</span>

</div>

<div class="product-actions">

<button
class="btn add-cart"

data-id="${product.id}">

Add To Cart

</button>

<a
href="product.html?id=${product.id}"

class="btn buy-btn">

View

</a>

</div>

</div>

</div>

`;

});

}
/*==============================
Search Products
==============================*/

if(searchInput){

searchInput.addEventListener("keyup",function(){

const keyword=this.value.toLowerCase();

filteredProducts=allProducts.filter(product=>{

return(

product.name.toLowerCase().includes(keyword)||

product.category.toLowerCase().includes(keyword)

);

});

renderProducts(filteredProducts);

});

}

/*==============================
Category Filter
==============================*/

categoryItems.forEach(item=>{

item.addEventListener("click",()=>{

categoryItems.forEach(li=>li.classList.remove("active"));

item.classList.add("active");

const category=item.dataset.category;

if(category==="all"){

filteredProducts=[...allProducts];

}else{

filteredProducts=allProducts.filter(product=>

product.category===category

);

}

renderProducts(filteredProducts);

});

});

/*==============================
Price Filter
==============================*/

if(priceRange){

priceRange.addEventListener("input",()=>{

const maxPrice=parseInt(priceRange.value);

priceValue.textContent=maxPrice;

filteredProducts=allProducts.filter(product=>

product.price<=maxPrice

);

renderProducts(filteredProducts);

});

}

/*==============================
Sorting
==============================*/

if(sortProducts){

sortProducts.addEventListener("change",()=>{

const value=sortProducts.value;

switch(value){

case "low":

filteredProducts.sort((a,b)=>a.price-b.price);

break;

case "high":

filteredProducts.sort((a,b)=>b.price-a.price);

break;

case "name":

filteredProducts.sort((a,b)=>

a.name.localeCompare(b.name)

);

break;

default:

filteredProducts.sort((a,b)=>b.id-a.id);

}

renderProducts(filteredProducts);

});

}

/*==============================
Wishlist
==============================*/

document.addEventListener("click",e=>{

const btn=e.target.closest(".wishlist-btn");

if(!btn) return;

btn.classList.toggle("active");

const icon=btn.querySelector("i");

icon.classList.toggle("fas");

icon.classList.toggle("far");

});

/*==============================
Add To Cart
==============================*/

document.addEventListener("click",e=>{

const btn=e.target.closest(".add-cart");

if(!btn) return;

const id=parseInt(btn.dataset.id);

const product=allProducts.find(item=>item.id===id);

if(!product) return;

let cart=JSON.parse(localStorage.getItem("cart"))||[];

const exists=cart.find(item=>item.id===id);

if(exists){

exists.qty=(exists.qty||1)+1;

}else{

cart.push({

...product,

qty:1

});

}

localStorage.setItem("cart",JSON.stringify(cart));

if(typeof updateCartCount==="function"){

updateCartCount();

}

btn.innerHTML="✓ Added";

setTimeout(()=>{

btn.innerHTML="Add To Cart";

},1500);

});
/*==============================
Pagination
==============================*/

let currentPage = 1;

const productsPerPage = 9;

function paginateProducts(products){

const start = (currentPage - 1) * productsPerPage;

const end = start + productsPerPage;

return products.slice(start,end);

}

function renderPagination(products){

const pagination = document.querySelector(".pagination");

if(!pagination) return;

const totalPages = Math.ceil(products.length / productsPerPage);

pagination.innerHTML = "";

if(totalPages <= 1) return;

for(let i=1;i<=totalPages;i++){

const button = document.createElement("button");

button.className = "page-btn";

button.textContent = i;

if(i===currentPage){

button.classList.add("active");

}

button.addEventListener("click",()=>{

currentPage = i;

renderProducts(paginateProducts(filteredProducts));

renderPagination(filteredProducts);

window.scrollTo({

top:0,

behavior:"smooth"

});

});

pagination.appendChild(button);

}

}

/*==============================
Override Render Products
==============================*/

const originalRender = renderProducts;

renderProducts = function(products){

originalRender(paginateProducts(products));

renderPagination(products);

};

/*==============================
Loading Skeleton
==============================*/

function showLoading(){

if(!productsContainer) return;

productsContainer.innerHTML="";

for(let i=0;i<6;i++){

productsContainer.innerHTML+=`

<div class="product-card loading-card">

<div class="loading-image"></div>

<div class="loading-text"></div>

<div class="loading-text short"></div>

<div class="loading-button"></div>

</div>

`;

}

}

/*==============================
Refresh Products
==============================*/

function refreshProducts(){

currentPage=1;

renderProducts(filteredProducts);

}

/*==============================
Firebase Ready
==============================*/

// Future Firebase Integration
// Replace loadProducts()
// with Firestore Query

/*
import {

collection,

getDocs

}

from "firebase/firestore";

*/

/*==============================
Initialize
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

showLoading();

setTimeout(()=>{

loadProducts();

},500);

});

/*==============================
Performance
==============================*/

window.addEventListener("pageshow",()=>{

if(typeof updateCartCount==="function"){

updateCartCount();

}

});

/*==============================
Console
==============================*/

console.log(

"%cProducts System Loaded",

"color:#16a34a;font-size:16px;font-weight:bold;"

);

/*==============================
Products JS Complete
==============================*/
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
