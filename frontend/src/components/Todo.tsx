import React, { useState } from "react";

interface TodoProps {
  todoObject: {
    id: string;
    name: string;
    status: boolean;
  };
  onEdit: (id: string, updatedTask: { name: string; status: boolean; }) => void;
  onDelete: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todoObject, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [editedId, setEditedId] = useState(todoObject.id)
  const [editedName, setEditedName] = useState(todoObject.name);
  const [editedStatus, setEditedStatus] = useState(todoObject.status);

  const handleEdit = () => {
    const updatedTodo = { name: editedName, status: editedStatus };
    onEdit(todoObject.id, updatedTodo);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todoObject.id);
  };

  return (
    <div className="todo-container">
  {isEditing ? (
    <div>
      <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
      <input type="checkbox" checked={editedStatus} onChange={(e) => setEditedStatus(e.target.checked)} />
      <button onClick={handleEdit}>Save</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  ) : (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input type="checkbox" name="isDone" id="isDone" checked={todoObject.status} readOnly />
      <p>{todoObject.name}</p>
      <div className="action-buttons">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )}
</div>


  );
}

export default Todo;
