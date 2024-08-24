import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // 표시할 최대 페이지 수
        let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 0);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 0);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i}>
                    <button
                        onClick={() => handlePageClick(i)}
                        className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${currentPage === i ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                    >
                        {i + 1}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
                <li>
                    <button
                        onClick={() => onPageChange(0)} // 첫 페이지로 이동
                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        disabled={currentPage === 0}
                    >
                        First
                    </button>
                </li>
                <li>
                    <button
                        onClick={handlePreviousPage}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                </li>
                {renderPageNumbers()}
                <li>
                    <button
                        onClick={handleNextPage}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        disabled={currentPage >= totalPages - 1}
                    >
                        Next
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onPageChange(totalPages - 1)} // 마지막 페이지로 이동
                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        disabled={currentPage >= totalPages - 1}
                    >
                        Last
                    </button>
                </li>
            </ul>
        </nav>
    );
}
