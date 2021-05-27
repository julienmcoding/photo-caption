const userRouter = require('express').Router();
const { sequelize, User, photo } = require('../models');

module.exports = userRouter;

userRouter.post('/', async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    };
});

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

userRouter.get('/:uuid', async (req, res) => {
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

userRouter.put('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ where: { uuid } });
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});

userRouter.delete('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await user.findOne({ where: { uuid } });
        await user.destroy();
        return res.json({message: 'User deleted'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });        
    };
});