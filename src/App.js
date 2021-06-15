import './App.css';
import TodoItem from "./TodoItem";
import todosData from "./todosData";

/*
function App() {
  return (
    <div className="App">
    <Header/>
    </div>
  );
}
*/

function App() {
  const todoItems = todosData.map(item => <TodoItem key={item.id} item={item}/>)
    
  return (
      <div className="todo-list">
        <h1> To-do list Application </h1>
          {todoItems}
      </div>
  )
}

export default App;
