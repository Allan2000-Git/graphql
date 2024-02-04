import {gql} from "@apollo/client";

export const ADD_PROJECT = gql`
    mutation AddProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: String!) {
        addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
            id
            name
            description
            status
            clientId {
                id
                name
                email
                phone
            }    
        }
    }
`

export const UPDATE_PROJECT = gql`
    mutation UpdateProject($id:ID!, $name: String!, $description: String!, $status: ProjectStatus!) {
        updateProject(id: $id, name: $name, description: $description, status: $status) {
            id
            name
            description
            status
            clientId {
                id
                name
                email
                phone
            }    
        }
    }
`

export const DELETE_PROJECT = gql`
    mutation DeleteProject($deleteProjectId: ID!){
        deleteProject(id: $deleteProjectId){
            id
            name
        }
    }
`