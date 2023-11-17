import React, { useState, useEffect } from 'react'
import Navbar from "../Components/Navbar"
import Card from "../Components/Card"
import Footer from "../Components/Footer"
export default function Home() {
    const [search,setSearch]=useState('')
    const art1 = [
        {
            "_id": "651af362813ebbfd37a60960",
            "CategoryName": "Pizza",
            "name": "Mix Veg Pizza",
            "img": "https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0=",
            "options": [
                {
                    "half": "100",
                    "medium": "200",
                    "full": "300"
                }
            ],
            "description": "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
        },

    ]
    const [item, setItem] = useState([]);
    const [category, setCategory] = useState([]);
    const loadData = async () => {
        let dt = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            }
        });
        let pt = await dt.json();
        setItem(pt[0]);
        setCategory(pt[1]);
        console.log(item);
        console.log(category);
    }
    useEffect(() => {
        loadData();
    }, [])
    const handleOnChange=(ev)=>{
        setSearch(ev.target.value);
    }
    return (
        <div>
            <Navbar />
            <div>
                <div id="carouselExampleControls" className="carousel slide mb-3" data-bs-ride="carousel" style={{minHeight:'350px',maxHeight:'370px' ,objectFit:'cover !important'}}>
                    <div className="carousel-inner"  style={{maxHeight:'370px'}}>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/1080x300/?burger" className="d-block w-100" alt="..."  />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/1080x300/?dosa" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/1080x300/?pizza" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <div className="carousel-caption d-md-block ">
                        <div className="d-flex " role="search" style={{justifyContent:'center', height:'50px'}}>
                            <input className="form-control mx-2" type="search" placeholder='Search for food you like' value={search} aria-label="Search" style={{width:'400px'}} onChange={handleOnChange}/>
                            
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    category.length !== 0
                        ?
                        category.map((data, index) => {
                            return (
                                <div key={data._id} style={{ marginTop: "4rem" }}>
                                    <h1>{data.CategoryName}</h1>
                                    <hr/>
                                    <div className="row">{
                                        item.filter((i)=> (i.CategoryName === data.CategoryName) &&( i.name.toLowerCase().includes(search.toLowerCase())))
                                        .map((el, idx) => {
                                            return <div className='col-md-4 my-2' key={idx}>
                                                <Card fooditem={el}  opt={el.options[0]} />
                                            </div>
                                        })
                                    }
                                    </div>
                                </div>) 
                        })
                    : <div>"""</div>

                }
            </div>


            <Footer />
        </div>
    )
}
