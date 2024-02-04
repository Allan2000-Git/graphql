import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clients';
import { GET_ALL_CLIENTS } from '../queries/clients';
import { GET_ALL_PROJECTS } from '../queries/projects';

const ClientRow = ({client}) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables:{
            deleteClientId: client.id,
        },
        refetchQueries: [{
            query: GET_ALL_CLIENTS
        },{
            query: GET_ALL_PROJECTS
        }],
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}

export default ClientRow