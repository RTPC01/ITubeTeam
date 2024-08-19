import VideoEditModal from "../Modal/VideoEditModal";
import {useState} from "react";

export default function VideoEditButton({ video }) {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            <button type="button"
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={openModal}
            >
                Edit
            </button>
            <VideoEditModal isOpen={modalOpen} onClose={closeModal} video={video}/>
        </>
    )
}