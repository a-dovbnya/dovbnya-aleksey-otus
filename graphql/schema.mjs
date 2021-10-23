import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    
    type User {
        id: ID
        username: String!
        age: Int
        email: String
    }

    type Product {
        id: ID
        productName: String!
        color: String
        brand: ID
    }

    type Brand {
        id: ID
        name: String
    }
    
    input UserInput {
        id: ID
        username: String!
        age: Int!
        email: String
    }

    input ProductInput {
        id: ID
        productName: String!
        color: String
        brand: ID
    }

    input BrandInput {
        id: ID
        name: String!
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
        getAllProducts: [Product]
        getProduct(id: ID): Product
        getAllBrands: [Brand]
        getBrand(id: ID): Brand
    }

    type Mutation {
        createUser(input: UserInput): User
        createProduct(input: ProductInput): Product
        createBrand(input: BrandInput): Brand
    }

`)

