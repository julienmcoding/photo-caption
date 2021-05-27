const photoRouter = require('express').Router();
const { sequelize, User, photo } = require('../models');

module.exports = photoRouter;

photoRouter.post('/', async (req, res) => {
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

photoRouter.get('/', async (req, res) => {
    try {
        const pictures = await photo.findAll({ include: ['user'] });
        return res.json(pictures);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

photoRouter.get('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const picture = await photo.findOne({ where: { uuid } });
        await picture.destroy()
        return res.json({ message: 'Photo deleted'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

photoRouter.put('/:uuid', async (req, res) => {
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

photoRouter.delete('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const photo = await photo.findOne({ where: { uuid } });
        await photo.destroy();
        return res.json({message: 'Photo deleted'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});