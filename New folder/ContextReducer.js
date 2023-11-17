import React,{createContext,useContext,useReducer} from 'react'
const CartStateContext=createContext();
const CartDispatchContext=createContext();
const reducer=(st,act)=>{
    
    switch (act.type) {        
        case "ADD":
            return [...st,{id:act.id,name:act.name,img:act.img,price:act.price,size:act.size,qty:act.qty}]
        case "REMOVE":        
            let nar=[...st];    
            nar.splice(act.index,1);
            return  nar ;
        case "UPDATE":
            let nar1=[...st];
            nar1.splice(act.index,1);
            return [...nar1,{id:act.id,name:act.name,img:act.img,price:act.price,size:act.size,qty:act.qty}]
        case "CHECKOUT":
            localStorage.setItem("cart",JSON.stringify(st));
            return [];

        default:
            console.log('Error in Reducer')
            break;
    }
}
export const CartProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
} 
export const useCart=()=>useContext(CartStateContext);
export const useDispatchCart=()=>useContext(CartDispatchContext);