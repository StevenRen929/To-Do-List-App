import { useState } from 'react'
import './App.css'
import TodoList from './components/to-do-list'
import Navigation from './components/nav-bar'
import SubmitToDo from './components/submit-to-do'
import FinshList from './components/finish-list'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <Navigation></Navigation>
    
    <Routes>
          {/* need to follow restful */}
            <Route path= '/' element = {
                  <div className='Home-Page-Container'>
              <TodoList></TodoList>
               <SubmitToDo></SubmitToDo>
              </div>
              
              }></Route>
        
            
        </Routes>
      
       
  </Router>
   
  )
}

export default App
