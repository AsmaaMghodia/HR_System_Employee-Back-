const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({

    name: String,
    photo: String,
    phone: Number,
    salary: Number,
    birthDate: Date,
    skills: [String],
    absenceDays:
        {
            type: Number,
            default: 0
        },
    degree: String,
    departmentId: String,
    ProjectId: String,
    position: String
})
const Employees = mongoose.model('Employees',employeeSchema)

module.exports = Employees;