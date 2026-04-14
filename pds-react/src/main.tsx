import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

try {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  document.body.innerHTML = "<h1 style='color:red'>App crashed</h1>";
  console.error(err);
}
