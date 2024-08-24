import React from 'react';
import {useParams} from "react-router-dom";
import useFetch from "../../api/useFetch";
import WriteComment from "./WriteComment";
import VideoEditButton from "./VideoEditButton";
import VideoDeleteButton from "./VideoDeleteButton";
import CommentList from "./CommentList";
import useIsAuthor from "../../utils/useIsAuthor";

export default function WatchVideo(){
    const { id } = useParams();
    const url = `/api/video/getVideo/${id}`;
    const { data: video, loading, error } = useFetch(url);
    const isAuthor = useIsAuthor(video?.authorId);
    const loadingHTML = <p>Loading...</p>
    const cardClassName = "mx-auto max-w-5xl mb-10 block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";

    return (
        <>
            <section className="bg-white py-4 antialiased dark:bg-gray-900 md:py-8">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className={cardClassName}>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error loading video.</p>}
                        {video && (
                            <>
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                        {video.title || 'Title'}
                                    </h2>
                                    <div>
                                        {isAuthor && (
                                            <>
                                                <VideoEditButton video={video} />
                                                <VideoDeleteButton videoId={video.id} />
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="my-8 xl:mb-16 xl:mt-12">
                                    <video
                                        className="mx-auto h-full dark:hidden max-h-[500px] rounded-[0.25rem]"
                                        src={video.videoUrl}
                                        controls
                                    />
                                    <video
                                        className="mx-auto hidden h-full dark:block max-h-[500px] rounded-[0.25rem]"
                                        src={video.videoUrl}
                                        controls
                                    />
                                </div>
                                <div className="mx-auto max-w-2xl space-y-6">
                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                        {video.description || loadingHTML}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                    {
                        video && (
                            <>
                                <div className={cardClassName}>
                                    <WriteComment videoId={video.id}/>
                                </div>
                                <div className={`${cardClassName} pb-0`}>
                                    <CommentList videoId={video.id}/>
                                </div>
                            </>
                        )
                    }
                </div>
            </section>
        </>
    )
}
