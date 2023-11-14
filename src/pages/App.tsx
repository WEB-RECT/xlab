import { Route, Routes } from "react-router-dom";
import Address from "./Address/Address";
import Main from "./Main/Main";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Main />}
                />
                <Route
                    path="/address"
                    element={<Address />}
                />
            </Routes>
        </>
    );
}

export default App;
