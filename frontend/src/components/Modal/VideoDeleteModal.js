import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ModalFrame from "./ModalFrame";
import useFetch from "../../api/useFetch";

function VideoDeleteModal({ onClose, videoId }) {
    const [url, setUrl]= useState(null);
    const userTokenHeader = {'Authorization': `Bearer ${localStorage.getItem("token")}`};
    const { data: responseData, loading, error } = useFetch(url, 'DELETE', null, userTokenHeader);
    const navigate = useNavigate();


    const handleDelete = () => {
        setUrl(`/api/video/delete/${videoId}`);
    }

    useEffect(() => {
        console.log(responseData);
        if (responseData) {
            navigate("/");
        }
    }, [responseData, navigate]);

    return (
        <>
            <a href="/frontend/public"
               className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2"
                     src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                     alt="logo"/>
                ITube
            </a>
            <div>
                <button type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={handleDelete}
                >
                    Delete
                </button>
                <button type="button"
                        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                >
                    Cancel
                </button>
            </div>
        </>
    )
}

export default ModalFrame(VideoDeleteModal);