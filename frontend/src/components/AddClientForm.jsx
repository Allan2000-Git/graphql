import React from 'react'
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clients';
import { GET_ALL_CLIENTS } from '../queries/clients';
import { FiAlertTriangle } from 'react-icons/fi';

const AddClientForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [isError, setIsError] = useState(false);

    const [addClient] = useMutation(ADD_CLIENT, {
        variables:{
            name, 
            email, 
            phone
        },
        refetchQueries: [{
            query: GET_ALL_CLIENTS
        }],
    });

    const onSubmit = (e) => {
        e.preventDefault();
    
        if (name === '' || email === '' || phone === '') {
            return setIsError(true);
        }
    
        addClient(name, email, phone);
    
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <>
            <button type='button' className='btn btn-secondary' data-bs-toggle='modal' data-bs-target='#addClientModal' >
                <div className='d-flex align-items-center'>
                    <FaUser className='icon' />
                    <div>Add Client</div>
                </div>
            </button>

            <div className='modal fade' id='addClientModal' aria-labelledby='addClientModalLabel' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='addClientModalLabel'>
                                Add Client
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
                                    <input type='text' className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Email</label>
                                    <input type='email' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Phone</label>
                                    <input type='text' className='form-control' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>

                                <button type='submit' data-bs-dismiss={!isError && "modal"} className='btn btn-secondary' >
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

export default AddClientForm