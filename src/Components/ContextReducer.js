import React,{createContext,useContext,useReducer} from 'react'
const NoteStateContext=createContext();
const NoteDispatchContext=createContext();
const reducer=(st,act)=>{
    
    switch (act.type) {        
        case "ADD":
            return [...st,{id:act.id,email:act.email,description:act.description}]
        case "REMOVE":        
            let nar=[...st];    
            nar.splice(act.idx,1);
            return  nar ;
        case "UPDATE":
            let nar1=[...st];
            nar1.splice(act.index,1);
            return [...nar1,{id:act.id,email:act.email,description:act.description}]
        case "CHECKOUT":
            localStorage.setItem("Note",JSON.stringify(st));
            return [];

        default:
            console.log('Error in Reducer')
            break;
    }
} 
export const NoteProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,[])
    return(
        <NoteDispatchContext.Provider value={dispatch}>
            <NoteStateContext.Provider value={state}>
                {children}
            </NoteStateContext.Provider>
        </NoteDispatchContext.Provider>
    )
}
export const useNote=()=>useContext(NoteStateContext);
export const useDispatchNote=()=>useContext(NoteDispatchContext);