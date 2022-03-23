- Would the individual product cards link to the product page?
- Would we create these cards from a HubDB table, then the URL for adding the cart be shopify?
> We would create a server-side synchronization for 'Shopify Product - Hubdb Row'. Once a user will add a product on shopify, It would automatically added into HubDB row. We will use Hubdb for dynamic page creation. Based on hubdb dynamic pages we will have a product-id on inner page and using that product id, we will fetch single product detail on that page using javascript.  (This is still in inception, Not sure how it will turn out together)

- When viewing a Product Page, could the user "add to cart" on that product page, then go back to the product listings and still have their cart cookied with what they've added already
> Yes, It will work as per your requirement. We can use localstorage/cookies to store data.

=> Please provide store url aswell with accesstoken 

https://headless-shopify.netlify.app/