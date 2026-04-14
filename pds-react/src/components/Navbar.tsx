import { supabase } from "../lib/supabase";

export default function Navbar({ user, setPage }: any) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: 15,
      background: "#000"
    }}>
      <h3 onClick={() => setPage("home")}>AgriHub 🌾</h3>

      <div>
        <span onClick={() => setPage("profile")}>
          Hello {user.user_metadata?.full_name || user.email}
        </span>

        <button onClick={() => supabase.auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}
