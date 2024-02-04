import { gql } from '@apollo/client';

export const GET_ALL_CLIENTS = gql`
    query GetAllClients {
        getAllClients {
            id
            name
            email
            phone
        }
    }
`;
