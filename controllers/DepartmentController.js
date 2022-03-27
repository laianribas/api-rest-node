import Department from '../models/Department.js'

export default class DepartmentController {
    static async createDepartment(req, res) {
        const { departmentname } = req.body
        if (!departmentname) {
            return res
                .status(422)
                .json({ message: 'O nome do departamento deve ser preenchido!' })
        }
        try {
            const department = await Department.findOrCreate({
                where: { department_name: departmentname }
            })
            res.status(200).json({ department })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }
    static async getAllDepartments(req, res) {
        try {
            const departments = await Department.findAll()
            res.status(200).json({ departments })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    static async getDepartment(req, res) {
        const { id } = req.params
        try {
            const department = await Department.findOne({ where: { id: id } })
            res.status(200).json({ department })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    static async updateDepartment(req, res) {
        const { id, departmentname } = req.body
        if (!id) {
            return res
                .status(422)
                .json({ message: 'O departamento deve ser informado!' })
        }
        if (departmentname == '') {
            return res
                .status(422)
                .json({ message: 'O nome do departamento deve ser preenchido!' })
        }
        try {
            const department = {
                department_name: departmentname
            }
            const departmentUpdated = await Department.update(department, {
                where: { id: id }
            })
            res.status(200).json({ departmentUpdated })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    static async deleteDepartment(req, res) {
        const { id } = req.body
        if (!id) {
            return res
                .status(422)
                .json({ message: 'O departamento deve ser informado!' })
        }
        try {
            const departmentDeleted = await Department.destroy({ where: { id: id } })
            res.status(200).json({ departmentDeleted })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}