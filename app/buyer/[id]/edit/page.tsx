"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function BuyerEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();

  const [buyer, setBuyer] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    async function getBuyer() {
      try {
        setLoading(true);
        const response = await axios.get(`/api/buyers/${id}`);
        setBuyer(response.data.buyer);
        setFormData(response.data.buyer);
        setHistory(response.data.buyerhistory);
      } catch (err) {
        console.error("Error fetching buyer:", err);
        setError("Failed to fetch buyer.");
      } finally {
        setLoading(false);
      }
    }
    getBuyer();
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await axios.put(`/api/buyers/${id}`, {
        ...formData,
        updatedAt: buyer.updatedAt,
        userId: session?.user?.id,
      });
      router.push(`/buyer/${id}`);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("Record was changed by someone else. Please refresh.");
      } else {
        setError("Failed to update buyer.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading buyer details...</p>;
  }

  if (!buyer) {
    return <p className="p-6 text-red-600">Buyer not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Buyer CRM</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-100">Dashboard</a>
          <a href="/createbuyer" className="block px-3 py-2 rounded-md hover:bg-gray-100">Create Buyer</a>
        </nav>
      </aside>

   
      <main className="flex-1 p-8 text-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Edit Buyer – {buyer.fullName}
          </h1>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

       
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <form className="grid grid-cols-2 gap-6">
            {[
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "Property Type", name: "propertyType", type: "text" },
              { label: "BHK", name: "bhk", type: "text" },
              { label: "Budget Min", name: "budgetMin", type: "number" },
              { label: "Budget Max", name: "budgetMax", type: "number" },
              { label: "Timeline", name: "timeline", type: "text" },
              { label: "Status", name: "status", type: "text" },
              { label: "Source", name: "source", type: "text" },
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>
            ))}

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>
          </form>

          
          <div className="flex justify-end gap-4">
            <button
              onClick={() => router.push(`/buyer/${id}`)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
