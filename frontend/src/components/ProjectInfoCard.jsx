import { useMutation } from '@apollo/client';
import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from '../mutations/projects';
import { GET_ALL_PROJECTS } from '../queries/projects';

const ProjectInfoCard = ({project}) => {
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables:{
            deleteProjectId: project.id,
        },
        refetchQueries: [{
            query: GET_ALL_PROJECTS
        }],
        // update(cache, { data: { deleteClient } }) {
        //     const { clients } = cache.readQuery({ query: GET_ALL_CLIENTS });
        //     cache.writeQuery({
        //         query: GET_ALL_CLIENTS,
        //         data: {
        //             clients: clients.filter((client) => client.id !== deleteClient.id),
        //         },
        //     });
        // },
    });

    return (
        <div className="col-md-6 mb-4">
            <div className="card mb-1">
                <div className="card-body shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className='card-title'>{project.name}</h5>

                        <div className="d-flex gap-3 align-items-center">
                            <a className="btn btn-info" href={`/projects/${project.id}`}>
                                View
                            </a>
                            <button onClick={deleteProject} type="button" className="btn btn-danger btn-sm">
                                <FaTrash/>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="small">
                            Status: <strong>{project.status}</strong>
                        </p>
                        <p className="small">
                            Client: <strong>{project.clientId.name}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfoCard