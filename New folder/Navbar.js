import React ,{useState} from 'react'
import { Link , useNavigate } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screen/Cart'
import { useCart } from './ContextReducer';
export default function Navbar() {
    const [cartView,setCartView]=useState(false);
    const navigate=useNavigate();
    let data=useCart();
    const handleClickev=async(e)=>{
        e.preventDefault();
        localStorage.removeItem("authToken");
        navigate('/Login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2" to="/">GetFoody</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse  d-flex " id="navbarSupportedContent" style={{justifyContent:'space-between'}}>
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex " style={{alignItems:'center'}}>
                            <li className="nav-item">
                                <Link className="nav-link active Home1 fs-3" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken"))?
                                <li className="nav-item">
                                    <Link className="nav-link active Home1 btn bg-dark text-light" aria-current="page" to="/Orders">ORDERS</Link>
                                </li>
                            :""
                            }
                        </ul>
                        {(!localStorage.getItem("authToken"))?
                            <div className='d-flex'>    
                                <Link className="btn text-white fs-5 mx-2 p-1" style={{background:'#3F51B5'}}   to="/Signup">Signup</Link>
                                <Link className=" btn text-white fs-5 mx-2 p-1" style={{background:'#3F51B5'}}  to="/Login">Login</Link>
                            </div>
                            :
                                <div className='d-flex ' style={{alignItems:'center'}}>
                                    <div className=" btn mx-2 fs-5 text-white" style={{textDecoration:'none',background:'#3F51B5',margin:'0px',padding:'0px'}} aria-current="page"  onClick={()=>{setCartView(true)}}>My Cart {" "}
                                    <Badge pill bg="danger">{data.length}</Badge>
                                    </div>
                                    {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                                    <p className=" btn mx-2 fs-5 text-danger "  style={{textDecoration:'none',background:'#3F51B5',margin:'0px',padding:'0px'}}  aria-current="page" onClick={handleClickev} >LOG OUT</p>

                                </div>
                        }
                        

                    </div>
                </div>
            </nav>
        </div>
    )
}
