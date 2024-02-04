import React from 'react'
import { useState } from 'react';
import { GrProjects } from "react-icons/gr";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_PROJECTS } from '../queries/projects';
import { ADD_PROJECT } from '../mutations/projects';
import { GET_ALL_CLIENTS } from '../queries/clients';
import { FiAlertTriangle } from 'react-icons/fi';

const AddProjectForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('UNASSIGNED');
    const [clientId, setClientId] = useState('');

    const { loading, error, data } = useQuery(GET_ALL_CLIENTS);

    const [isError, setIsError] = useState(false);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables:{
            name, 
            description, 
            status,
            clientId
        },
        refetchQueries: [{
            query: GET_ALL_PROJECTS
        }],
    });

    const onSubmit = (e) => {
        e.preventDefault();
    
        if (name === '' || description === '' || status === '' || clientId === '') {
            return setIsError(true);
        }
    
        addProject(name, description, status, clientId);
    
        setName('');
        setDescription('');
        setStatus('');
        setClientId('');
    };

    return (
        <>
            <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#addProjectModal' >
                <div className='d-flex align-items-center'>
                    <GrProjects className='icon' />
                    <div>Add Project</div>
                </div>
            </button>

            <div className='modal fade' id='addProjectModal' aria-labelledby='addClientModalLabel' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='addClientModalLabel'>
                                Add Project
                            </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            {
                                isError && (
                                    <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                                        <FiAlertTriangle /> Fill all the fields
                                    </div>
                                )
                            }
                            <form onSubmit={onSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Name</label>
                                    <input placeholder='Ex. E-Commerce Website' type='text' className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Description</label>
                                    <textarea placeholder='Lorem Ipsum...' rows={6} className='form-control' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Status</label>
                                    <select id='status' className='form-select' value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value='ASSIGNED'>ASSIGNED</option>
                                        <option value='UNASSIGNED'>UNASSIGNED</option>
                                        <option value='IN_PROGRESS'>IN_PROGRESS</option>
                                        <option value='COMPLETED'>COMPLETED</option>
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Client</label>
                                    <select id='status' className='form-select' value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                        <option value=''>Choose a Client</option>
                                        {
                                            data?.getAllClients.map((client) => (
                                                <option key={client.id} value={client.id}>{client.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <button type='submit' data-bs-dismiss={!isError && "modal"} className='btn btn-primary' >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProjectForm