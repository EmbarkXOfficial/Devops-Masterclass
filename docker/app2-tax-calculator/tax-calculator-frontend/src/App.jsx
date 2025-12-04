import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [country, setCountry] = useState("IN");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Backend URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const calculatePrice = async () => {
    if (!amount) return alert("Enter amount");

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `${API_URL}/price?amount=${amount}&country=${country}`
      );
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("API call failed. Check backend or CORS.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Tax Calculator
        </h1>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter amount"
          />
        </div>

        {/* Country Select */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="IN">IN (India)</option>
            <option value="US">US (United States)</option>
            <option value="EU">EU (Europe)</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={calculatePrice}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Result</h2>
            <p><strong>Amount:</strong> {result.amount}</p>
            <p><strong>Tax:</strong> {result.tax}</p>
            <p><strong>Total:</strong> {result.total}</p>

            <hr className="my-3" />

            <p><strong>Service A Container:</strong> {result.container}</p>
            <p><strong>Service B Container:</strong> {result.service_b_container}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
