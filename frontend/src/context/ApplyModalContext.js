import React, { createContext, useContext, useState } from 'react';

const ApplyModalContext = createContext();

export function useApplyModal() {
    return useContext(ApplyModalContext);
}

export function ApplyModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [preselectedCourse, setPreselectedCourse] = useState('');

    const openModal = (course = '') => {
        setPreselectedCourse(course);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsOpen(false);
        setPreselectedCourse('');
        document.body.style.overflow = '';
    };

    return (
        <ApplyModalContext.Provider value={{ isOpen, openModal, closeModal, preselectedCourse }}>
            {children}
        </ApplyModalContext.Provider>
    );
}
