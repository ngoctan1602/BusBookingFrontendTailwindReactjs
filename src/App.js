import "normalize.css"
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { publicRoutes, privateRoutes, adminRoutes, companyRoutes, guestRoute } from "./routers/router"
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout';
import InfoLayout from "./components/Layout/InfoLayout/Infolayout";
import AdminLayoutSidebar from "./components/Layout/AdminLayoutSidebar/AdminLayout";

import AdminLogin from "./pages/Admin/login";
import CompanyLayout from "./components/Layout/CompanyLayout/CompanyLayout";
import CompanyLogin from "./pages/Company/login";
import NotFound from "./pages/NotFound";
import CompanyRegister from "./pages/Company/register";
import NotifcationProvider from "./context/NotificationContext";
import { GoogleOAuthProvider } from "@react-oauth/google"
import Checkout from "./pages/Checkout/Checkout";
import "../src/styles/App.scss"
import UserLayout from "./components/Layout/UserLayout/UserLayout";
import { Provider } from "react-redux";
import { store, persistor } from '../src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const CheckoutWrapper = () => {
  const { state } = useLocation();
  const { Order, TotalPrice } = state || {};
  return <Checkout Order={Order} TotalPrice={TotalPrice} />;
};


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
          <Router>
            <NotifcationProvider>
              <div className="font-Amiro bg-bg h-screen overflow-auto text-16">
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
                    })
                  }
                  {
                    guestRoute.map((route, index) => {
                      return <Route
                        key={index}
                        path={route.path}
                        element={
                          <UserLayout>
                            <route.component />
                          </UserLayout>
                        }
                      />
                    })
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
                            route.path === "/company/register" ?
                              <CompanyRegister></CompanyRegister> :
                              <CompanyLayout>
                                <route.component />
                              </CompanyLayout>
                        }
                      />
                    })
                  }

                  {
                    <Route
                      path="/checkout"
                      element={
                        <DefaultLayout>
                          <CheckoutWrapper />
                        </DefaultLayout>
                      }
                    />
                  }

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </NotifcationProvider>
          </Router>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
