import React, {useState, useEffect} from 'react'
import './FoodDetails.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import Maps from '../Maps/Maps';
import Button from 'react-bootstrap/Button';


function FoodDetails(props) {


    // get all the food details from api
    // const id = props.match.params.id;

    const id = useParams().id

    console.log(id)

    const [food, setFood] = useState({})
    const [foodStatus, setFoodStatus] = useState({status: ''})
  
    useEffect(()=>{
      axios.get(`http://localhost:4000/foodContent/${id}`)
      .then(res => {
        console.log(res.data)
        setFood(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  
    },[id])

    function reservedStat() {
      return new Promise((resolve) => setTimeout(resolve, 3000));
    }

      const [isReserving, setReserving] = useState(false);
    
      useEffect(() => {
        if (isReserving) {

          reservedStat().then(() => {
            document.getElementById('reserveBtn').innerText = 'Reserved'
          });
          
          axios.post(`http://localhost:4000/food/${id}` , foodStatus)
          .then(res => {})
          .catch(err => {
            console.log(err)
          })
        }
      }, [isReserving]);
    
      const handleClick = (e) => { 
        setReserving(true);
        setFoodStatus({
          ...foodStatus,
          [e.target.name]: e.target.value
        })
      }


  return (
    <div className='food-details-container'>

        {/* will be carsoul later one */}
        <div className='food-details-img-div'>
            <img alt='foodImage' className='food-details-img' src='https://media.npr.org/assets/img/2013/09/26/ap110725132481-64efa1b0559d2ba8f38c7f6aaa9b96221806903b-s1100-c50.jpg'></img>
        </div>
        <div className='food-details-text'>
            <h3>{food.name}</h3>
                <h3>{food.description}</h3>
                <h3>{food.name}</h3>


                {food.contains? <h3>Food Contents:</h3> : null}

                {food.contains ?
                
                food.contains.map((el, idx) =>
                <h4 key={idx}>
                    {el.contentName}
                </h4>) : null}


                {/* Add the location */}
                
                <p></p>
                {food.status == 'Reserved' ? null : <Button
                id='reserveBtn'
          variant="success"
          name="status"
          value={foodStatus.status = 'Reserved'}
          disabled={isReserving}
          onClick={!isReserving ? handleClick : null}
        >
          {isReserving ? 'Reserving...' : 'Reserve'}
        </Button>}
                
                </div>
        <div className='food-details-maps-div'>
            {/* <img className='map-img' src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg'></img> */}
        
        

          < Maps />
                
        </div>
        {/* <div>
            right down box
        </div> */}
        {/* <h1>FoodDetails</h1>
        <h1>{food.name}</h1>
        
        {/* <img alt='foodImage' className='food-details-img' src={props.food.images[0]}></img> */}
        {/* <img alt='foodImage' className='food-details-img' src='https://media.npr.org/assets/img/2013/09/26/ap110725132481-64efa1b0559d2ba8f38c7f6aaa9b96221806903b-s1100-c50.jpg'></img> */}
        
    </div>
  )
      }
export default FoodDetails