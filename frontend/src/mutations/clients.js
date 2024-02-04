import {gql} from "@apollo/client";

export const DELETE_CLIENT = gql`
    mutation DeleteClient($deleteClientId: ID!) {
        deleteClient(id: $deleteClientId) {
            id
            name 
            phone
            email
        }
    }
`

export const ADD_CLIENT = gql`
    mutation AddClient($name: String!, $email: String!, $phone: String!) {
        addClient(name: $name, email: $email, phone: $phone) {
            id
            name 
            phone
            email
        }
    }
`