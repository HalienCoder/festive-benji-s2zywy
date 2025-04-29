import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  sessionStorage.setItem("rollNumber", "RA2211051010012") //-- for testing pls ignore guys
  useEffect(() => {
    const savedRoll = sessionStorage.getItem("rollNumber");
    if (savedRoll) {
      navigate("/form");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!rollNumber || !name) {
      setError("Please enter both roll number and name");
      return;
    }

    try {
      const response = await fetch(
        "https://dynamic-form-generator-9rl7.onrender.com/create-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rollNumber, name }),
        }
      );

      if (response.ok) {
        sessionStorage.setItem("rollNumber", rollNumber);
        navigate("/form");
      } else {
        setError("Failed to login. Try again.");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Enter Roll Number"
          className="w-full p-2 mb-3 border rounded-xl"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full p-2 mb-3 border rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 text-black py-2 rounded-xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
