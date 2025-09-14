"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
    const [loading, setLoading] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async() => {
        if(!email || !password){
            alert("Please provide information on data fields")
            return
        }

        const data = await signIn("credentials",{
            email,
            password,
            redirect : false,
            callbackUrl: "/dashboard"
        })
        if(data?.ok){
            alert("Login successfully")
            router.push(data.url || "/dashboard")
            setLoading(false);
        }
        else{
            alert("User does not exist")
        }
       
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Welcome Back
                </h1>
                <div className="mb-4">
                    <div className="mb-2">
                        <h2 className="text-md font-semibold text-gray-800">Email</h2>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            required
                            className="w-full border text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <h2 className="text-md font-semibold text-gray-800">Password</h2>
                        <input
                            type="password"
                            placeholder="123456798"
                            required
                            className="w-full border text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 hover:cursor-pointer"
                        onClick={handleSubmit}
                    >
                        {loading ? "Creating..." : "Log In"}
                    </button>
                </div>
                <p className="text-sm text-center text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </main>
    );
}
