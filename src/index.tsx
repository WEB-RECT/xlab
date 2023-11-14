import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./pages/App";
import { store } from "./store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <Provider store={store}>
        <BrowserRouter basename={window.location.pathname || ''}>
            <App />
        </BrowserRouter>
    </Provider>,
);
