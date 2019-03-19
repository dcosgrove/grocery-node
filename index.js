const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

let items = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api', (req, res) => res.send('Grocery list app running OK'))

app.get('/api/items', (req, res) => res.status(200).json({ items }))
app.post('/api/items', (req, res) => {
    const { item } = req.body;

    items = [ ...items, item];

    res.status(201).json({ items });
});

app.delete('/api/items/:name', (req, res) => {
    const { name } = req.params;

    items = items.filter(item => item !== name);
    res.status(200).json({ items });
});

app.use('/', express.static(path.join(__dirname, 'grocery-react/build')));

app.listen(port, () => console.log(`Grocery list app listening on port ${port}!`))
