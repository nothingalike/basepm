"use client";

import React, { useEffect, useState } from 'react';
import { AllUserStories } from '@/hooks/allUserStories';

export default function UserStoryList() {
    // Define your state variables here
    const { userStories, setUserStories } = AllUserStories();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        // Make API call to fetch user stories
        getUserStories();
    }, []);

    useEffect(() => {
        // Make API call to fetch user stories
        getUserStories();
    }, [userStories]);

    useEffect(() => {
        // Make API call to fetch user stories
        if(!refresh) return;
        getUserStories();
        setRefresh(false);
    }, [refresh]);

    function getUserStories(): void {
        // Make API call to fetch user stories
        fetch('http://localhost:5121/api/UserStories')
            .then(response => response.json())
            .then(data => setUserStories(data))
            .catch(error => console.error(error));
    }

    function deleteUserStory(id: number): void {
        // Make API call to delete user story
        console.log("deleteUserStory");
        fetch(`http://localhost:5121/api/UserStories/${id}`, {
            method: 'DELETE'
        })
            .then(data => setRefresh(true))
            .catch(error => console.error(error));
    }

    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userStories.map((userStory: any) => (
                        <tr key={userStory.id}>
                            <td className="py-2 px-4 border-b">{userStory.title}</td>
                            <td>
                                <div>
                                    <button className="btn btn-xs mx-2" >details</button>
                                    <button className="btn btn-xs mx-2" onClick={() => deleteUserStory(userStory.id)}>delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

