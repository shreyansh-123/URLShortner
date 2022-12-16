const { urlencoded } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const register = require('./models/register');


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/urlshort', 
 { useNewUrlParser: true, useUnifiedTopology: true});


app.set("view engine", 'ejs');
app.use(express.urlencoded({extended: true}));


app.get('/', async (req, res) => {
    const details = await register.find().sort({date: "desc"});
    console.log("Hi");
    console.log(details);
    res.render('home', {detail: details});
})
app.post('/url', async (req, res) => {
    try {
    const data = new register({
        Full: req.body.url
    })
    const key = await data.save();
    res.redirect('/');
}
   catch(e) {
    console.log(e);
   }
})
app.get('/:data', async (req, res) => {
    try{
    const details = await register.findOne({Short: req.params.data});
    if(details.Full)
    {
    await register.updateOne({Short: req.params.data},{$inc: {Clicks: 1}});
    res.redirect(details.Full);
    }
    else
    res.redirect('/');
    }
    catch(e) {
       res.redirect('/');
    }
})
app.listen(PORT);