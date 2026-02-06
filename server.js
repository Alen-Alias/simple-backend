const express = require('express')
const morgan = require('morgan')
const database = require('./config/database')
const userModel = require('./models/user')
require('dotenv').config()

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

app.get('/all-user',async (req,res)=>{
    const users = await userModel.find({})
    res.send(users)
})
 
app.post('/register-data',async (req,res)=>{
    res.render('home')
    console.log(req.body)   
    const {username,email,password} = req.body
    await userModel.create({
        username,
        email,
        password
    })
})

app.delete('/delete',async (req,res)=>{
    await userModel.deleteMany({username:'Daredevil'})
    res.send('Deleted user')  
})


app.put('/update', async (req,res)=>{
    await userModel.updateOne({username:'Daredevil'},{email:'Dare@gmail.com'})
    res.send('User email updated')
})
app.listen(`${PORT}`,()=>{
    console.log('The server is runnong in http://localhost:3000/');
    
})