const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const Employees = require('./models/employee');
app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

mongoose.connect('mongodb://localhost/HR-System', { useNewUrlParser: true })
    .then(() => console.log('connected to db successfully'))
    .catch((err) => console.log(err));


Employees.insertMany([{
        name: 'soha',
        phone: 100447766557,
        salary: 9000,
        skills: ['testing'],
        degree: 'PHP',
        position: 'tester'
    },
    {
        name: 'osama',
        phone: 9876567,
        salary: 8000,

        skills: ['programming'],
        position: 'programmer'
    },
    {
        name: 'moaaz',
        phone: 55702256,
        salary: 7900,
        skills: ['analysis'],
        position: 'analysist'
    },
    {
        name: 'mohannad',
        phone: 765324567,
        salary: 50000,
        skills: ['software engineer'],
        position: 'manager'
    }
])

app.get('/HR-System', async(req, res) => {
    console.log("get");
    const result = await Employees.find();
    res.send(result);
})

app.get('/HR-System/:name', async(req, res) => {

    const result = await Employees.find({ name: req.params.name });
    if (result.length === 0) {
        res.send('This Employee is not exist get');
    } else {
        res.send(result);
    }

})

app.post('/HR-System', async(req, res) => {

    const result = await Employees.create(req.body);
    console.log("post");
    res.send("added successfully ");
})


app.delete('/HR-System/:name', async(req, res) => {
    try {
        const result = await Employees.find({ name: req.params.name });
        if (result.length > 0) {
            const deletedEmployee = await Employees.deleteMany({ name: result[0].name })
            res.send(`${deletedEmployee.deletedCount} employees have the same name have been deleted`);

        } else {
            res.send('This Employee is not exist');

        }

    } catch (error) {
        console.log(error.message)
    }
})

app.put('/HR-System/:name', async(req, res) => {
    try {
        const fresult = await Employees.find({ name: req.params.name });
        if (fresult.length > 0) {
            const result = await Employees.findOneAndUpdate(req.params.name, {
                name: req.body.name,
                salary: req.body.salary,
                position: req.body.position,
                phone: req.body.phone,
                skills: req.body.array,
                absenceDays: req.body.absenceDays,
                departmentId: req.body.departmentId,
                ProjectId: req.body.ProjectId,
                birthDate: req.body.birthDate,
                degree: req.body.degree
            }, {
                new: true
            });
            res.send(result);

        } else {
            res.send('This Employee is not exist');

        }

    } catch (error) {
        console.log(error.message)
    }
})

app.listen(4000, () => console.log('listining for requests...'))