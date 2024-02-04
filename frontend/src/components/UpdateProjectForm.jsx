import React from 'react'
import { useState } from 'react';
import { GrProjects } from "react-icons/gr";
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projects';
import { UPDATE_PROJECT } from '../mutations/projects';
import { FiAlertTriangle } from 'react-icons/fi';

const UpdateProjectForm = ({project}) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(() => {
        switch (project.status) {
            case "ASSIGNED":
                return "ASSIGNED";
            case "UNASSIGNED":
                return "UNASSIGNED";
            case "IN_PROGRESS":
                return "IN_PROGRESS";
            case "COMPLETED":
                return "COMPLETED";
            default:
                throw new Error(`Unknown status: ${project.status}`);
        }
    });
    const [isError, setIsError] = useState(false);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables:{
            id: project.id,
            name, 
            description, 
            status
        },
        refetchQueries: [{
            query: GET_PROJECT,
            variables:{
                id: project.id
            }
        }],
    });

    const onSubmit = (e) => {
        e.preventDefault();
    
        if (name === '' || description === '' || status === '') {
            return setIsError(true);
        }
    
        updateProject(name, description, status);
    };

    return (
        <>
            <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#updateProjectModal' >
                <div className='d-flex align-items-center'>
                    <GrProjects className='icon' />
                    <div>Update Project</div>
                </div>
            </button>

            <div className='modal fade' id='updateProjectModal' aria-labelledby='updateProjectModalLabel' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='updateProjectModalLabel'>
                                Update Project
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

                                <button type='submit' data-bs-dismiss={!isError && "modal"} className='btn btn-secondary' >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProjectForm