const express = require('express');

const { sequelize, User, photo } = require('./models');

const app = express();
app.use(express.json());

app.post('/users', async(req, res) => {
    const { name, email, role } = req.body;
    try {
        const user = await User.create({ name, email, role });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    };
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({
            where: { uuid },
            include: 'photos'
        });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

app.post('/photos', async (req, res) => {
    const { userUuid, name, url } = req.body;
    try {
        const user = await User.findOne({ where: {uuid: userUuid }});
        const picture = await photo.create({ name, url, userId: user.id });
        return res.json(picture);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

app.get('/photos', async (req, res) => {
    try {
        const pictures = await photo.findAll({ include: ['user'] });
        return res.json(pictures);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

app.get('/photos/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const picture = await photo.findOne({ where: { uuid } });
        await photo.destroy()
        return res.json({ message: 'Photo deleted'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

app.put('/photos/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const { name, url } = req.body;
    try {
        const photo = await photo.findOne({ where: { uuid } });
        photo.name = name;
        photo.url = url;
        await photo.save();
        return res.json(photo);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

app.listen({ port: 5000 }, async () => {
    console.log(`Server up on http://localhost:5000`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
    

