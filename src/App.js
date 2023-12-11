import "normalize.css"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes, adminRoutes, companyRoutes, optAuth } from "./routers/router"
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout';
import InfoLayout from "./components/Layout/InfoLayout/Infolayout";
import AdminLayoutSidebar from "./components/Layout/AdminLayoutSidebar/AdminLayout";

import AdminLogin from "./pages/Admin/login";
import CompanyLayout from "./components/Layout/CompanyLayout/CompanyLayout";
import CompanyLogin from "./pages/Company/login";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Router>
      <div className="font-robo bg-bg h-screen overflow-x-hidden">
        <Routes>
          {
            publicRoutes.map((route, index) => {
              return <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <route.component />
                  </DefaultLayout>
                }
              />
            }
            )
          }

          {
            privateRoutes.map((route, index) => {
              return <Route
                key={index}
                path={route.path}
                element={
                  <InfoLayout>
                    <route.component />
                  </InfoLayout>
                }
              />
            })
          }

          {
            adminRoutes.map((route, index) => {
              return <Route
                key={index}
                path={route.path}
                element={
                  route.path === "/admin/login" ?
                    <AdminLogin></AdminLogin>
                    :
                    <AdminLayoutSidebar>
                      <route.component />
                    </AdminLayoutSidebar>
                }
              />
            })
          }

          {
            companyRoutes.map((route, index) => {
              return <Route
                key={index}
                path={route.path}
                element={
                  route.path === "/company/login" ?
                    <CompanyLogin></CompanyLogin> :
                    <CompanyLayout>
                      <route.component />
                    </CompanyLayout>
                }
              />
            })
          }
          <Route path={optAuth.path} element={<optAuth.component />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
