import React, { useEffect, useState } from 'react';
import Header from "../Layout/Header";
import {useParams} from "react-router-dom";
import useFetch from "../../api/useFetch";
import WriteComment from "../Layout/WriteComment";

export default function WatchVideo(){
    const { id } = useParams();

    const url = `/api/video/getVideo/${id}`;
    const { data: video, loading, error } = useFetch(url);
    const loadingHTML = <p>Loading...</p>
    return (
        <>
            <section className="bg-white py-4 antialiased dark:bg-gray-900 md:py-8">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        {loading && <p>Loading...</p>}
                        {error && <p>Error loading video.</p>}
                        {video && (
                            <>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                    {video.title || 'Title'}
                                </h2>
                                <div className="my-8 xl:mb-16 xl:mt-12">
                                    <video
                                        className="mx-auto h-full dark:hidden max-h-[500px]"
                                        src={video.videoUrl}
                                        controls
                                    />
                                    <video
                                        className="mx-auto hidden h-full dark:block max-h-[500px]"
                                        src={video.videoUrl}
                                        controls
                                    />
                                </div>
                                <div className="mx-auto max-w-2xl space-y-6">
                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                        {video.description || loadingHTML }
                                    </p>
                                </div>
                            </>
                        )}
                        {/*<div className="my-6 md:my-12">*/}
                        {/*    <iframe className="h-[260px] md:h-[540px] w-full rounded-lg"*/}
                        {/*            src="https://www.youtube.com/embed/QquHd8HuatY"*/}
                        {/*            title="Flowbite Crash Course in 20 mins | Introduction to UI components using Tailwind CSS"*/}
                        {/*            frameBorder="0"*/}
                        {/*            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                        {/*            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>*/}
                        {/*</div>*/}
                        <div className="text-center">
                            <a href="#"
                               className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Show
                                more...</a>
                        </div>
                    </div>
                </div>
            </section>
            <WriteComment />
        </>
    )
}