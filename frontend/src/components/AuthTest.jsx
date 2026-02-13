import { useState } from "react";
import { useAuth } from "../auth/useAuth";

const AuthTest = () => {
  // Get auth data and functions from context
  const { user, login, logout } = useAuth();

  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login button click
  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
      alert("Login successful ✅");
    } catch (error) {
      alert("Login failed ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Auth Test Component</h2>

      {/* If user exists, show logged-in state */}
      {user ? (
        <>
          <p>
            Logged in as <strong>{user.name}</strong> (
            <strong>{user.role}</strong>)
          </p>

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>Not logged in</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </>
      )}
    </div>
  );
};

export default AuthTest;
