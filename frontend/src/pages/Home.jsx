import React from 'react'
import Projects from '../components/Projects'
import AddClientForm from '../components/AddClientForm'
import Clients from '../components/Clients'
import AddProjectForm from '../components/AddProjectForm'

const Home = () => {
    return (
        <>
            <div className="d-flex gap-3 mb-3">
                <AddClientForm/>
                <AddProjectForm/>
            </div>
            <Projects/>
            <Clients/>
        </>
    )
}

export default Home