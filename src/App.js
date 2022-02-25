import React,{useState,useEffect} from "react";

import "./App.css"
//importing components
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";

function App() {

  // All States
  const [inputText,setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //run Once when the app starts
  useEffect(() => {
    function getLocalTodos(){
      if(localStorage.getItem("todos") === null){
        localStorage.setItem("todos",JSON.stringify([]));
      }else{
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
        //console.log(todoLocal);
        setTodos(todoLocal);
      }
    };

    getLocalTodos();
    
  },[]);

  //useEffect
  useEffect(() => {

    function filterHandler(){
      switch(status){
        case "completed": 
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
        case "uncompleted": 
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
        default: 
        setFilteredTodos(todos);
        break;
      }
    };

    // Save to local
  function saveLocalTodos(){
      localStorage.setItem("todos",JSON.stringify(todos));
  };

    filterHandler();
    saveLocalTodos();

  },[todos,status]);

  
  return (
    <div className="App">
      <header>
      <h1>Taneem's Todo List</h1>
      </header>
      <Form inputText = {inputText} setInputText = {setInputText} todos = {todos} setTodos = {setTodos} setStatus = {setStatus} />
      <TodoList filteredTodos = {filteredTodos} todos = {todos} setTodos = {setTodos}/>
    </div>
  );
}

export default App;
