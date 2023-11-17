Fake back-end based on JSON server:
https://github.com/typicode/json-server

Install: npm install -g json-server

Generate fake data: npm run seed

Start server: npm run start-auth

Users are in mockup-data/User.json
  (user: admin@email.com, password: admin)

Endpoints:
  - POST http://localhost:3001/auth/register
  - POST http://localhost:3001/auth/login
  - GET http://localhost:3001/City
  - GET http://localhost:3001/Customer
  - GET http://localhost:3001/Bill
  - GET http://localhost:3001/CreditCard
  - GET http://localhost:3001/Seller
  - GET http://localhost:3001/Item
  - GET http://localhost:3001/Category
  - GET http://localhost:3001/SubCategory
  - GET http://localhost:3001/Product
  - endpoints are secured, except Customer and City
  - for more details on endpoints, see: https://github.com/typicode/json-server

Register user: POST http://localhost:3001/auth/register
Body example: {
  "name": "test3",
  "email": "test3@email.com",
  "password":"test3"
}

Login user: POST http://localhost:3001/auth/login (returns JWT)
Body example: {
  "email": "test3@email.com",
  "password":"test3"
}

Enjoy fake REST server!
