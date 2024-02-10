import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App"

// Pegar nome da editora na url - Ex: www.projetoquadrinhos.com/marvel <--- esse cara aqui
let url = window.location.href;
let splitUrl = url.split("/");
let publisher = splitUrl.slice(3).join("/");

// Verificar se a publisher existe dentre as listadas no array
const possiblePublishers = ["marvel", "dc", "image", "", "404"];
let found = false;
for (let i = 0; i < possiblePublishers.length; i++) {
  if (possiblePublishers[i] === publisher) {
    found = true;
    break;
  }
}
if (found == false) {
  window.location.href = "http://localhost:5173/404";
}

// Rotas das páginas do site
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/" + publisher,
    element: <App publisher={publisher} />,
  },

  {
    path: "/404",
    element: <App publisher="404" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
