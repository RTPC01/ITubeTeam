import React from "react";

export default function ProfileButton({ nickName, ImgUrl }) {
    return (
        <a href="/"
           className="flex items-center gap-2 border border-gray-200 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
            <img src={ImgUrl} className="w-8 h-8 rounded-full border" alt="profileImg"/>
            <span>{nickName}</span>
        </a>
    )
}