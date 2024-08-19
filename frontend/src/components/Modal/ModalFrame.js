import React from "react";
import ReactDOM from "react-dom";
import {useModal} from "./useModal";

function ModalFrame(WrappedComponent) {
    return function ModalComponent({ isOpen, onClose, header, ...props }) {
        const { animationClass, handleAnimationEnd } = useModal(isOpen, onClose);

        if (!isOpen) return null;

        return ReactDOM.createPortal(
            <div
                id="static-modal"
                data-modal-backdrop="static"
                tabIndex="-1"
                className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-600 bg-opacity-50 ${animationClass}`}
                onAnimationEnd={handleAnimationEnd}
            >
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div
                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {header}
                            </h3>
                            <button type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={onClose}
                                    data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-autolg:py-0">
                            <WrappedComponent {...props} onClose={onClose}/>
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById('modal')
        );
    };
}

export default ModalFrame;
