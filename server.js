const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

const jsonData = fs.readFileSync("data.json");
const data = JSON.parse(jsonData);

app.get("/users", (req, res) => {
  res.send(data);
});

const middlefunction = (req,res,next)=>{
  const reqName = req.body.name;
  const reqPass = req.body.password;
  const currentUser = data.filter((user) => {
    if (user.name === reqName && user.password === reqPass) {
      return user;
    }
  });
  
  if (currentUser.length === 0) {
    res.send("amjiltgui bollo");
  } 
  next()
}

app.post("/login", middlefunction,(req, res) => {
  res.send("amjilttai nevterlee")
});

app.post("/signup", (req, res) => {
  const reqName = req.body.name;
  const checkedName = data.find((user) => user.name === reqName);
  if (checkedName) {
    res.send("already exist");
  } else {
    const newUser = { ...req.body, id: data.length + 1 };
    const wholeNewJsonData = [...data, newUser];
    fs.writeFile("data.json", JSON.stringify(wholeNewJsonData), (err) =>
      console.log(err)
    );
    res.send("done");
  }
});

app.delete("/delete", (req, res) => {
  const reqName = req.body.name;
  const allUser = data.filter((user) => reqName !== user.name);
  fs.writeFile("data.json",JSON.stringify(allUser),(err)=> console.log(err) )
  res.send("done")
});

app.listen(8000);
