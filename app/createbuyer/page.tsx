"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateBuyer() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [property, setProperty] = useState("")
    const [bhk, setBhk] = useState("")
    const [purpose, setPurpose] = useState("")
    const [budgetMin, setBudgetMin] = useState(0)
    const [budgetMax, setBudgetMax] = useState(0)
    const [source, setSource] = useState("")
    const [status, setStatus] = useState("")
    const [timeline, setTimeline] = useState("")
    const [notes, setNotes] = useState("")
    const router = useRouter()
    const { data: session } = useSession()

    const createBuyer = async() => {
        try {
            const response = await axios.post("/api/buyers",{
                fullName,email,phone,city,bhk,propertyType : property
                ,purpose,budgetMin,budgetMax,source,status,timeline,notes,
                ownerId : session?.user.id
            })
            if(!response){
                alert("server error")
                return
            }
            alert("The buyer created successfully")
            router.push("/dashboard")
        } catch (error) {
            alert(error)
            console.log("error",error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <header className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">Create Buyer</h1>
                    <Link
                        href="/dashboard"
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </header>


            <main className="flex-1">
                <div className="max-w-3xl mx-auto px-6 py-10">
                    <div className="bg-white shadow rounded-lg p-8 space-y-3 text-black">


                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option>Select city</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value= "Mohali">Mohali</option>   
                                <option value="Zirakpur">Zirakpur</option>
                                <option value= "Panchkula">Panchkula</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Property Type
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setProperty(e.target.value)}
                            >
                                <option>Select type</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Plot">Plot</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Bhk
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setBhk(e.target.value)}
                            >
                                <option>Select type</option>
                                <option value="One">1</option>
                                <option value="Two">2</option>
                                <option value="Three">3</option>
                                <option value="Four">4</option>
                                <option value="Studio">Studio</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Purpose
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setPurpose(e.target.value)}
                            >
                                <option>Select type</option>
                                <option value="Buy">Buy</option>
                                <option value="Rent">Rent</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Budget Minimum
                            </label>
                            <input
                                type="number"
                                placeholder="Enter minimum budget"
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setBudgetMin(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Budget Maximum
                            </label>
                            <input
                                type="number"
                                placeholder="Enter maximum budget"
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setBudgetMax(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Source
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setSource(e.target.value)}
                            >
                                <option>Select type</option>
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Walkin">Walkin</option>
                                <option value="Call">Call</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Select status</option>
                                <option value="New">New</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Visited">Visited</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="Converted">Converted</option>
                                <option value="Dropped">Dropped</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Timeline
                            </label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setTimeline(e.target.value)}
                            >
                                <option>Select timeline</option>
                                <option value="ZerotoThree">0-3 months</option>
                                <option value="ThreetoSix">3-6 months</option>
                                <option value="GreaterthanSix">{`>6 months`}</option>
                                <option value="Exploring">Exploring</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Notes
                            </label>
                            <textarea className="w-full h-25 p-1 border"
                                placeholder="Write your notes here"
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700"
                                onClick={createBuyer}
                            >
                                Create Buyer
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
