const User= require("../models/user");

module.exports.signupForm=(req, res) => {
    res.render("users/signup.ejs");
}
module.exports.signup=async(req,res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("signup")
    }
}

module.exports.loginForm=async (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login= async(req, res) => {
    if(res.locals.redirectUrl){
        req.flash("success", "Welcome to WanderLust!");
        res.redirect(res.locals.redirectUrl);
    }
    if(!res.locals.redirectUrl){
        req.flash("success", "Welcome to WanderLust!");
        res.redirect("/listings");
    }
}


module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You have Logged out!");
        res.redirect("/listings");
    });
}