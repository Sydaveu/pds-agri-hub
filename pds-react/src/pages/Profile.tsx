import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Profile({ user }: any) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<any>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setName(data.full_name);
      setUrl(data.avatar_url);
    }
  }

  async function save() {
    let avatar_url = url;

    if (avatar) {
      const fileName = `${user.id}.png`;

      await supabase.storage
        .from("avatars")
        .upload(fileName, avatar, { upsert: true });

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      avatar_url = data.publicUrl;
    }

    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: name,
      avatar_url
    });

    alert("Saved");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>

      <img
        src={url || "https://via.placeholder.com/150"}
        width={100}
      />

      <br /><br />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e: any) => setAvatar(e.target.files[0])}
      />

      <br /><br />

      <button onClick={save}>Save</button>
    </div>
  );
}
