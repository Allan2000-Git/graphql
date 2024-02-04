import React from 'react'
import { useQuery } from '@apollo/client';
import {ClipLoader} from "react-spinners";
import { GET_ALL_PROJECTS } from '../queries/projects';
import ProjectInfoCard from './ProjectInfoCard';
import { FiAlertTriangle } from 'react-icons/fi';

const Projects = () => {
    const { loading, error, data } = useQuery(GET_ALL_PROJECTS);

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
        <div>
            {data.getAllProjects.length > 0 ? 
                (
                    <div className="row mt-4">
                        {data.getAllProjects.map((project) => (
                                <ProjectInfoCard key={project.id} project={project} />
                            ))
                        }
                    </div>
                ) : 
                (
                    <p>No Projects found</p>
                )
            }
        </div>
    )
}

export default Projects