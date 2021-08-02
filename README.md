![Logo (1)](https://user-images.githubusercontent.com/49658988/127885976-7508b10c-e666-46a1-b019-318d5bc39e47.png)

# node_blog
Simple node blog, where you can login, add and delete messages

## Demo

![tYoX9Lvout](https://user-images.githubusercontent.com/49658988/125193380-ce3a7580-e254-11eb-9da9-1d398ebbe568.gif)

---

# Steps to install

1) Create `.env` file in project root (next to `app.js`) using `.env.sample` (you can rename it to `.env`).
2) Create test database on https://cloud.mongodb.com/. Use atlas DB. 
3) Create user in DataBase Access. 
4) Add your IP in whitelist in Network Access.
5) Create a cluster with any name.
6) Connect to cluster using "Connect your application" option
7) Create a user in database with following fields

![image](https://user-images.githubusercontent.com/49658988/125193217-fc6b8580-e253-11eb-9c9c-2c453ac85b1b.png)

8) Select Node.js last version. Copy link and insert your credentials (follow instructions on web-site)
9) Copy link to `.env` (`MONGO=your_link`)
10) Generate random JWT token (better use string)

# Starting

`cd node_blog`

`nodemon app.js`

# Acessing

Access using `http://localhost:3000/` - leads to login page

Access to blogs using `http://localhost:3000/blogs` - after you logged in

--- 

<a href="https://www.buymeacoffee.com/tdamer"><img src="https://img.buymeacoffee.com/button-api/?text=Support me with a coffee&emoji=☕️&slug=tdamer&button_colour=ffcc33&font_colour=000&font_family=Lato&outline_colour=000&coffee_colour=000"></a>
