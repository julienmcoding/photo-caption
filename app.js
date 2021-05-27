const express = require('express');

const { sequelize, User, photo } = require('./models');

const app = express();
app.use(express.json());

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const photoRouter = require('./routes/photos');
app.use('/photos', photoRouter);



app.listen({ port: 5000 }, async () => {
    console.log(`Server up on http://localhost:5000`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
    

