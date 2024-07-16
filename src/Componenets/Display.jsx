import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Display.css'

function Display() {

    const [dish,setDish]=useState([])

    useEffect(()=>{
        const fetchDishes= async ()=>{
            const response =await axios.get('https://localhost:7291/api/Dish');
            setDish(response.data);
            
            
        }
        fetchDishes();  

    },[]);


    const togglePublishStatus= async (id)=>{
        await axios.patch(`https://localhost:7291/api/Dish/${id}/toggle-publish`);
            
        const response = await axios.get('https://localhost:7291/api/Dish');
        setDish(response.data);
        
        
    }

  return (
    <div className='mainContainer'>
        <h1>List of Dishes</h1>
        <div className="dishContainer">
        {dish.map((dishes)=>(
            <div key={dish.dishId} className="dishcard">
               
                <div className="dishTitle">{dishes.dishName}</div>
                <img src={dishes.imageUrl} alt="" className="dishImg" />
                <p>Status:{dishes.isPublished? ' Published' : ' Not Published'}</p>

                <div className="btns">
                    <button className="toggleBtn" onClick={()=>{togglePublishStatus(dishes.dishId)}}>
                        Toggle Status
                    </button>
                     
                </div>
                 
            </div>
        ))}
        </div>
    </div>
  )
}

export default Display




