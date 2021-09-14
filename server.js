const express = require("express");
// const mongoose = require("mongoose");
// const session = require('express-session');
// const passport = require('./helpers/passport')
const getProduct = require('./helpers/product');
let cron = require('node-cron');
const sendMail = require('./helpers/email');

const app = express();
// require("dotenv").config();

// mongoose.connect(process.env.URL).then(
//   () => console.log("connected to db"),
//   (err) => console.log(err)
// );

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use(session({
//   secret: "asdasd",
//   resave: false,
//   saveUninitialized: false
// }))

// app.use(passport.initialize())
// app.use(passport.session())

// app.use("/api/auth",require('./routes/auth'))
// app.use("/api/product", require("./routes/product"));

app.get('/url/*',async (req,res) => {
  const url = req.params[0];
  try{
      const result = await getProduct(url);
      res.json(result).status(200);
  }catch(err){
      res.json(err).status(500)
  }
})

// app.post('/watchlist',(req,res) => {
//   const {url,pricelimit,email} = req.body;
//   try{
//       cron.schedule(' * * * * *', async function(){
//         console.log("tracked00")
//           const {name,cost} = await getProduct(url);
//           console.log("tracked11")
//           if(cost <= pricelimit){
//               sendMail(email,name);
//               // stop();
//           }
//       })

//       // let stop = () => {
//       //     task.stop();
//       // }
//       res.json({message:'Your product is being tracked!!.'}).status(200)
//   }catch(err){
//       res.json(err).status(500);
//   }
// })

app.use("/*",(req,res) => {
  console.log(req.params)
  res.status(404).json({message:"Invalid API Path"})
})

app.listen(process.env.PORT || 8000, () =>
  console.log(`Server runnin in port: ${process.env.PORT || 8000}`)
);
