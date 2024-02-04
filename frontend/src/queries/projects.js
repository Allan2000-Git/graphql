import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS = gql`
    query GetProjects {
        getAllProjects {
            id
            name
            description
            status
            clientId {
            id
            name
        }
    }
}
`

export const GET_PROJECT = gql`
    query GetProject($getProjectId: String!) {
        getProject(id: $getProjectId) {
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