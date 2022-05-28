# e-com

MERN E-commerce site with RestAPI.In this Webapp user can order Clothes. There are 2 main types of users. Which are Buyer and Seller/Admin.
Buyer:- They can search for any product and add them to the cart with quantity. Then they can Order. They can confirm the order and can pay with stripe but they have to login first. If the payment is done this order then order information will store in the Database.
Seller/Admin:- Can add more Admin or Moderator to manage the website can add new products or delete products, change the old products information such as availability, quantity, image, price etc. Admin has access to the dash board where a graph show the revenue, sales information.

<p align="center">
  <img alt="admin" src="https://github.com/Ulrich-Tonmoy/website-MERN/blob/main/e-com/ss/admin (1).png" width="360px"/>
  <img alt="admin" src="https://github.com/Ulrich-Tonmoy/website-MERN/blob/main/e-com/ss/admin (2).png" width="360px"/>
  <img alt="admin" src="https://github.com/Ulrich-Tonmoy/website-MERN/blob/main/e-com/ss/admin (3).png" width="360px"/>
</p>
<p align="center">
  <img alt="client" src="https://github.com/Ulrich-Tonmoy/website-MERN/blob/main/e-com/ss/client (1).png" width="360px"/>
  <img alt="client" src="https://github.com/Ulrich-Tonmoy/website-MERN/blob/main/e-com/ss/client (2).png" width="360px"/>
  <img alt="client" src="https://github.com/Ulrich-Tonmoy/website-MERN/blob/main/e-com/ss/client (3).png" width="360px"/>
</p>

### How to run

### Server

    cd .\backend\
    npm i
    npm run dev

### Client

    cd .\frontend\
    npm i
    npm start

### Admin

    cd .\admin\
    npm i
    npm start
