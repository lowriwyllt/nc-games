import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ActiveNavbarProvider } from "./contexts/ActiveNavbar";
import { CurrentUserProvider } from "./contexts/CurrentUser";
import { AllUsersProvider } from "./contexts/AllUsers";
import { CurrentPathProvider } from "./contexts/CurrentPath";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CurrentUserProvider>
      <ActiveNavbarProvider>
        <CurrentPathProvider>
          <AllUsersProvider>
            <App />
          </AllUsersProvider>
        </CurrentPathProvider>
      </ActiveNavbarProvider>
    </CurrentUserProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
