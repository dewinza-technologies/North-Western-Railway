import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NWRLogin() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(e.target);
    const userId = form.get("userId");
    const password = form.get("password");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setType("error");
        setMessage(data.message);
        setLoading(false);
        return;
      }

      // save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setType("success");
      setMessage("Login successful. Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setType("error");
      setMessage("Server not responding");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/railway-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl w-full max-w-md p-8"
      >
        <div className="flex justify-center mb-3">
          <img src="/nwr-logo.png" className="h-16" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            North Western Railway
          </h1>
          <p className="text-gray-500 text-sm">
            Project Monitoring Dashboard
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded-lg ${
              type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm">User ID</label>
            <input
              name="userId"
              placeholder="username"
              className="w-full mt-1 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              name="password"
              placeholder="password"
              type="password"
              className="w-full mt-1 border rounded-lg p-3"
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}