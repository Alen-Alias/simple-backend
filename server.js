const express = require('express')
const morgan = require('morgan')
const database = require('./config/database')
const userModel = require('./models/user')
require('dotenv').config()
const bcrypt = require('bcrypt')

const app = express()
const PORT = process.env.PORT
app.set('view engine','ejs')
app.use(morgan('dev'))
app.use(express.urlencoded({extented:true}))
app.use(express.static('public'))
app.use(express.json())

app.get('/',(req,res)=>{
    res.render('register')
})
app.get('/register',(req,res)=>{
    res.render('register')
})
app.get('/signin',(req,res)=>{
    res.render('signin')
})

app.post('/register',async (req,res)=>{
    try {

        const {username,email,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        await userModel.create({
            username,
            email,
            password:hashedPassword
        });

    res.render('signin')
    } catch (err) {
        res.send('Error in Registration')
    }
})

app.post('/signin',async (req,res)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({email:email})
    try {
        if(!user){
            return res.send('User no found')
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            res.render('home')
        } else {
            res.render('signin')
        }

    }catch (err) {
        res.send('Error in sign in')
    }
      
});

app.get('/logout',(req,res)=>{  
    res.render('register')
})



app.listen(`${PORT}`,()=>{
    console.log('The server is runnong in http://localhost:3000/');
    
})
// app.get('/all-user',async (req,res)=>{
//     const users = await userModel.find({})
//     res.send(users)
// })
// app.delete('/delete',async (req,res)=>{
//     await userModel.deleteMany({username:'Daredevil'})
//     res.send('Deleted user')  
// })
// app.put('/update', async (req,res)=>{
//     await userModel.updateOne({username:'Daredevil'},{email:'Dare@gmail.com'})
//     res.send('User email updated')
// })