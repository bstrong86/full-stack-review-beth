require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    ctrl = require('./controllers/controller')


const app = express(),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env


app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000000000
    }    
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db',db)
    app.listen(SERVER_PORT, () => 
    console.log(`working on port ${SERVER_PORT}`))
})


app.post('/auth/register', ctrl.register )
app.post('/auth/login', ctrl.login)
app.get('/api/current', ctrl.getUser)
app.post('/auth/logout', ctrl.logout)
