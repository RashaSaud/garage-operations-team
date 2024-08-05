import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { appRoutesObj } from "./app.paths";
import { UserProvider } from "./context/auth-context";
import PrivateRoute from "./context/private-route";

const ExamplePage = React.lazy(() => import("./pages/user/example-page"));
const NotFoundPage = React.lazy(() => import("./pages/404"));
const Login = React.lazy(() => import("./pages/user/login"));
const Home =React.lazy(() => import("./pages/home"));
const OperationForm = React.lazy(()=>import('./pages/user/operation-form'))
const Facilites = React.lazy(()=>import('./pages/user/facilites'))
const UpdatePassword = React.lazy(()=>import('./components/change-password'))
const withSuspense = (WrappedComponent: JSX.Element) => {
  return (
    <Suspense
      fallback={<div className="text-primary-200 pt-10">Loading...</div>}
    >
      {WrappedComponent}
    </Suspense>
  );
};

export function AppRouting() {
  return (
    <Suspense
      fallback={<div className="text-primary-200 pt-10">Loading...</div>}
    >
       <UserProvider>
      <BrowserRouter>
        <Routes>     
              

        <Route
            key="homepage"
            path={appRoutesObj.getBasePath()}
            element={withSuspense(<PrivateRoute> <Home /> </PrivateRoute> )}
          />     
          

        <Route
            key="facilities"
            path={'/facilities'}
            element={withSuspense(<Facilites/> )}
          />  
    <Route
            key="login"
            path={'/login'}
            element={withSuspense(<Login/> )}
          />     

<Route
 key="operation-form"
 path={'operation-form'}
 element={withSuspense(<OperationForm />)}
/>
          <Route
            key="change-password"
            path={'update-password'}
            element={withSuspense(<UpdatePassword />)}
          />

          <Route
            key="notDefined"
            path="*"
            element={withSuspense(<NotFoundPage />)}
          />
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </Suspense>
  );
}
