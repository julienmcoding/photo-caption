const userRouter = require('express').Router();
const { sequelize, User, photo } = require('../models');

const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = userRouter;

userRouter.post('/', async(req, res) => {
    try {
        await bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            return User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
              })      
              .then((user) => res.status(201).send({
                id: user.id,
                name: user.name,
                email: user.email
              }))
            })
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    };
});

userRouter.post('/login', async(req, res) => {
    const user = await User.findOne({
        where: { email: req.body.email }
    });
    if(user == null) {
        return res.status(404).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Sucess');
            const token = user.generateToken();
            return res.header("authorization", token).status(200).send({
                name: user.name,
                email: user.email,
                token: token
            });
            /*const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken });*/
        } else {
            res.send('Incorrect password or username')
        }
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