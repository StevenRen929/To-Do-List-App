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

  const finishedItems  = [...toDoItems.filter(item=>item.Complete===true)];
  
  //updateLocal Storage Item after mark complete
  const markComplete = (id) => {
    const updatedItems = toDoItems.map((item) =>
        item.id === id ? { ...item, Complete: true , finishDate: new Date().toLocaleDateString()} : item);
    setToDoItems(updatedItems);
    localStorage.setItem('eventsList', JSON.stringify(updatedItems));
  };

  const revertComplete = (id) =>{
    const updatedItems = toDoItems.map((item)=> item.id === id?{...item,Complete:false,finishDate:""}:item);
    setToDoItems(updatedItems);
    localStorage.setItem('eventsList', JSON.stringify(updatedItems));

  }



  return (
   <Router>
    <Navigation></Navigation>
    
    <Routes>
          {/* need to follow restful */}
            <Route path= '/' element = {
                  <div className='Home-Page-Container'>
              <div className='to-do-block'>
              <TodoList unfinishedItems={unfinishedItems} markComplete={markComplete}></TodoList>
              </div>
              <div className='submit-to-do-block'>
               <SubmitToDo addToDoItem={addToDoItem} ></SubmitToDo>
               </div>
              </div>
              
              }>

              </Route>
              <Route path= '/finsh-list' element = {
                  <div>
              <FinshList finishedItems={finishedItems} revertComplete= {revertComplete}></FinshList>
              </div>
              
              }>
                
              </Route>
        
            
        </Routes>
      
       
  </Router>
   
  )
}

export default App
