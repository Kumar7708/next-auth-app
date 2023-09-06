"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            console.log("Logout successful");
            router.push("/login")

        } catch (error: any) {
            console.log("Logout failed", error);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.user._id);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-2 rounded bg-green-500">{data==='nothing'? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >Logout</button>
            <button
                className="bg-green-900 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
            >Get User Data</button>
        </div>
    )
}