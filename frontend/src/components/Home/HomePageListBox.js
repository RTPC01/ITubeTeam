import React from "react";
import { Link } from "react-router-dom";
import EyeIcon from "../../svg/EyeIcon";
import PenIcon from "../../svg/PenIcon";
import EmptyHeart from "../../svg/EmptyHeart";
import useFetch from "../../api/useFetch";

export default function HomePageListBox ({ video }) {
    const {data: userData, loading, error} = useFetch(`userInfo/${video.authorId}`);
    const videoThumbnail = video.videoUrl ? video.videoUrl.replace(/\.[^/.]+$/, '.jpg') : null;
    const uploadDate = video.uploadDate.substr(0, 10);

    return (
        <div
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="h-56 w-full">
                <img
                    className="mx-auto h-full dark:hidden"
                    src={videoThumbnail}
                    alt={video.title}
                />
                <img
                    className="mx-auto hidden h-full dark:block"
                    src={videoThumbnail}
                    alt={video.title}/>
            </div>
            <div className="pt-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                                <span
                                    className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                    {uploadDate}
                                </span>

                    <div className="flex items-center justify-end gap-1">
                        <button type="button" data-tooltip-target="tooltip-add-to-favorites-8"
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only"> Add to Favorites </span>
                            <EmptyHeart />
                        </button>
                        <div id="tooltip-add-to-favorites-8" role="tooltip"
                             className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                             data-popper-placement="top">
                            Add to favorites
                            <div className="tooltip-arrow" data-popper-arrow=""></div>
                        </div>
                    </div>
                </div>

                <div
                   className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                    {video.title}
                </div>

                {/*<div className="mt-2 flex items-center gap-2">*/}
                {/*    <div className="flex items-center">*/}
                {/*        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true"*/}
                {/*             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">*/}
                {/*            <path*/}
                {/*                d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>*/}
                {/*        </svg>*/}

                {/*        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true"*/}
                {/*             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">*/}
                {/*            <path*/}
                {/*                d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>*/}
                {/*        </svg>*/}

                {/*        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true"*/}
                {/*             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">*/}
                {/*            <path*/}
                {/*                d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>*/}
                {/*        </svg>*/}

                {/*        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true"*/}
                {/*             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">*/}
                {/*            <path*/}
                {/*                d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>*/}
                {/*        </svg>*/}

                {/*        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true"*/}
                {/*             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">*/}
                {/*            <path*/}
                {/*                d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>*/}
                {/*        </svg>*/}
                {/*    </div>*/}

                {/*    <p className="text-sm font-medium text-gray-900 dark:text-white">4.9</p>*/}
                {/*    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(4,775)</p>*/}
                {/*</div>*/}

                <ul className="mt-2 flex items-center gap-4">
                    <li className="flex items-center gap-2">
                        <PenIcon/>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            { loading ? "Loading..." : userData.nickname }
                        </p>
                    </li>

                    <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                  d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                        </svg>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{video.category}</p>
                    </li>
                </ul>

                <div className="mt-4 flex items-center justify-between gap-4">
                    <Link to={`/watchVideo/${video.id}`}
                          className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <EyeIcon className="-ms-2 me-2 mr-2 h-5 w-5" aria-hidden="true" />
                        View
                    </Link>
                </div>
            </div>
        </div>
    )
}