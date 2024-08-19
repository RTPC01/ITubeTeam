import VideoDeleteModal from "../Modal/VideoDeleteModal";
import {useState} from "react";

export default function VideoDeleteButton({ videoId }) {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <button type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={openModal}
            >
                Delete
            </button>
            <VideoDeleteModal isOpen={modalOpen} onClose={closeModal} videoId={videoId} />
        </>
    )
}