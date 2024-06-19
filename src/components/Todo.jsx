import React , {useRef, useState, useEffect} from 'react'
import list from '../assets/list.png'
import add from '../assets/add.png'
import ListsToDo from './ListsToDo'


const Todo = () => {
  const inputRef = useRef()
  const [todos, setTodos] = useState(localStorage.getItem("todoItems") ? JSON.parse(localStorage.getItem("todoItems")) : [])

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todos))
  }, [todos])

  const addText = () => {
    const inputText = inputRef.current.value.trim()

    if(inputText === ""){
      return null
    }
   

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false
    }

    setTodos((prev) => [...prev, newTodo])
    inputRef.current.value = ""

  }

  const toggle = (id) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if(todo.id == id){
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo
      })
    })
  }
  const editText = (id, newText) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      });
    });
  };
  

  const deleteText = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id)
    })

  }

  return (
    <>

      {/* top banner */}
      <div className='bg-white rounded-2xl w-3/4 sm:w-8/12 h-full sm:h-3/4 mx-auto'>
        <div className='flex bg-indigo-200 p-3 rounded-t-2xl items-center'>
          <img className='w-10 ml-3 sm:ml-10 sm:w-20' src={list} alt="todo image" />
          <div className='flex flex-col ml-3'>
            <h1 className='font-semibold text-xl md:text-lg'>LISTLIFT</h1>
            <p className='text-sm md:text-base '>Create your own list</p>
          </div>
        </div>

        {/* input */}
        <div className='flex justify-center my-5 px-2 md:px-0 md:mx-5'>
          <input ref={inputRef} className='p-3 md:w-1/2 w-3/4 bg-transparent border border-slate-300 rounded-xl placeholder:text-slate-400' type="text" placeholder='Enter your task' />
          <button onClick={addText} className='ml-2 flex justify-center items-center bg-slate-200 rounded-full w-12 md:w-20'><img className='w-7' src={add} alt="add image" /></button>
        </div>

        {/* todo items */}
        <div className='m-10 ml-5 mr-5 flex flex-col gap-5 h-1/2 items-center sm:w-3/4 lg:w-1/2 justify-start bg-pink-300  rounded-lg sm:mx-auto p-2 sm:max-h-72 overflow-y-auto scrollbar-hide'>
          {todos.length === 0 ? (
            <p className='text-white font-medium'>Your todos will be displayed here!!</p>
          ) : (
            todos.map((item) => (
              <ListsToDo
                key={item.id}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteText={deleteText}
                toggle={toggle}
                editText={editText}
              />
            ))
          )}
        </div>

      </div>




    </>
  )
}

export default Todo