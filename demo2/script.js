import Client from "../js-buy-sdk-index.umd.min.js";
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

function updateCheckoutLink(checkout) {
  console.log(checkout.webUrl);
  document.querySelector(".check-out").setAttribute("href", checkout.webUrl);
  document.querySelector(".cart sup").innerHTML = localStorage.lineItems
    ? JSON.parse(localStorage.lineItems).length
    : checkout.lineItems.length;
}

function addProducttoLocalStorage(lineItem) {
  if (!localStorage.lineItems) localStorage.setItem("lineItems", []);
  let templineItems = lineItem;
  if (localStorage.lineItems.length > 0) {
    templineItems = [JSON.parse(localStorage.lineItems), ...lineItem].flat();
    // console.log("--------final-----------")
    // console.log(templineItems)
  } else templineItems = [...lineItem].flat();
  localStorage.lineItems = JSON.stringify(templineItems);
}

try {
  var client = Client.buildClient({
    // domain: "dijih42627.myshopify.com",
    // storefrontAccessToken: "2ecb38cb90dfbe8ec5f2183160f1f6a8",
    // domain: "pdiarm.myshopify.com",
    // storefrontAccessToken: "2eb3f2aff694f5f274f11ca7a67f49d5",
    domain: "diljit-developers.myshopify.com",
    storefrontAccessToken: "107be587cc38f0d2f2763e73835a3866",
  });

  console.log(client);

  client.product.fetchAll().then((products) => {
    renderProducts(products);
  });

  // Create Checkout
  client.checkout.create().then((checkout) => {
    console.log("checkout", checkout);
    localStorage.setItem("checkout_id", checkout.id);
    console.log(checkout);
    console.log(localStorage.checkout_id);
  });

  // CHeccking if local storage has line items(products) for cart
  if (localStorage.lineItems) {
    let lineItems = JSON.parse(localStorage.lineItems);
    client.checkout
      .addLineItems(localStorage.checkout_id, lineItems)
      .then((checkout) => {
        console.log("Got Previous Prods from local storage"); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        console.log(checkout); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        updateCheckoutLink(checkout);
        // localStorage.setItem("checkout", JSON.stringify(checkout));
      });
  }

  document.querySelector(".products").addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-to-cart")) return;
    const productId = e.target.dataset.productId;
    let oldlineItems = localStorage.lineItems ? JSON.parse(localStorage.lineItems): []
    let lineItemsToAdd = [{ variantId: productId, quantity: 1 }];
    let combinedLineItems = oldlineItems.length>0 ? [...oldlineItems, ...lineItemsToAdd] : lineItemsToAdd;
    client.checkout
      .addLineItems(localStorage.checkout_id, combinedLineItems)
      .then((checkout) => {
        addProducttoLocalStorage(lineItemsToAdd);
        updateCheckoutLink(checkout);
        console.log("checkout after Adding Item"); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        console.log(checkout); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        // localStorage.setItem("checkout", JSON.stringify(checkout));
      });
  });
}
catch (err) {
  const errBlock = document.querySelector(".error");
  errBlock.innerHTML= `
    <div>
      <h2 class="text-4xl text-center font-extrabold" > Something Went Wrong :( Please refresh. </h2>
    </div>
  `;
  console.log(err);
}

document.querySelector(".clear").addEventListener("click", () => {
  let lineItemIdsToRemove = JSON.parse(localStorage.lineItems).map(el => el.variantId);
  console.log(lineItemIdsToRemove )
  client.checkout.removeLineItems(localStorage.checkout_id, lineItemIdsToRemove).then((checkout) => {
    console.log(checkout.lineItems); 
    console.log("items removed");
  });
  delete localStorage.lineItems;
  // updateCheckoutLink(checkout);
});
