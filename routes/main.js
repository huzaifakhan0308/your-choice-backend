const express = require('express')
const app = express()
const Item = require('../modules/item.js')
const Buy = require('../modules/buy.js')

const hardcodedPassword = 'yourchoice321';

const checkPassword = (req, res, next) => {
    const password = req.body.password;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    if (password === hardcodedPassword) {
        next();
    } else {
        return res.status(401).json({ message: 'Invalid password' });
    }
};

app.post('/items', checkPassword, async (req, res) => {
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

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.delete('/items/:id', checkPassword, async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await Item.findOneAndDelete({ _id: itemId });
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully', deletedItem });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/buy', async (req, res) => {
    try {
        const { name, address, city, phone, additional, item } = req.body;
        const buy = new Buy({
            name: name,
            address: address,
            city: city,
            phone: phone,
            additional: additional,
            item: item,
        });
        await buy.save();
        res.json(buy);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/buy', async (req, res) => {
    try {
        const buy = await Buy.find();
        res.json(buy);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = (app);