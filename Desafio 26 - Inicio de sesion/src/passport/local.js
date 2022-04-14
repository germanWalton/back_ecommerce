const localStrategy = require("passport-local").Strategy;
const userModel = require("../models/User");


module.exports = (passport) => {
  
  const authenticateUser = async (email, password, done) => {
  try {
    //chequear que exista el email
    if (!await userModel.existsByEmail(email)) {
      return done(null,false,{message:"user does not exist!!!"})

  
    }// chequear que el password coincida
    if (!await userModel.isPasswordValid(email,password)) {
      return done(null,false,{message:"incorrect password!!!"})

    }
    //obtener el usuario
    const user = await userModel.getByEmail(email)

   done(null,user)
  }
    
  catch (e) {
    done(e)
  }
  }

  const registerUser = (req,email,password,done) => {
    
    const{name,lastname} = req.body
    try {
      //chequear que no exista el email
      if (await userModel.existsByEmail(email)) {
        return done(null, false, { message: "user already exist!!" })
      
       }
      //guardar usuario en la db
        const user = await userModel.create({
        id:user._id, email,name,lastname,password
        })
       
   
      done(null,user)
   }
     catch (e) {
       done(e)
   
   }
   
  }
  passport.use("login", new localStrategy({ usernameField: "email", password }, authenticateUser))
  passport.use("register", new localStrategy({ usernameField: "email", password, passReqToCallback: true }, registerUser))
  
  passport.serlizeUser((user,done)=>done(null,user.id))
  passport.deserializeUser((id, done) => {
    
  })
}