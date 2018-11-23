const internet = [
  { name: "internet150", price: 150 },
  { name: "internet75", price: 75 },
  { name: "internet30", price: 30 }
];
const tv = [
  { name: "50 channels", price: 50 },
  { name: "100 channels", price: 100 },
  { name: "150 channels", price: 150 }
];
const phone = { price: 30 };

/* 
#########################################
Node module for creating a web server 
##########################################  
*/

// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.setHeader("X-Foo", "bar");
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.write("Hello World!");
//     res.end();
//   } else if (req.url === "/info") {
//     res.setHeader("X-Foo", "bar");
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(
//       JSON.stringify({
//         service: [internet, tv, phone]
//       })
//     );
//     res.end();
//   } else {
//     res.write("Wrong route");
//     res.end();
//   }
// });

// server.listen(3000);

// console.log("Server is running on port 3000...");

/*
    Using express
*/

const express = require("express");
const hbs = require("hbs");

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Main Page",
    welcomeMessage: "Welcome to my page"
  });
});

app.get("/info/:type", (req, res) => {
  if (req.params.type === "internet") res.send(internet);
  else if (req.params.type === "tv") res.send(tv);
  else if (req.params.type === "phone") res.send(phone);
  else {
    res.send("Bad request");
  }
});

app.post("/info/:type", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  if (req.params.type === "internet") res.send(internet);
  else if (req.params.type === "tv") res.send(tv);
  else if (req.params.type === "phone") res.send(phone);
  else {
    res.send("Bad request");
  }
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
