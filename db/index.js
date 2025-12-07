var express = require("express")


var app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json());
const cors = require("cors");
app.use(cors());
let users = []
app.post('/signup' , function(req,res){
    

    const newuser= {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password 
    }

    if(req.body.name && req.body.email && req.body.mobile && req.body.password){

        users.push(newuser)
    }

    res.send(true)
    
})

app.get('/signup', function(req,res){

    res.json(users)
})

app.post('/login', function(req,res){
    const {emailOrMobile,password }= req.body

      const user = users.find(e =>
         (e.email === emailOrMobile || e.mobile === emailOrMobile)
        && e.password === password
    );

    if(user){
        res.json({success: true, message: "Login Successfully", user})
    }
    else{
        res.json({success: false, message: "Login Failed"})
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
