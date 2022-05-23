const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/user.model");
const logger = require('../log/index');

module.exports = (passport) => {
  
  const authenticateUser = async (email, password, done) => {
  try {
    //chequear que exista el email
    if (!await userModel.existsByEmail(email)) {
      logger.log("no existe")

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

  const registerUser =async (req,email,password,done) => {
    
    const{name,lastname,direction,age,phone,avatar} = req.body
    try {
      //chequear que no exista el email
      if (await userModel.existsByEmail(email)) {
        return done(null, false, { message: "user already exist!!" })
      
       }
      //guardar usuario en la db
        const user = await userModel.create({
         email,name,lastname,password,direction,age,phone,avatar
        })
       
   
      done(null, { ...user, id:user._id })
   }
     catch (e) {
       done(e)
   
   }
   
  }
  passport.use("login", new LocalStrategy({ usernameField: "email", passwordField:"password" }, authenticateUser))
  passport.use("register", new LocalStrategy({ usernameField: "email", passwordField:"password", passReqToCallback: true }, registerUser))
  passport.serializeUser((user,done)=>done(null,user.id))
  passport.deserializeUser(async(id, done) => {
    done(null,await userModel.getById(id))
  })
}