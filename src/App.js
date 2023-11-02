import "normalize.css"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes, adminRoutes } from "./routers/router"
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout';
import InfoLayout from "./components/Layout/InfoLayout/Infolayout";
import AdminLayout from "./components/Layout/AdminLayoutSidebar/AdminLayout";
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
                  <AdminLayout>
                    <route.component />
                  </AdminLayout>
                }
              />
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
