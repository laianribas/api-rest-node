import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'
import Product from './Product.js'

const Section = connection.define('Section', {
    section_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Section.hasMany(Product)
Product.belongsTo(Section)

export default Section