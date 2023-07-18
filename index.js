const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
const Item = require('./schema/item.js')
const Buy = require('./schema/buy.js')
const uri = 'mongodb+srv://huzaifa031252khan:huzaifa031252khan@cluster0.4kws2yo.mongodb.net/'

const connect = async (params) => {
    try {
        await mongoose.connect(uri)
        console.log("mongoDB connected");
    } catch (error) {
        console.error(error);
    }
}

connect()

app.use(express.json());
app.use(cors())

app.listen(8000, () => {
    console.log("server started on port 8000");
})

app.post('/items', async (req, res) => {
    try {
        const { title, img, price, off, colors, gender } = req.body;
        const items = new Item({ 
            title: title,
            img: img,
            price: price,
            off: off,
            colors: colors,
            gender: gender,
        });
        await items.save();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/buy', async (req, res) => {
    try {
        const { name, address, city, phone, item } = req.body;
        const buy = new Buy({ 
            name: name,
            address: address,
            city: city,
            phone: phone,
            item: item,
         });
        await buy.save();
        res.json(buy);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
