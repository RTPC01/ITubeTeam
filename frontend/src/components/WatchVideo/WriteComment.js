import React, {useContext, useState} from "react";
import AuthContext from "../Context/AuthContext";
import LoginModal from "../Modal/LoginModal";
import {asyncPost} from "../../api/async";

export default function WriteComment({ videoId }) {
    const [description, setDescription] = useState("");
    const { user } = useContext(AuthContext);

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('videoId', videoId);
        formData.append('description', description);

        try {
            const response = asyncPost("/comment/write", formData, "multipart/form-data");
            console.log("Comment submitted:", response);
        } catch (error) {
            console.log('Error:', error);
        }

    }

    const textAreaClassName = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";

    return (
        <section>
            <div className="px-4 mx-auto max-w-screen-md">
                { user? (
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your comment</label>
                            <textarea
                                id="message"
                                rows="3"
                                className={textAreaClassName}
                                value = {description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Leave a comment..."
                                required>
                            </textarea>
                        </div>
                        <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Write comment</button>
                    </form>
                ) : (
                    <div className="space-y-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                Your comment
                            </label>
                            <textarea
                                id="message"
                                rows="3"
                                readOnly
                                onClick={openModal}
                                className={textAreaClassName}
                                defaultValue="Please Login"
                            />
                        </div>
                        <LoginModal isOpen={modalOpen} onClose={closeModal} />
                    </div>
                )}
            </div>
        </section>
    )
}