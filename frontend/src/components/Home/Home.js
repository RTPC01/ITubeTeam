import React, { useState } from 'react';
import Breadcrumb from "../Layout/Breadcrumb";
import DropdownButton from "../Layout/DropdownButton";
import StickyButton from "../Layout/StickyButton";
import CamIcon from "../../svg/CamIcon";
import VideoPostModal from "./VideoPostModal";
import LogoImg from "../Layout/LogoImg";
import HomePageListBox from "./HomePageListBox";
import useFetch from "../../api/useFetch";
import Header from "../Layout/Header";

export default function Home() {
    const [openPostModal, setOpenPostModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const url = selectedCategory === 'All' ? '/api/video/list' : `/api/video/category/${selectedCategory}`;
    const { data: videos, loading, error } = useFetch(url);

    const categoryButtonClassName = "text-left w-full px-2 py-1";

    const togglePostModal = () => {
        setOpenPostModal(prevState => !prevState);
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    return (
        <>
            <Header />
            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    {/* Heading & Filters */}
                    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                        <Breadcrumb/>
                        <div className="flex mt-3">
                            <LogoImg />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">ITube</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <DropdownButton
                                buttonText="Category"
                                buttonIcon="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
                            >
                                <button
                                    className={categoryButtonClassName}
                                    onClick={() => handleCategoryChange('All')}>
                                    All
                                </button>
                                <button
                                    className={categoryButtonClassName}
                                    onClick={() => handleCategoryChange('Game')}>
                                    Game
                                </button>
                                <button
                                    className={categoryButtonClassName}
                                    onClick={() => handleCategoryChange('Music')}>
                                    Music
                                </button>
                                <button
                                    className={categoryButtonClassName}
                                    onClick={() => handleCategoryChange('Vlog')}>
                                    Vlog
                                </button>
                                <button
                                    className={categoryButtonClassName}
                                    onClick={() => handleCategoryChange('Humor')}>
                                    Humor
                                </button>
                            </DropdownButton>
                        </div>
                    </div>
                    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                        {loading && <p>Loading....</p>}
                        {error && <p>Error loading videos: {error.message}</p>}
                        {videos && videos.map(video => (
                            <HomePageListBox key={video.id} video={video}/>
                        ))}
                    </div>
                    <div className="w-full text-center">
                        <button type="button"
                                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                            Show more
                        </button>
                    </div>
                </div>
                <StickyButton buttonText="Post" buttonIcon={CamIcon} onClick={togglePostModal}/>
                <VideoPostModal isOpen={openPostModal} onClose={togglePostModal}/>
            </section>
        </>
    );
}
