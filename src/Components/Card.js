import React from 'react'
import {useNote,useDispatchNote} from './ContextReducer'
export default function Card(props) {
    const dispatch=useDispatchNote();
    const del=async()=>{
        await props.onDel(props.id)
    }
    
    return (
        <div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h3 className="card-text">{props.desc}</h3>
                    <p>Date:{props.dt}</p>

                </div>
                <button onClick={del}>DELETE</button>
            </div>
        </div>
    )
}
