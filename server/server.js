const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 7000

app.use(cors());
app.use(express.json());

const uri = 'mongodb://git'
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', () =>
    console.log('MongoDB connection established successfully!')
)

const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.listen(port, () => 
    console.log('Server is running, port:', port)
) 