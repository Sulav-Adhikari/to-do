import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { deleteTodo, editTodo, fetchTodoList, postTodo } from "./api/todo";

interface Todo {
  id: string;
  name: string;
  status: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos: Todo[] = await fetchTodoList();
        setTasks(todos);
      } catch (error) {
        console.error('Error fetching todo list:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Omit<Todo, 'id'> = {
      name: task,
      status: false,
    };
  
    try {
      await postTodo(newTask);
      const updatedTasks = await fetchTodoList();
      setTasks(updatedTasks);
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEdit = async (id: string, updatedTask: Todo) => {
    try {
      await editTodo(id, updatedTask);
      const updatedTasks = tasks.map(task => task.id === id ? updatedTask : task); 

      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  

  return (
    <div className="home-container">
      <h1>Todo React App</h1>
      <div className="form-task">
        <form onSubmit={handleSubmit}>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
          <button type="submit">Add task</button>
        </form>
      </div>
      <ul
        role="list"
        className="container"
        aria-labelledby="list-heading"
      >
        {tasks.map(task => (
          <Todo
            key={task.id}
            todoObject={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
