import React,{useEffect, useRef, useState} from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
const Card=(props)=>{
    let data=useCart();
    let dispatch1=useDispatchCart();
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState("")
    let option=props.opt;
    let optionObj=Object.keys(option);
    const priceRef=useRef();
    let finalPrize=qty*parseInt(option[size]);
    const handlecart=async()=>{
        let v=-1;
        for(let i=0;i<data.length;i++){
            if(data[i].id===props.fooditem._id){
                v=i;
            }
        }
        (v===-1)?await dispatch1({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,img:props.fooditem.img,price:finalPrize,size:size,qty:qty}):await dispatch1({type:"UPDATE",id:props.fooditem._id,name:props.fooditem.name,img:props.fooditem.img,price:finalPrize,size:size,qty:qty,index:v});
        console.log(data);
    }
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
  return (
    <div>
        <div className="card" style={{width: '20rem',marginTop:'1rem'}}>
            <div style={{height:'200px'}}>
                <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height:'200px',objectFit:"fill"}}  />
            </div>
            <div className="card-body">
                <h5 className="card-title" style={{textAlign:'center'}}>{props.fooditem.name}</h5>
                <p className="card-text"  style={{textAlign:'center'}}>{props.fooditem.category}</p>
                <div className="container  w-80 d-flex" style={{alignItems:'center',justifyContent:'space-between'}}>
                    <div >
                        <p className='fs-5'>Quantity:</p> 
                        <select className='w-30 h-10 rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(10),(e,i)=>{
                                return( 
                                <option value={i+1} key={i+1}>{i+1}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div >
                        <p className='fs-5'>Category:</p>
                        <select  className='w-40 h-10 rounded mx-4' ref={priceRef}  onChange={(e)=>setSize(e.target.value)}>{
                            optionObj.map((el,idx)=>{
                                return(<option key={idx} value={el}>{el} : {props.opt[el]}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className='d-flex' style={{alignItems:'center',justifyContent:'space-around'}}>
                    <div style={{textAlign:'center'}} className='my-3 fs-4'>Total Price:{finalPrize}</div>
                    <button style={{background:'#e577d8',padding:'.34rem',fontWeight:'bold'}} onClick={handlecart}>Add to Cart</button>
                </div>

            </div>
        </div>
    </div>
  )
}
export default  Card