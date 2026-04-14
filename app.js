const SUPABASE_URL = "https://ksukzgjhjhqbyiliiofi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzdWt6Z2poamhxYnlpbGlpb2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMDU0NDUsImV4cCI6MjA5MDc4MTQ0NX0.DyFaSQohRTf5pjK-sXiSvNBplfCvJu6MuxRF1un_rEg";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// ================= AUTH =================

async function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabaseClient.auth.signUp({ email, password });

    if (error) alert(error.message);
    else alert("Signup successful. Now login.");
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) alert(error.message);
    else location.href = "app.html";
}

async function logout() {
    await supabaseClient.auth.signOut();
    location.href = "index.html";
}


// ================= USER =================

async function loadUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (!user) {
        location.href = "index.html";
        return;
    }

    document.getElementById("welcome").innerText =
        "Welcome " + (user.user_metadata?.full_name || user.email);
}


// ================= PROFILE =================

async function saveProfile() {
    const name = document.getElementById("fullname").value;

    const { error } = await supabaseClient.auth.updateUser({
        data: { full_name: name }
    });

    if (error) alert(error.message);
    else alert("Profile updated!");
}


// ================= PRODUCTS =================

async function addProduct() {
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;

    const { data: { user } } = await supabaseClient.auth.getUser();

    const { error } = await supabaseClient.from("products").insert([
        { name, category, quantity, price, user_id: user.id }
    ]);

    if (error) alert(error.message);
    else {
        alert("Added!");
        loadProducts();
    }
}


async function loadProducts() {
    const { data } = await supabaseClient
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    const box = document.getElementById("products");
    if (!box) return;

    box.innerHTML = "";

    data.forEach(p => {
        box.innerHTML += `
        <div class="card">
            <b>${p.name}</b><br>
            ${p.category}<br>
            Qty: ${p.quantity}<br>
            π ${p.price || "0"}<br>
        </div>
        `;
    });
}


// ================= INIT =================

if (window.location.pathname.includes("app.html")) {
    loadUser();
    loadProducts();
}
