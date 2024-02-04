import React from 'react'
import { useQuery } from '@apollo/client';
import {ClipLoader} from "react-spinners";
import ClientRow from './ClientRow';
import { GET_ALL_CLIENTS } from '../queries/clients';
import { FiAlertTriangle } from "react-icons/fi";

const Clients = () => {
    const { loading, error, data } = useQuery(GET_ALL_CLIENTS);

    if (loading){
        return(
            <div className="loader">
                <ClipLoader color="#e535ab" />
            </div>
        )
    }
    if (error){
        return(
            <div className="error my-5">
                <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                    <FiAlertTriangle /> Try again!. Something went wrong while fetching the data
                </div>
            </div>
        )
    }

    return (
        <>
            {
                !loading && !error && (
                    <table className="table table-hover mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.getAllClients.map((client) => (
                                    <ClientRow key={client.id} client={client} />
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </>
    )
}

export default Clients