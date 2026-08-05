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
