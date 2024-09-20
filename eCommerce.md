## AUTH SERVICE
### Signup (POST)
  - Name
  - Surname
  - Email
  - Password
  - Balance (Firstly 100)
### Signin (POST)
  - Email
  - Password
  - If the request is valid, the jw token should be created. And the email and password should return as a response.
## ORDER SERVICE
### Create Order (POST)
  - Service Name
  - Amount
  - Product Name
  - User who creates request (Look at the request's token and decide the user)
  - Total cost should be calculate with the service's cost and the amount of the order
  - If the user's balance is enough order should be written in the database and the balance should recalculated.
  - If the user's balance is not enough then return an error for it.
### List Orders (GET)
  - The list of the orders should be return as JSON.
## SERVICE TABLE
### List Service Info (GET)
  - Services should be return as a JSON.
  - Data example for service table.
    - {
           "services": [
               {
                   "id": 1,
                   "name": "Standard Shipping",
                   "description": "Basic shipping service with average delivery time.",
                   "price": 5.00
               },
               {
                   "id": 2,
                   "name": "Express Shipping",
                   "description": "Faster delivery service with premium charges.",
                   "price": 15.00
               },
               {
                   "id": 3,
                   "name": "Gift Wrapping",
                   "description": "Special gift wrapping service for special occasions.",
                   "price": 2.50
               },
               {
                   "id": 4,
                   "name": "Installation Service",
                   "description": "Professional installation service for electronic devices.",
                   "price": 30.00
               }
           ]
       }