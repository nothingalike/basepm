"use client";

import { useActiveUserStory } from '@/hooks/activeUserStory';
import { useToastMessages } from '@/hooks/toastMessages';
import { AllUserStories } from '@/hooks/allUserStories';
import React, { useEffect, useState } from 'react';
import UserStory from '@/models/userStory'; // Importing UserStory from models folder

export default function UserStoryForm({ userStory }: { userStory?: UserStory }) {
    const { setUserStory } = useActiveUserStory();
    const { userStories, setUserStories } = AllUserStories();
    const { setShowSuccessToast, setSuccessMessage, setShowErrorToast, setErrorMessage } = useToastMessages();
    const [id, setId] = useState(userStory?.id || 0);
    const [title, setTitle] = useState(userStory?.title || '');
    const [asA, setAsA] = useState(userStory?.asA || '');
    const [iWant, setIWant] = useState(userStory?.iWant || '');
    const [soThat, setSoThat] = useState(userStory?.soThat || '');
    const [userInteractions, setUserInteractions] = useState(userStory?.userInteractions || '');
    const [apiInteractions, setApiInteractions] = useState(userStory?.apiInteractions || '');
    const [validations, setValidations] = useState(userStory?.validation || '');
    const [errorHandling, setErrorHandling] = useState(userStory?.errorHandling || '');
    const [edgeCases, setEdgeCases] = useState(userStory?.edgeCases || '');

    useEffect(() => {
        if (userStory) {
            setId(userStory.id || 0);
            setTitle(userStory.title || '');
            setAsA(userStory.asA || '');
            setIWant(userStory.iWant || '');
            setSoThat(userStory.soThat || '');
            setUserInteractions(userStory.userInteractions || '');
            setApiInteractions(userStory.apiInteractions || '');
            setValidations(userStory.validation || '');
            setErrorHandling(userStory.errorHandling || '');
            setEdgeCases(userStory.edgeCases || '');
        }
    }, [userStory]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newUserStory: UserStory = {
            id,
            title,
            asA,
            iWant,
            soThat,
            userInteractions,
            apiInteractions,
            validation: validations,
            errorHandling,
            edgeCases,
        };

        //if the user story has an id, then we are updating an existing user story
        if (id) {
            //update the user story
            updateUserStory(newUserStory);
        }
        else {
            //create the user story
            createUserStory(newUserStory);
        }
    };

    const updateUserStory = async (userStory: UserStory) => {
        const response = await fetch(`http://localhost:5121/api/UserStories/${userStory.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userStory),
        });

        if (response.ok) {
            //update the active user story
            setUserStory(userStory);
            setShowSuccessToast(true);
            setSuccessMessage('User Story Updated Successfully');
        }
    };

    const createUserStory = async (userStory: UserStory) => {
        const response = await fetch(`http://localhost:5121/api/UserStories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userStory),
        });

        if (response.ok) {
            //update the active user story
            userStory = await response.json();
            setUserStory(userStory);
            setId(userStory.id);
            //update the user stories
            setUserStories([...userStories, userStory]);
            setShowSuccessToast(true);
            setSuccessMessage('User Story Created Successfully');
        }
    };

    function closeModal(e: React.FormEvent): void {
        e.preventDefault();
        const modal = document.getElementById("user-story-modal") as HTMLDialogElement;
        modal.close();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex">
                    <div className="flex-1">
                        <h2 className='text-xl font-bold my-3'>Summary</h2>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-auto px-2">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 px-2">
                        <div className="mb-4">
                            <label htmlFor="asA" className="block text-gray-700 mb-2">
                                As A
                            </label>
                            <input
                                type="text"
                                id="asA"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={asA}
                                onChange={(e) => setAsA(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 px-2">
                        <div className="mb-4">
                            <label htmlFor="iWant" className="block text-gray-700 mb-2">
                                I Want
                            </label>
                            <input
                                type="text"
                                id="iWant"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={iWant}
                                onChange={(e) => setIWant(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 px-2">
                        <div className="mb-4">
                            <label htmlFor="soThat" className="block text-gray-700 mb-2">
                                So That
                            </label>
                            <input
                                type="text"
                                id="soThat"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={soThat}
                                onChange={(e) => setSoThat(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1">
                        <hr/>
                        <h2 className='text-xl font-bold my-3'>Acceptance Criteria</h2>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 px-2">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 mb-2">
                                User Interaction Requirements
                            </label>
                            <textarea 
                                id="user-interaction-requirements"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={userInteractions}
                                onChange={(e) => setUserInteractions(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 px-2">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 mb-2">
                                API Requirements
                            </label>
                            <textarea 
                                id="api-requirements"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={apiInteractions}
                                onChange={(e) => setApiInteractions(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 px-2">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 mb-2">
                                Validations
                            </label>
                            <textarea 
                                id="validation-requirements"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={validations}
                                onChange={(e) => setValidations(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 px-2">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 mb-2">
                                Error Handling
                            </label>
                            <textarea 
                                id="error-handling-requirements"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={errorHandling}
                                onChange={(e) => setErrorHandling(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 px-2">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 mb-2">
                                Edge Cases
                            </label>
                            <textarea 
                                id="edge-cases-requirements"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                value={edgeCases}
                                onChange={(e) => setEdgeCases(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="modal-action">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mx-2">
                        Submit
                    </button>
                    <button className="btn mx-2" onClick={closeModal}>Close</button>
                </div>
            </form>
        </div>
    );
};
