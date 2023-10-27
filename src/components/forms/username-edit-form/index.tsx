"use client";

import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"

export default function UsernameEditForm({ user }: any) {
    const [isLoading, SetLoading] = useState(false);
    const [isEdit, SetEdit] = useState(false);
    const [username, setUsername] = useState(user.username);

    const onSubmit = () => {
        SetLoading(true);
        if (!username) {
            toast.error('Username must be required!')
            SetLoading(false);
            return;
        }

        axios
            .patch("/api/users/update/username", {
                username,
            })
            .then((res) => {
                if (res?.data?.success) {
                    console.log(res.data)
                    localStorage.setItem("user", JSON.stringify(res?.data?.user));
                    SetLoading(false);
                    SetEdit(false);
                    toast.success('Successfully!')
                }
                else {
                    toast.error('Process Error')
                    SetLoading(false);
                    SetEdit(false)
                }
            })
            .catch((err) => {
                toast.error('Process Error')
                SetLoading(false);
                SetEdit(false);
            });
    };

    return (
        <div className="h-[60px] flex justify-between items-center px-2 sm:px-6 border-b border-black">
            <div className="flex items-center space-x-3">
                <div className="font-bold uppercase opacity-50">Username:</div>
                {isEdit ? (
                    <>

                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder=' '
                            className={`block py-2.5 px-1 w-full text-sm text-gray-900 bg-transparent border rounded appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                        {/* {error && (
                            <p className="text-xs h-2 flex justify-center items-center text-center text-red-700 mt-4">
                                {error}
                            </p>
                        )} */}
                    </>
                ) : (
                    <div className="text-sm">{username}</div>
                )}
            </div>
            <div>
                {isEdit ? (
                    <button
                        className="btn btn-ghost btn-sm flex flex-row items-center justify-center text-center"
                        onClick={onSubmit}
                        disabled={isLoading}
                    >
                        {isLoading && <span className="loading loading-spinner"></span>}
                        <span className={`${isLoading && "hidden"} sm:inline-block`}>
                            Save
                        </span>
                    </button>
                ) : (
                    <button
                        className="btn btn-ghost btn-sm w-[65px] text-center"
                        onClick={() => SetEdit((s) => !s)}
                    >
                        Edit
                    </button>
                )}
            </div>
            <Toaster position="top-right"
                reverseOrder={false} />
        </div>
    );
}
