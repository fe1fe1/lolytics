import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNav from "./components/MainNav";
import AccountSearch from "./pages/AccountSearch";
import ReactDOM from "react-dom";

function App() {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <MainNav />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<AccountSearch />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
