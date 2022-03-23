import Client from "./js-buy-sdk-index.umd.min.js";
// import Client from "./node_modules/shopify-buy/index.es.js";

function renderProducts(products) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";
  products.forEach((element) => {
    productsContainer.innerHTML += `
      <div class="shadow-md flex flex-col justify-between border border-gray-100 cursor-pointer hover:shadow-xl" id="${element.id}">
        <p class="text-center">
          <img style="max-height:200px !important; margin:0 auto;" src="${element.images[0].src}" alt="${element.title}" />
        </p>
        <div class="p-4">
            <div class="flex justify-between items-center">
              <h3 class="font-bold">${element.title}</h3>
              <p>$${element.variants[0].price}</p>
            </div>
        </div>
      <button class="add-to-cart font-semibold bg-indigo-700 py-2 px-2 text-white w-full" data-product-id="${element.variants[0].id}">Add to cart</button>  
      </div>`;
  });
}

function updateCheckoutLink() {
  client.checkout.fetch(localStorage.checkout_id).then((checkout) => {
    console.log(checkout.webUrl);
    document.querySelector(".check-out").setAttribute("href", checkout.webUrl);
    document.querySelector(".cart sup").innerHTML =
      checkout.lineItems.length + 1;
  });
}

try {
  // Initializing a client to return content in the store's primary language
  var client = Client.buildClient({
    // domain: "dijih42627.myshopify.com",
    // storefrontAccessToken: "2ecb38cb90dfbe8ec5f2183160f1f6a8",
    domain: "pdiarm.myshopify.com",
    storefrontAccessToken: "2eb3f2aff694f5f274f11ca7a67f49d5",
  });

  console.log(client);

  client.product.fetchAll().then((products) => {
    renderProducts(products);
  });

  // Create Checkout

  // if (localStorage.checkout_id) {
  //   console.log("has checkout");
  //   client.checkout.create().then((checkout) => {
  //     console.log("checkout", checkout);
  //     localStorage.setItem("checkout_id", checkout.id);
  //     console.log(checkout);
  //     console.log(localStorage.checkout_id);
  //   });
  // }else{
  client.checkout.create().then((checkout) => {
    console.log("checkout", checkout);
    localStorage.setItem("checkout_id", checkout.id);
    console.log(checkout);
    console.log(localStorage.checkout_id);
  });
  // }

  document.querySelector(".products").addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-to-cart")) return;
    const productId = e.target.dataset.productId;
    const lineItemsToAdd = [{ variantId: productId, quantity: 1 }];
    console.log(lineItemsToAdd);
    updateCheckoutLink();
    // Update the line item on the checkout (change the quantity or variant)
    client.checkout
      .addLineItems(localStorage.checkout_id, lineItemsToAdd)
      .then((checkout) => {
        // Do something with the updated checkout
        console.log("checkout after Adding Item"); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        console.log(checkout); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        localStorage.setItem("checkout", JSON.stringify(checkout));
      });
  });
} catch (err) {
  console.log(err);
}
