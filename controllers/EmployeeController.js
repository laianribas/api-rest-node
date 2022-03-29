import Department from '../models/Department.js'
import Employee from '../models/Employee.js'
import js2xmlparser from 'js2xmlparser'

export default class EmployeeController {
    static async createEmployee(req, res) {
        const { firstname, lastname, departmentid } = req.body
        if (!firstname || firstname == '') {
            return res
                .status(422)
                .json({ message: 'O nome do funcionário deve ser preenchido!' })
        }
        if (!lastname || lastname == '') {
            return res
                .status(422)
                .json({ message: 'O sobrenome do funcionário deve ser preenchido!' })
        }
        if (!departmentid || departmentid == '') {
            return res
                .status(422)
                .json({ message: 'O departmentid do funcionário deve ser preenchido!' })
        }
        const employeeExists = await Employee.findOne({
            where: {
                first_name: firstname,
                last_name: lastname,
                departmentId: departmentid
            },
            include: Department,
            raw: true
        })
        if (employeeExists) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res
                    .status(422)
                    .json({ message: 'O funcionário já está cadastrado!' })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(422).send(
                    js2xmlparser.parse('Error', {
                        message: 'O funcionário já está cadastrado!'
                    })
                )
            }
        }
        const department = await Department.findOne({ where: { id: departmentid } })
        if (!department) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                return res.status(422).json({ message: 'Departamento não encontrado' })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                return res.status(422).send(
                    js2xmlparser.parse('Error', {
                        message: 'Departamento não encontrado'
                    })
                )
            }
        }
        try {
            const employee = await Employee.create({
                first_name: firstname,
                last_name: lastname,
                departmentId: departmentid,
                active: true
            })
            const employeeCreation = await Employee.findOne({
                where: {
                    first_name: firstname,
                    last_name: lastname,
                    departmentId: departmentid
                },
                include: Department,
                raw: true
            })
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(200).json({ employeeCreation })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('Employee', employeeCreation))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('error', error))
            }
        }
    }
    static async getAllEmployees(req, res) {
        try {
            const employees = await Employee.findAll({
                include: Department,
                raw: true
            })
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(200).json({ employees })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('Employees', employees))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('error', error))
            }
        }
    }
    static async getEmployee(req, res) {
        const { id } = req.params
        try {
            const employee = await Employee.findOne({
                where: {
                    id: id
                },
                include: Department,
                raw: true
            })
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(200).json({ employee })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('Employee', employee))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('error', error))
            }
        }
    }
    static async updateEmployee(req, res) {
        const { id } = req.body
        try {
            const employee = {
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                departmentId: req.body.departmentid
            }
            const employeeUpdated = await Employee.update(employee, {
                where: { id: id }
            })
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(200).json({ employeeUpdated })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('Employee', employeeUpdated))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('error', error))
            }
        }
    }
    static async deleteEmployee(req, res) {
        const { id } = req.body
        const employee = {
            active: false
        }
        try {
            const employeeDeleted = await Employee.update(employee, {
                where: { id: id }
            })
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(200).json({ employeeDeleted })
            } else if (req.headers['response-type'] == 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('Employee', employeeDeleted))
            }
        } catch (error) {
            if (
                req.headers['response-type'] === 'json' ||
                req.headers['response-type'] === undefined
            ) {
                res.status(500).json({ error })
            } else if (req.headers['response-type'] === 'xml') {
                res.header('Content-Type', 'application/xml')
                res.send(js2xmlparser.parse('error', error))
            }
        }
    }
}