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
