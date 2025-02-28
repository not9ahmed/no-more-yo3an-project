import React, { useState, useEffect } from 'react'
import './AllFood.css'
import SingleFood from '../SingleFood/SingleFood'
import axios from 'axios'

function AllFood() {


    const [foodList, setFoodList] = useState([])

    useEffect(()=>{
      axios.get("http://localhost:4000/food")
      .then(res => {
        console.log(res.data)
        setFoodList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  
    },[])

    
  return (
    <>

    <h1>Food Page</h1>


    <div className='food-container'>
        
        {foodList.map( (food, index) => 
          <React.Fragment key={index}>
          <SingleFood food={food} />
          </React.Fragment>
        )}


    </div>

    </>
  )
}

export default AllFood