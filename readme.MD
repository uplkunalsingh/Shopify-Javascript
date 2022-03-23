- Would the individual product cards link to the product page?
=> Yes we are planning to create hubdb entries for each product(We will have to test it first)

- Would we create these cards from a HubDB table, then the URL for adding the cart be shopify?
=> yes we can use hubdb but we will need an automated hubdb entry for each new product(We will need
a 2 way sync between shopify and hubspot which may be challenging)

> We would create a server-side synchronization for 'Shopify Product - Hubdb Row'. Once a user will add a product on shopify, It would automatically added into HubDB row. We will use Hubdb for dynamic page creation. Based on hubdb dynamic pages we will have a product-id on inner page and using that product id, we will fetch single product detail on that page using javascript. 

- When viewing a Product Page, could the user "add to cart" on that product page, then go back to the product listings and still have their cart cookied with what they've added already
=> We can achieve this with localstorage/cookies but it may not be the best choice for production 

=> Please provide store url aswell with accesstoken 