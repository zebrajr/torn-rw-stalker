require('dotenv').config()
const express               =  require('express'),
      app                   =  express(),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      session               =  require("express-session"),
      User                  =  require("./models/user");


//Connecting database
mongoose.connect(process.env.URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
});

app.use(session({
    secret:"Any normal Word",       //decode or encode session
    resave: false,
    saveUninitialized:false,
    cookie:{
        maxAge: 2*60*1000
    }
}));


passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());


//=======================
//      R O U T E S
//=======================

app.get("/", (req,res) =>{
    res.render("home");
})

//Auth Routes

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{

    User.register(new User({username: req.body.username,phone:req.body.phone}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
    passport.authenticate("local")(req,res,function(){
        console.log("Following User has been registerd");
        console.log(user)
        res.redirect("/");
    })
    })
})



app.listen(process.env.PORT || 3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port ${process.env.PORT}");
    }

});
