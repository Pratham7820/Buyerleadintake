"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async () => {
       if(!email || !name || !password || !confirmPassword){
            alert("Please provide all the input field")
            return
        }
        if(password !== confirmPassword){
            alert("Password doesnot match with confirm password")
            return
        }

        const response = await axios.post("/api/user",{
            name,
            email,
            password
        })

        if(!response.data){
            alert("Server error")
            return
        }

        alert("User created successfully")

        setLoading(false);
        router.push("/signin")
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Create Account
                </h1>
                <div>
                    <div className="mb-2">
                        <h2 className="text-md font-semibold text-gray-800">Username</h2>
                        <input
                            type="text"
                            placeholder="Jschmit"
                            required
                            className="w-full border text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <h2 className="text-md font-semibold text-gray-800">Email</h2>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            required
                            className="w-full border text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <h2 className="text-md font-semibold text-gray-800">Password</h2>
                        <input
                            type="password"
                            placeholder="123456789"
                            required
                            className="w-full border text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <h2 className="text-md font-semibold text-gray-800">Confirm Password</h2>
                        <input
                            type="text"
                            placeholder="123456789"
                            required
                            className="w-full border  text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 hover:cursor-pointer"
                        onClick={handleSubmit}
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                </div>
                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}
