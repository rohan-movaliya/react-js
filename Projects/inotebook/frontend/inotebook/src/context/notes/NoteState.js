import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const baseUrl = "http://127.0.0.1:8000"
  const token = "Bearer " + localStorage.getItem("token");
  const { showAlert } = props;

  const notesInitial = [
    {
      title: "Grocery List",
      description: "Buy milk, eggs, bread, and fruits from the market.",
      tag: "personal",
      id: 1,
      created_at: "2026-02-09T14:57:23",
    }
  ];

  const [notes, setNotes] = useState([]);

  // Get all Note
  const getNotes = async ()=>{

    const url = `${baseUrl}/notes/`
    const response = await fetch(url, {
      method: "GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":token
      },
    });
    const json = await response.json()
    if (response.ok && Array.isArray(json)) {
      setNotes(json)
    } else {
      // If error or not an array, set empty array to prevent map error
      setNotes([])
    }
  }


  // Add Note
  const addNote = async (title, description, tag)=>{

    const url = `${baseUrl}/notes/`
    const response = await fetch(url, {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":token
      },
      body: JSON.stringify({title, description, tag})
    });
    if (response.ok) {
      const json = await response.json();
      setNotes(notes.concat(json));
      if (showAlert) {
        showAlert("Note added successfully!", "success");
      }
    } else {
      if (showAlert) {
        showAlert("Failed to add note. Please try again.", "danger");
      }
    }
  }





  // Delete Note
  const deleteNote = async (id)=>{
    
    const url = `${baseUrl}/notes/${id}/`
    const response = await fetch(url, {
      method: "DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization":token
      },
    });
    if (response.ok) {
      setNotes(notes.filter((note)=>{return note.id !== id}))
      if (showAlert) {
        showAlert("Note deleted successfully!", "success");
      }
    } else {
      if (showAlert) {
        showAlert("Failed to delete note. Please try again.", "danger");
      }
    }
  }




  // Edit Note
  const editNote = async (id, title, description, tag)=>{

    const url = `${baseUrl}/notes/${id}/`
    const response = await fetch(url, {
      method: "PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":token
      },
      body: JSON.stringify({title, description, tag})
    });
    if (response.ok) {
      const json = await response.json();
      setNotes(notes.map((note) => {
        if (note.id === id) {
          return json;
        }
        return note;
      }));
      if (showAlert) {
        showAlert("Note updated successfully!", "success");
      }
    } else {
      if (showAlert) {
        showAlert("Failed to update note. Please try again.", "danger");
      }
    }
  }



  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
