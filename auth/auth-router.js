const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../users/users-model");

const router = require("express").Router();

router.post('/register', async (req, res, next) => {
  try{
    const { username, password } = req.body;
    const user = await db.findBy({ username }).first()
    if(user){
      return res.status(400).json({
        message: "Username already taken"
      })
    }
    const newUser = await db.add({
      username,
      password: await bcrypt.hash(password, 14)
    })
    res.status(201).json(newUser)
  }
  catch(err){
    next(err)
  }
})


router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await db.findBy({ username }).first()
    if (user) {
      const passwordValid = await bcrypt.compare(password, user.password)
      if (passwordValid) {
        const token = jwt.sign({ user_id: user.id, username: user.username }, process.env.JWT_SECRET)
        res.cookie("token", token)
        
        res.json({ message: `Welcome ${user.username}!` })

      }
      else {
        return res.status(401).json({ message: "You shall not pass! Password incorrect" })
      }
    }
    else {
      return res.status(401).json({ message: "You shall not pass! Could not find User" })
    }
  }
  catch (err) {
    next(err)
  }
})

// Generate a JWT


module.exports = router;
