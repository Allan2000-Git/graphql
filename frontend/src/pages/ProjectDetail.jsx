import React from 'react'
import {useQuery} from "@apollo/client"
import { GET_PROJECT } from '../queries/projects';
import {Link, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import { FiAlertTriangle } from 'react-icons/fi';
import ClientInfoCard from '../components/ClientInfoCard';
import UpdateProjectForm from '../components/UpdateProjectForm';

const ProjectDetail = () => {
    const {projectId} = useParams();
    const {loading, data, error} = useQuery(GET_PROJECT, {
        variables:{
            getProjectId: projectId,
        },
        refetchQueries: [{
            query: GET_PROJECT
        }],
    });

    if (loading){
        return(
            <div className="loader">
                <ClipLoader color="#e535ab" />
            </div>
        )
    }
    if (error){
        return(
            <div className="error">
                <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                    <FiAlertTriangle /> Try again!. Something went wrong while fetching the data
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='mx-auto w-75 card p-5'>
                <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
                    Back
                </Link>

                <h1>{data.getProject.name}</h1>
                <p>{data.getProject.description}</p>

                <h5 className='mt-3'>Project Status</h5>
                <p className='lead'>{data.getProject.status}</p>

                <ClientInfoCard client={data.getProject.clientId} />

                <div className='mt-3'>
                    <UpdateProjectForm project={data.getProject} />
                </div>
            </div>
        </>
    )
}

export default ProjectDetail