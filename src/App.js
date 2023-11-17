import './App.css';
import Home from "./Screen/Home"
import Login from "./Screen/Login"
import Signup from "./Screen/Signup"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";

function App() {
  return (
        <Router>
            <div>
                <Routes>
                <Route exact path="/" element={<Home/>}  />
                <Route exact path="/Login" element={<Login/>}  />
                <Route exact path="/Signup" element={<Signup/>}  />
                </Routes>
            </div>
        </Router>
  );
}

export default App;
