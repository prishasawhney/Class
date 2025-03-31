import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SongsProvider } from "./contexts/SongsContext"; // Import the provider
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <SongsProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </SongsProvider>,
    document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();