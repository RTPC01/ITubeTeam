import React, {useState} from "react";
import {useDropzone} from "react-dropzone";
import {asyncPost} from "../../api/async";
import ModalFrame from "./ModalFrame";

function VideoEditModal({ onClose, video }) {
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState(video.title);
    const [category, setCategory] = useState(video.category);
    const [description, setDescription] = useState(video.description);
    const [error, setError] = useState('');

    const labelClassName = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
    const inputClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";
    const videoCategory = [
        'Game',
        'Music',
        'Vlog',
        'Humor'
    ]

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles > 0) {
            setVideoFile(acceptedFiles[0]);
            setError('');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'video/*',
        multiple: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('videoFile', videoFile);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);

        try {
            const response = await asyncPost('api/video/edit', formData, 'multipart/form-data');
            console.log('Success:', response);
        } catch (error) {
            console.log('Error:', error);
        }
    }
    return (
        <>
            <a href="/frontend/public"
               className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2"
                     src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                     alt="logo"/>
                ITube
            </a>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div {...getRootProps()}
                         className="col-span-2 border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center cursor-pointer">
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p className="text-gray-500 dark:text-gray-400">Drop the video file here ...</p> :
                                videoFile ?
                                    <p className="text-gray-500 dark:text-gray-400">{videoFile.name}</p> :
                                    <p className="text-gray-500 dark:text-gray-400">Drag & drop a video file here,
                                        or click to select one</p>
                        }
                    </div>
                    <div>
                        <label htmlFor="title"
                               className={labelClassName}>Title</label>
                        <input type="text" name="title" id="title"
                               className={inputClassName}
                               placeholder="Type title" required
                               value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="category"
                               className={labelClassName}>Category</label>
                        <select id="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={category} required onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            {
                                videoCategory.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description"
                               className={labelClassName}>Description</label>
                        <textarea id="description" rows="4"
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Write video description here"
                                  required
                                  value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <button type="submit"
                        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd">
                        </path>
                    </svg>
                    Post Video!
                </button>
            </form>
        </>
    )
}

export default ModalFrame(VideoEditModal);