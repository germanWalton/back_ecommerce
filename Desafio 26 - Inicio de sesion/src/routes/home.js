const Router = require('express').Router;
const auth = require("../middlewares/auth");
const userModel = require("../models/User");

const router = Router();

router.get("/", auth, (req, res) => {
  const { name } = req.session.user
  res.render("main", { name })
});

router.get("/login", (req, res) => res.render("login", { layout: 'login' }));
router.get("/register", (req, res) => res.render("register", { layout: 'login' }));


router.post("/login",async (req, res) => {
const { email, password } = req.body
  try {
    //chequear que exista el email
    if (!await userModel.existsByEmail(email)) {
     return res.render("login", {
        layout: "login",
        error:"user does not exist!"
      })
    }// chequear que el password coincida
    if (!await userModel.isPasswordValid(email,password)) {
      return res.render("login", {
        layout: "login",
        error:"incorrect password!"
      })
    }
    //obtener el usuario
    const user = await userModel.getByEmail(email)

    //crear sesion
    req.session.user = user

    //redirigir a la pagina principal
    res.redirect("/")
   }
  catch (e) {
    return res.send("an error ocurred:"+ e.message)
  }
});


router.post("/register",async (req, res) => {
  const {email, name, lastname,password} = req.body
  try {
   //chequear que no exista el email
   if (await userModel.existsByEmail(email)) {
    return res.render("register", {
       layout: "login",
       error:"user already exist!"
     })
    }
   //guardar usuario en la db
     const user = await userModel.create({
      email,name,lastname,password
     })
    
    //crear la sessión
    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      lastname:user.lastname
    }

    //redirigir al usuario a la pagina principal
    res.redirect("/")
}
  catch (e) {
    return res.send("an error ocurred:"+ e.message)

}

 })


router.get("/logout", auth, (req, res) => {
  const { name } = req.session.user

  req.session.destroy((err) => {
    if (err) {
      console.log(err)
      res.send("Hubo un error")
      return
    }
    res.render("logout", { layout: 'logout', name })

  })

});





module.exports = router