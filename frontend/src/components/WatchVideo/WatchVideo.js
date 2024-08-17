import React, { useEffect, useState } from 'react';
import Header from "../Layout/Header";
import {useParams} from "react-router-dom";
import useFetch from "../../api/useFetch";
import WriteComment from "./WriteComment";
import VideoEditButton from "./VideoEditButton";
import VideoDeleteButton from "./VideoDeleteButton";

export default function WatchVideo(){
    const { id } = useParams();

    const url = `/api/video/getVideo/${id}`;
    const { data: video, loading, error } = useFetch(url);
    const loadingHTML = <p>Loading...</p>
    const cardClassName = "block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";
    return (
        <>
            <section className="bg-white py-4 antialiased dark:bg-gray-900 md:py-8">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className={`mx-auto max-w-5xl mb-10 ${cardClassName}`}>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error loading video.</p>}
                        {video && (
                            <>
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                        {video.title || 'Title'}
                                    </h2>
                                    <div>
                                        <VideoEditButton video={video} />
                                        <VideoDeleteButton />
                                    </div>
                                </div>
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
                    </div>
                    <div className={`mx-auto max-w-5xl ${cardClassName}`}>
                        <WriteComment/>
                    </div>
                </div>
            </section>
        </>
    )
}
