import './App.css';
import Home from "./screen/Home"
import Login from "./screen/Login"
import Signup from "./screen/Signup"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from './Components/ContextReducer';

function App() {
  return (
    <CartProvider>
        <Router>
            <div> 
                <Routes>
                <Route exact path="/" element={<Home/>}  />
                <Route exact path="/Login" element={<Login/>}  />
                <Route exact path="/Signup" element={<Signup/>}  />
                {/* <Route exact path="/Cart" element={<Cart/>}  /> */}
                </Routes>
            </div>
        </Router>
    </CartProvider>
  );
}

export default App;
