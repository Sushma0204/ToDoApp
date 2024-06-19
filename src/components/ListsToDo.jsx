import React, { useState } from 'react';
import checked from '../assets/checked.png';
import deletes from '../assets/deletes.png';
import edit from '../assets/edit.png';
import undone from '../assets/undone.png';

const ListsToDo = ({ text, id, isComplete, deleteText, toggle, editText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleEdit = () => {
    editText(id, newText);  
    setIsEditing(false);   
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();  
    }
  };

  return (
    <div className='flex sm:flex-row flex-col items-center justify-center gap-3 bg-white w-3/4 sm:w-full md:w-11/12 rounded-xl p-3'>
      <img onClick={() => { toggle(id) }} className='w-5 sm: ml-3 md:w-6' src={isComplete ? checked : undone} alt="tick image" />
      {isEditing ? (
        <input
          type="text"
          className={`ml-3 flex-grow bg-transparent outline-none border-none ${isComplete ? "line-through" : ""}`}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus  
        />
      ) : (
        <p className={`ml-3 flex-grow break-words decoration-purple-400 ${isComplete ? "line-through" : ""}`}>
          {text}
        </p>
      )}
      <div className='flex-shrink-0 flex items-center'>
        {isEditing ? (
          <button onClick={handleEdit}>
            <img className='w-5' src={edit} alt="edit image" />
          </button>
        ) : (
          <img onClick={() => setIsEditing(true)} className='w-5 cursor-pointer hover:w-6' src={edit} alt="edit image" />
        )}
        <img onClick={() => { deleteText(id) }} className='w-5 ml-4 cursor-pointer hover:w-6' src={deletes} alt="delete image" />
      </div>
    </div>
  );
};

export default ListsToDo;
