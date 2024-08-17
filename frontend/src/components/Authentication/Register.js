import React, { useState } from 'react';
import api from '../../api/api.js';
import {useDropzone} from "react-dropzone";
import {useNavigate} from "react-router-dom";
import LoginModal from "../Modal/LoginModal";

const Register = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        nickname:'',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        profileImg: null
    });

    const onDrop = (acceptedFiles) => {
        setFormData({
            ...formData,
            profileImg: acceptedFiles[0]
        })
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,  // 쿠키를 포함한 요청
            });
            console.log('User registered successfully', response.data);
            navigate('/');
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                             alt="logo"/>
                        ITube
                    </a>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        email</label>
                                    <input type="email" name="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="name@company.com" required="" value={formData.email}
                                           onChange={handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required="" value={formData.password} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="nickname"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nickname</label>
                                    <input type="text" name="nickname" id="nickname" placeholder="Your nickname"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required="" value={formData.nickname} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="firstName"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                        Name</label>
                                    <input type="text" name="firstName" id="firstName" placeholder="First Name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required="" value={formData.firstName} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="lastName"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Last Name
                                    </label>
                                    <input type="text" name="lastName" id="lastName" placeholder="Last Name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required="" value={formData.lastName} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                                        Number</label>
                                    <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required="" value={formData.phoneNumber} onChange={handleChange}/>
                                </div>
                                <div {...getRootProps()}
                                     className="col-span-2 border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center cursor-pointer">
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <p className="text-gray-500 dark:text-gray-400">Drop the Img file here
                                                ...</p> :
                                            formData.profileImg != null ?
                                                <p className="text-gray-500 dark:text-gray-400">{formData.profileImg.name}</p> :
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    Drag & drop a Img file here,
                                                </p>
                                    }
                                </div>
                                <button type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                                    an account
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?
                                    <a onClick={openModal}
                                       className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Login here
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <LoginModal isOpen={modalOpen} onClose={closeModal} />
            </section>

        </>
    )
        ;
};

export default Register;
