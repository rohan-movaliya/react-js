import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title:"", description:"", tag:"default"})

  const handleOnClick = (event)=>{
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:"default"});
  };

  const onchange = (event)=>{
    setNote({...note, [event.target.name]:event.target.value})

  }

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
          Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onchange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            onChange={onchange}
            className="form-control"
            id="description"
            name="description"
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            onChange={onchange}
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleOnClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
