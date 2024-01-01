import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/card'; // Assuming Card is the correct component name

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            response = await response.json();
            setFoodItem(response[0]);
            setFoodCat(response[1]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const groupByCategory = () => {
        const groupedItems = {};

        foodItem.forEach((item) => {
            if (!groupedItems[item.CategoryName]) {
                groupedItems[item.CategoryName] = [];
            }

            groupedItems[item.CategoryName].push(item);
        });

        return groupedItems;
    };

    const renderGroupedItems = () => {
        const groupedItems = groupByCategory();
    
        return Object.keys(groupedItems).map((category) => (
            <div key={category}>
                <div className="fs-3 m-3">{category}</div>
                <hr />
                <div className='row mb-3'>
                    {groupedItems[category]
                        .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                        .map((item) => (
                            <div key={item._id} className="col-12 col-md-6 col-lg-3">
                                <Card
                                    foodItem={item}
                                    options={item.options[0]}
                                    imgSrc={item.img}
                                />
                            </div>
                        ))}
                </div>
            </div>
        ));
    };
    

    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carosuel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div
                            className="d-flex jusify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x540?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Burger" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x540?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="pastry" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x540?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="barbeque" />
                    </div>


                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
                {loading ? (
                    <div>Loading...</div>
                ) : foodItem.length !== 0 ? (
                    renderGroupedItems()
                ) : (
                    <div>No Food Items Found</div>
                )}
            </div>
        </div>
    );
}
