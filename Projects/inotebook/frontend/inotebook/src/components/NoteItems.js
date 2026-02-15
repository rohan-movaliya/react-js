import React, {useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import NoteContext from "../context/notes/NoteContext";


const NoteItems = (props) => {

  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNode } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <FontAwesomeIcon className="mx-1" icon={faTrash} onClick = {()=>{deleteNote(note.id)}} style={{ cursor: 'pointer' }} />
            <FontAwesomeIcon className="mx-1" icon={faPenToSquare} onClick={() => {updateNode(note)}} style={{ cursor: 'pointer' }} />
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
