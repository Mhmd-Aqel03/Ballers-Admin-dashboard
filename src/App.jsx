import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import DashboardPage from "./pages/dashboardPage";
import LoginPage from "./pages/loginPage";

function App() {
   const router = createBrowserRouter(
     createRoutesFromElements(
       <>
         <Route path="/" element={<LoginPage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
       </>
     )
   );

   return <RouterProvider router={router} />;
}

export default App;
