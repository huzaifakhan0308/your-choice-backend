const express = require('express')
const app = express()
const Item = require('../modules/item.js')
const Buy = require('../modules/buy.js')

const checkPassword = (req, res, next) => {
    const password = req.body.password;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    if (password === process.env.PASSWORD) {
        next();
    } else {
        return res.status(401).json({ message: 'Invalid password' });
    }
};

app.post('/items', checkPassword, async (req, res) => {
    try {
        const { title, img, price, off, colors, sizes, adults, type, quantity } = req.body;
        const items = new Item({
            title: title,
            img: img,
            price: price,
            off: off,
            colors: colors,
            sizes: sizes,
            adults: adults,
            type: type,
            quantity: quantity,
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const filters = {};
        if (req.query.type) {
            filters.type = req.query.type;
        }
        if (req.query.adults) {
            filters.adults = req.query.adults;
        }

        const items = await Item.find(filters).skip(skip).limit(limit);
        const totalCount = await Item.countDocuments(filters);

        res.json({ items, totalCount });
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
        const { name, address, email, city, phone, color, size, state, zip, quantity, productId } = req.body;
        const buy = new Buy({
            name: name,
            address: address,
            email: email,
            city: city,
            phone: phone,
            color: color,
            size: size,
            state: state,
            zip: zip,
            quantity: quantity,
            productId: productId
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

app.delete('/buy/:id', checkPassword, async (req, res) => {
    try {
        const buyId = req.params.id;
        const deletedBuy = await Buy.findOneAndDelete({ _id: buyId });
        if (!deletedBuy) {
            return res.status(404).json({ message: 'buy not found' });
        }
        res.json({ message: 'buy deleted successfully', deletedBuy });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = (app);