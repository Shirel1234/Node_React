import './App.css';
import { useEffect, useState } from 'react';
import Books from './components/Books';

function App() {
const [books, setBooks] = useState([]);
const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [isEditing, setIsEditing] = useState(false);
const [id, setId] = useState("");


const fetchBook=async()=>{
  const response=await fetch('http://localhost:5000/books');
  const data = await response.json();
  setBooks(data);
}

useEffect(() => {
  fetchBook();
}, []);

const handleSave= async()=>{
  if(isEditing){
    try{
      const response= await fetch(`http://localhost:5000/books/${id}`, {
        method:"PUT",
        headers:{"Content-Type": "application/json"}, 
        body: JSON.stringify({title, author}),
      });
    if (response.ok) {
        console.log('Book updated successfully');
      }
    } catch(error){
      console.error('Error updating book:', error);
    }
      
  setIsEditing(false);
  }
  else{
    try{
      const response = await fetch('http://localhost:5000/books', {
        method:"POST",
        headers:{"Content-Type": "application/json"}, 
        body: JSON.stringify({title, author}),
     });
     if(response.ok){
      console.log('Book added successfully');
     }
    }catch(error){
      console.error('Error adding book:', error);
    }
     

  }
setTitle('');
setAuthor('');
fetchBook();
}

const editBook= (book)=>{
  setTitle(book.title);
  setAuthor(book.author);
  setIsEditing(true);
  setId(book.id);
}
const deleteBook= async(bookId)=>{
  await fetch(`http://localhost:5000/books/${bookId}`, {
    method:'DELETE',
    headers:{"Content-Type": "application/json"}, 
    body: JSON.stringify({title, author}),
 });
 fetchBook();
}

  return (
    <div className="App">
      <h1>Book Crud</h1>
      <input placeholder="Title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />


      <input
      placeholder="Author"
      value={author}
      onChange={(e)=>setAuthor(e.target.value)} 
      />
      <button onClick={handleSave}> {isEditing? 'Update Book' : 'Add Book'} </button>
      <ul className='ListBooks'>
        {books.map((book)=>(
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={()=>editBook(book)}>edit</button>
            <button onClick={()=>deleteBook(book.id)}>delete</button>
          </li>
        ))}
       
      </ul>
    </div>
  );
}

export default App;
