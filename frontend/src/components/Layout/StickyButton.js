import React from 'react';

function StickyButton({buttonText, buttonIcon: ButtonIcon, onClick}) {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                className="flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="button"
                onClick={onClick}
            >
                {ButtonIcon && (
                    <span className="mr-2">
                        <ButtonIcon />
                    </span>
                )}
                {buttonText}
            </button>
        </div>
    );
}

export default StickyButton;
