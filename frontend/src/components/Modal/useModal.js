import { useState, useEffect } from "react";

export function useModal(isOpen, onClose) {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (isOpen) {
            setAnimationClass('modal-enter');
        } else {
            setAnimationClass('modal-exit');
        }
    }, [isOpen]);

    const handleAnimationEnd = () => {
        if (!isOpen) {
            onClose();
        }
    };

    return {
        animationClass,
        handleAnimationEnd
    };
}
