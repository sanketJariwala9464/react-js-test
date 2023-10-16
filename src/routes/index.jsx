import { Route, Routes } from "react-router-dom";
import router from "./router";

const Router = () => {
    const pageRoutes = router.map(({ path, title, element }) => {
      return <Route key={title} path={`${path}`} element={element} />;
    });
  
    return <Routes>{pageRoutes}</Routes>;
};
  
export default Router;