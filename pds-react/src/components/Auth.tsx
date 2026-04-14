import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    await supabase.auth.signUp({ email, password });
    alert("Check your email 📩");
  }

  async function signIn() {
    await supabase.auth.signInWithPassword({ email, password });
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={signIn}>Login</button>
      <button onClick={signUp}>Sign Up</button>

      <br /><br />

      <button onClick={signInWithGoogle}>
        Login with Google
      </button>
    </div>
  );
}
