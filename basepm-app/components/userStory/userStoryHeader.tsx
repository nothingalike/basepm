"use client";

import React from 'react';
import UserStoryForm from './userStoryForm';

export default function UserStoryHeader() {

    function openModal(): void {
        const modal = document.getElementById("user-story-modal") as HTMLDialogElement;
        modal.showModal();
    }

    return (
        <header className="bg-white shadow">
            <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 align-middle">
            <h1 className="flex-auto text-3xl font-bold tracking-tight text-gray-900">
                <span className="align-middle">
                    User Stories
                </span>
            </h1>
                <div className="flex-none">
                    <button className="btn btn-primary" onClick={openModal}>New</button>
                </div>
            </div>

            <dialog id="user-story-modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <UserStoryForm userStory={undefined} />
                </div>
            </dialog>
        </header>
    );
}
