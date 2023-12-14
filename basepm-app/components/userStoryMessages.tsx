"use client";

import { useState, useEffect } from 'react';
import { useToastMessages } from '@/hooks/toastMessages';

export default function Toasts() {
    const {
        showSuccessToast,
        setShowSuccessToast,
        successMessage,
        setSuccessMessage,
        showErrorToast,
        setShowErrorToast,
        errorMessage,
        setErrorMessage,
    } = useToastMessages();

    useEffect(() => {
        let successTimeout: NodeJS.Timeout;

        if (showSuccessToast) {
            successTimeout = setTimeout(() => {
                setShowSuccessToast(false);
                setSuccessMessage("");
            }, 3000);
        }

        return () => {
            clearTimeout(successTimeout);
        };
    }, [showSuccessToast]);

    useEffect(() => {
        let errorTimeout: NodeJS.Timeout;

        if (showErrorToast) {
            errorTimeout = setTimeout(() => {
                setShowErrorToast(false);
                setErrorMessage("");
            }, 3000);
        }

        return () => {
            clearTimeout(errorTimeout);
        };
    }, [showErrorToast]);

    return (
        <div className="toast toast-top toast-end">
            {showSuccessToast && (
                <div className="alert alert-success">
                    {successMessage}
                </div>
            )}

            {showErrorToast && (
                <div className="alert alert-error">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};
