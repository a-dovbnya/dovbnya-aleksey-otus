import { users, products, brands } from './demo-data.mjs'
import { uuid } from 'uuidv4'

const createEntity = (input) => {
    const id = uuid()

    return {
        id, ...input
    }
}

export const resolvers = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id)
    },
    createUser: ({input}) => {
        const user = createEntity(input)
        users.push(user)
        return user
    },
    getAllProducts: () => {
        return products
    },
    getProduct: ({id}) => {
        return products.find(product => product.id == id)
    },
    createProduct: ({input}) => {
        const product = createEntity(input)
        products.push(product)
        return product
    },
    getAllBrands: () => {
        return brands
    },
    getBrand: ({id}) => {
        return brands.find(brand => brand.id == id)
    },
    createBrand: ({input}) => {
        const brand = createEntity(input)
        brands.push(brand)
        return brand
    },
}