import './App.css';
import React, {useEffect} from "react"
import Axios  from 'axios';

function App() {

  const [foodName,setFoodName]= React.useState("");
  const [days,setDays]=React.useState(0);
  const [foodList,setFoodList]=React.useState([]);
  const [newFoodName,setNewFoodName]= React.useState("");
  
  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then(response =>{
      setFoodList(response.data);
    })
  })


  const addTolist=()=>{
    Axios.post('http://localhost:3001/insert',{foodName:foodName,days:days})
  }

  const updateFood=(id)=>{
    Axios.put("http://localhost:3001/update",{id:id,newFoodName:newFoodName})
  }

  const deleteFood=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  return (
    
      <div className='App'>
        <center>
        <h1>Create Read Update Form  </h1>
        <label>Employee Name: </label>
        <input type="text" onChange={(event)=>{
          setFoodName(event.target.value);
        }} />
       <br></br>
        <label>Employee Depart: </label>
        <input type="text" onChange={(event)=>{
          setDays(event.target.value);
        }}  />
       <br></br>
       <br></br>
        <button onClick={addTolist}>Add to Database </button>
        <hr/>
        </center>
        {
          foodList.map((val, key)=>{
            return <div key={key}> 
              <h1>{val.foodName}</h1>
              <h1>{val.daysSinceIAte}</h1>
              <input type="text" placeholder='Enter Updated Name'  onChange={(event)=>{
          setNewFoodName(event.target.value);
        }} />
        <br></br>
        <br></br>
              <button onClick={()=>updateFood(val._id)}>Update</button>
              <button onClick={()=>deleteFood(val._id)}>Delete</button>
            </div>
          })
        }
        </div>
      
    );
}

export default App;
