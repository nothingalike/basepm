import { useState } from 'react';

export function useToastMessages() {
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // TODO: Implement functions to show and hide toasts

    return {
        showSuccessToast,
        setShowSuccessToast,
        successMessage,
        setSuccessMessage,
        showErrorToast,
        setShowErrorToast,
        errorMessage,
        setErrorMessage,
    };
}
