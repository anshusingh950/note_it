import React from 'react'
import { useCart, useDispatchCart } from '../Components/ContextReducer'
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (<div>
            <div className='fs-3 container' style={{ textAlign: 'center' ,color:'whitesmoke'}}>
                Feels Empty<br></br>
                Please Go to Home  to select some.
            </div>
        </div>

        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    const handleclick=async()=>{
        let userEmail=localStorage.getItem("userEmail");
        let url="http://localhost:5000/api/OrderData";  
        let response=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date:new Date().toDateString()
            })
        })
        console.log("order_RESPONSE",response.status);
        if(response.status===200)
        await dispatch({type:"CHECKOUT"})
    }

    return (
        <div>
            <div>
                <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                    <table className="table table-hover text-white">
                        <thead>
                            <tr style={{color:'azure'}}>
                                <th  style={{color:'azure'}} scope="col">#</th>
                                <th  style={{color:'azure'}} scope="col">Name</th>
                                <th  style={{color:'azure'}} scope="col">Quantity</th>
                                <th  style={{color:'azure'}} scope="col">Option</th>
                                <th  style={{color:'azure'}} scope="col">Amount</th>
                                <th  style={{color:'azure'}} scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((el, idx) => {
                                return ( 
                                    <tr key={idx} >
                                        <th  style={{color:'azure'}} scope="row">{idx + 1}</th>
                                        <td  style={{color:'azure'}}>{el.name}</td>
                                        <td  style={{color:'azure'}}>{el.qty}</td>
                                        <td  style={{color:'azure'}}>{el.size}</td>
                                        <td  style={{color:'azure'}}>{el.price}</td>
                                        <td  style={{color:'azure'}}><button type="button" className='byn p-0' onClick={()=>{dispatch({type:"REMOVE",index:idx})}}>Delete</button></td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>
                    
                </div>
                
            </div>
            <div>
                <h3 style={{color:'whitesmoke', marginLeft:'10%'}}>Total Price :Rs. {totalPrice}.00</h3>
            </div>
            <div>
                <button style={{color:'green',background:'whitesmoke',marginLeft:'10%',padding:'5px',fontWeight:'bold'}} onClick={handleclick}>CHECK OUT</button>
            </div>
        </div>
    )
}