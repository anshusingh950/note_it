import React, { useState, useEffect } from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Card from "../Components/Card"
import axios from 'axios'
export default function Home() { 
    const [notedata, setnotedata] = useState([]) 
    const [credentials , setcredentials] = useState("") 
    var userEmail=localStorage.getItem("userEmail");
    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteNote/${id}`);
            setnotedata(notedata.filter(note => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
        };
    const handleAdd = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/addnotes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail, description: credentials, date: Date.now() })
        })
        const js=await response.json();
        console.log(js)
        if(!js.success){
            alert("Please Login to Add/Get Note")
        }
        else {
            loadData(userEmail);
            setcredentials("");
        }
    }
    const loadData = async (userEmail) => {
        let dt = await fetch(`http://localhost:5000/api/getdata/${userEmail}`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            }
        });
        let pt = await dt.json();
        setnotedata(pt[0]);
    }
    useEffect(() => {
        loadData(userEmail);
        // eslint-disable-next-line
    }, [])
    // const handleOnChange = (ev) => {
    //     setSearch(ev.target.value);
    // }
    const handleNote = (e) => {
        setcredentials(e.target.value)
    }
    const handleLower=()=>{
        setcredentials(credentials.toLowerCase())
    }
    const handleUpper=()=>{
        setcredentials(credentials.toUpperCase())
    }
    const handleSentence=()=>{
        let q=credentials
        setcredentials(q.split(".").map(el=>
           el.length>0?el=el[0].toUpperCase()+el.slice(1).toLowerCase():el="").join("."))
        
        
    }
    const handleWord=()=>{
        let p=credentials;
        setcredentials(p.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));
    }
    const handleClear=()=>{
        setcredentials("");
    }
    const handleCopy=()=>{
        navigator.clipboard.writeText(credentials);
        document.getSelection().removeAllRanges();
    }

    return (
        <div>
            <Navbar />

            <div className='d-flex m-1 p-3' style={{ flexDirection: 'column' }}>
                <h2 style={{ textAlign: 'center' }}>Add Your Note Here</h2>
                <textarea name="text" id="text" cols="20" rows="8" style={{ border: '4px solid green', margin: '0 6%', borderRadius: '50px', padding: '5%' }} value={credentials} onChange={handleNote}></textarea>
            </div>   
            <div className='d-flex' style={{justifyContent:"space-around",marginBottom:'.5rem'}}>      
                <button onClick={handleLower} style={{borderRadius:"24px",  background: 'linear-gradient(45deg,#ff1142, #26ffd8)'}}>To LowerCase</button>
                <button  style={{borderRadius:"24px",  background: 'linear-gradient(45deg,#ff1142, #26ffd8)'}} onClick={handleUpper}>To UpperCase</button>
                <button  style={{borderRadius:"24px",  background: 'linear-gradient(45deg,#ff1142, #26ffd8)'}} onClick={handleSentence}>To TitleCase</button>
            </div>   
            <div className='d-flex' style={{justifyContent:"space-evenly",marginBottom:'.5rem'}}>
                <button  style={{borderRadius:"24px",  background: 'linear-gradient(45deg,#ff1142, #26ffd8)'}} onClick={handleWord}>To WordCase</button>
                <button  style={{borderRadius:"24px",  background: 'linear-gradient(45deg,#ff1142, #26ffd8)'}} onClick={handleCopy}>Copy to Clipboard</button>
                <button  style={{borderRadius:"24px",  background: 'linear-gradient(45deg,#ff1142, #26ffd8)'}} onClick={handleClear}>Clear Above</button>
            </div>
            <button onClick={handleAdd} style={{ marginLeft: '90%', background: 'red', border: '1px solid blue', borderRadius: '5px', fontWeight: 'bold',marginBottom:'1rem' }}>ADD</button>
            <p>Your Text contains {credentials.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and  {credentials.length} characters</p>
            <div className='container ' >{
                notedata.length === 0 ? <h2 style={{ textAlign: 'center' }}>Nothing to Show Here</h2>
                    :
                    <div >
                        <h2>Your Notes So Far</h2>
                            <div className='row'>
                        {
                            notedata.map((el,idx) => {
                                return (
                                    <div className='col-md-4 my-2' key={el._id} >
                                        <Card desc={el.description} dt={el.date} id={el._id}  idx={idx} onDel={deleteNote}/>
                                    </div>
                                )
                            })}</div></div>
            }
            </div>
            <Footer />
        </div>
    )
}
