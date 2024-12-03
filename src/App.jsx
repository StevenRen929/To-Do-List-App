import { useState,useEffect } from 'react'
import './App.css'
import TodoList from './components/to-do-list'
import Navigation from './components/nav-bar'
import SubmitToDo from './components/submit-to-do'
import FinshList from './components/finish-list'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'


function App() {
  const[toDoItems,setToDoItems] = useState([]);
  useEffect(()=>{
      const toDoData = JSON.parse(localStorage.getItem('eventsList'))||[];
      setToDoItems(toDoData);
     // const unfinishedItems = [...toDoItems.filter(item=>item.Complete===false)];

  },[]);

  const addToDoItem = (newItem) => {
      const updatedToDoItems = [...toDoItems, newItem];
      setToDoItems(updatedToDoItems);
      localStorage.setItem('eventsList', JSON.stringify(updatedToDoItems));
    };

    //const unfinishedItems = toDoItems.filter(item => item.Complete === false); 
    const unfinishedItems = [...toDoItems.filter(item=>item.Complete===false)];
  // console.log(unfinishedItems);
  
  //updateLocal Storage Item after mark complete
  const markComplete = (id) => {
    const updatedItems = toDoItems.map((item) =>
        item.id === id ? { ...item, Complete: true , finishDate: new Date().toLocaleDateString()} : item
    );
    setToDoItems(updatedItems);
    localStorage.setItem('eventsList', JSON.stringify(updatedItems));
  };



  return (
   <Router>
    <Navigation></Navigation>
    
    <Routes>
          {/* need to follow restful */}
            <Route path= '/' element = {
                  <div className='Home-Page-Container'>
              <TodoList unfinishedItems={unfinishedItems} markComplete={markComplete}></TodoList>
               <SubmitToDo addToDoItem={addToDoItem} ></SubmitToDo>
              </div>
              
              }>

              </Route>
              <Route path= '/finsh-list' element = {
                  <div>
              <FinshList></FinshList>
              </div>
              
              }>
                
              </Route>
        
            
        </Routes>
      
       
  </Router>
   
  )
}

export default App
