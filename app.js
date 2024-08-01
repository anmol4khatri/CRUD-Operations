const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const userModel = require('./models/user');

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/create', (req, res) => {
    res.render('create');
});

//Create API 
app.post('/api/create', async (req, res) => {
    let{name,email,image} = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    });
    res.redirect('/read');
});

//Read API
app.get('/read', async (req, res) => {
    let allusers = await userModel.find();
    res.render('read', { users:allusers });
});

//Update API


//Delete API
app.get('/delete/:id', async(req,res) => {
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/read');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});