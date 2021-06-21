import './App.css';
// IMPORT ALL OUR COMPONENTS
import AllPosts from './pages/AllPosts';
import SinglePost from './pages/SinglePost';
import Form from './pages/Form';

// IMPORT REACT AND HOOKS
import React, { useState, useEffect } from 'react';

// IMPORT COMPONENTS FROM REACT ROUTER
import { Route, Switch, Link } from 'react-router-dom';

function App(props) {

  ///////////////////////////////
  // STYLE OBJECTS
  ///////////////////////////////

  const h1 = {
    textAlign: "center", 
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy", 
    display: "block", 
    margin: "auto",
  };

    ///////////////////////////////
  // STATE & OTHER VARIABLES
  ///////////////////////////////
  
  // Our API URL
  const url = "http://localhost:3000/todos";

  // State to Hold the List of Posts
  const [posts, setPosts] = useState([]);

  // AN OBJECT THAT REPRESENTS A NULL TODO
  const nullTodo = {
    subject: "",
    details: "",
  };

  // CONST STATE TO HOLD TODO TO EDIT
  const [targetTodo, setTargetTodo] = useState(nullTodo);

  ///////////////////////////////
  // FUNCTIONS
  ///////////////////////////////
  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  // FUNCTION TO ADD TODO FROM FORM DATA
  const addTodos = async (newTodo) => {
    const response = await fetch(url, {
      method: "post", 
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    // get update list of todos
    getTodos();
  };


  // FUNCTION TO SELECT TODO TO EDIT
  const getTargetTodo = (todo) => {
    setTargetTodo(todo);
    props.history.push("/edit");
  };

  // FUNCTION TO EDIT TODO ON FORM SUBMISSION
  const updateTodo = async (todo) => {
    const response = await fetch(url + "/" + todo.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    // get updated list of todos
    getTodos();
  };

  // Function to delete todo on form submission
  const deleteTodo = async (todo) => {
    const response = await fetch(url + "/" + todo.id , {
      method: "delete",
    });

    // Get updated list of todos
    getTodos();
    props.history.push("/");
  };

  ///////////////////////////////
  // useEffects
  ///////////////////////////////
  // useEffect to get list of todos when page loads
  useEffect(() => {
    getTodos();
  }, []);

  ///////////////////////////////
  // RETURNED JSX
  ///////////////////////////////

  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Link to="/new"><button style={button}>Create New Todo</button></Link>

      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost {...routerProps} posts={posts} edit={getTargetTodo} deleteTodo={deleteTodo} />
          )}
        />
        <Route 
          path="/new"
          render={(routerProps) => (
            <Form 
              {...routerProps} 
              initialTodo={nullTodo}
              handleSubmit={addTodos}
              buttonLabel="create todo"
            />
          )}
        />
        <Route
          path="/edit"
          render={(routerProps) => (
            <Form
              {...routerProps}
              initialTodo={targetTodo}
              handleSubmit={updateTodo}
              buttonLabel="update todo"
            />
          )}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
            <SinglePost
              {...routerProps}
              posts={posts}
              edit={getTargetTodo}
              deleteTodo={deleteTodo}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
