// import Client from "./js-buy-sdk-index.umd.min.js";
import Client from "./node_modules/shopify-buy/index.es.js";


function renderProducts(products) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";
  products.forEach((element) => {
    productsContainer.innerHTML += `
      <div class="product">
        <img src="${element.images[0].src}" alt="${element.title}" />
        <div class="product-description"> 
          <h3>${element.title}</h3>
          <span>${element.variants[0].id}</span>
          <p>$${element.variants[0].price}</p>
          ${element.descriptionHtml}
          <a class="add-to-cart" data-product-id=${element.variants[0].id}>Add to Cart</a>
        </div>
      </div>`;
  });
}

function updateCheckoutLink() {  
  client.checkout.fetch(localStorage.checkout_id).then((checkout) => {
    // Do something with the checkout
    console.log(checkout.webUrl);
    document.querySelector('.check-out').setAttribute('href', checkout.webUrl);
    document.querySelector('.web-url').innerText = checkout.webUrl;
  });
}

try{

// Initializing a client to return content in the store's primary language
var client = Client.buildClient({
  domain: "dijih42627.myshopify.com",
  storefrontAccessToken: "2ecb38cb90dfbe8ec5f2183160f1f6a8",
});

console.log(client);

// Initializing a client to return translated content
// const clientWithTranslatedContent = Client.buildClient({
//   domain: "dijih42627.myshopify.com",
//   storefrontAccessToken: "2ecb38cb90dfbe8ec5f2183160f1f6a8",
// });

// fetch all products
client.product.fetchAll().then((products) => {
  // Do something with the products
  console.log(products);
  renderProducts(products);
});

// Fetch a single product by ID
// const productId = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3NDI3MTI2NDc3NDE=";

// Create Checkout
//  https://my-shop-name.myshopify.com/cart/36485954240671:3,31384149360662:1
// var checkoutObject;

client.checkout.create().then((checkout) => {
  // Do something with the checkout
  console.log("checkout" , checkout);
  // storing checkout in local storage
  localStorage.setItem('checkout_id', checkout.id);
  console.log(checkout)
});

document.querySelector('.products').addEventListener('click' , (e)=>{
    if(!e.target.classList.contains('add-to-cart')) return
    const productId = e.target.dataset.productId;
    const lineItemsToAdd = [
        {variantId: productId , quantity: 1}
    ];
    // console.log(productId)
    console.log(lineItemsToAdd);
    updateCheckoutLink(); 

    // Update the line item on the checkout (change the quantity or variant)
    client.checkout.addLineItems(localStorage.checkout_id, lineItemsToAdd).then((checkout) => {
      // Do something with the updated checkout
       console.log("checkout after Adding Item"); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        console.log(checkout.lineItems); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
    });
})

}
catch(err){
    console.log(err);
}

// Adding an item to the cart
// const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
// const input = {customAttributes: [{key: "MyKey", value: "MyValue"}]};

// client.checkout.updateAttributes(checkoutId, input).then((checkout) => {
//   // Do something with the updated checkout
// });
