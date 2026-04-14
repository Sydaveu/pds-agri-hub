import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [page, setPage] = useState("home");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: any) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    });
  }, []);

  if (!session) return <Auth />;

  return (
    <>
      <Navbar user={session.user} setPage={setPage} />

      {page === "home" && (
        <Home user={session.user} cart={cart} setCart={setCart} />
      )}

      {page === "profile" && <Profile user={session.user} />}
    </>
  );
}
