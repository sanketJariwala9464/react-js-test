import About from "../pages/About";
import Home from "../pages/Home";

const pagesData = [
  {
    path: "/",
    element: <Home />,
    title: "home"
  },
  {
    path: "/about",
    element: <About />,
    title: "about"
  }
];

export default pagesData;