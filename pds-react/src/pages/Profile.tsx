import { useState, useEffect } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // Load saved profile
  useEffect(() => {
    const savedName = localStorage.getItem("user_name");
    const savedImage = localStorage.getItem("user_image");

    if (savedName) setName(savedName);
    if (savedImage) setImage(savedImage);
  }, []);

  // Handle image upload
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
      localStorage.setItem("user_image", reader.result as string);
    };

    if (file) reader.readAsDataURL(file);
  };

  // Save name
  const saveProfile = () => {
    localStorage.setItem("user_name", name);
    alert("Profile Saved ✅");
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>👤 Profile</h2>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />

        <input type="file" onChange={handleImage} />

        {image && (
          <div style={{ marginTop: "15px" }}>
            <img
              src={image}
              alt="profile"
              style={{ width: "120px", borderRadius: "50%" }}
            />
          </div>
        )}

        <button
          onClick={saveProfile}
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "green",
            color: "white",
            border: "none",
            width: "100%",
          }}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
