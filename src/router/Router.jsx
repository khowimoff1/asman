import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import App from "../App";
import Products from "../pages/Products";
import Photogallery from "../pages/Photogallery";
import News from "../pages/News";
import Contacts from "../pages/Contacts";
import NewsDetails from "../components/NewsDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/photogallery",
        element: <Photogallery />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news/:id",
        element: <NewsDetails />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
    ],
  },
]);
