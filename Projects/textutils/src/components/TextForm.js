import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    console.log("Button was Clicked");
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase!", "success");
  };

  const handleLowClick = () => {
    console.log("Button was Clicked");
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase!", "success");

  };

  const handleClierClick = () => {
    console.log("Button was Clicked");
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared!", "success");
  };

  const handleCopyClick = () => {
    console.log("Button was Clicked");
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!", "success");
  };

  const handleOnChage = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");
  return (
    <>
      <div className="container">
        <h1 style={{color: props.mode === "dark" ? "white" : "#042743"}}>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            value={text}
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            onChange={handleOnChage}
            rows="8"
          ></textarea>
          <button disabled={text.length === 0} className="btn btn-primary mx-3 my-3" onClick={handleUpClick}>
            Convert to UpperCase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-3 mx-3"
            onClick={handleLowClick}
          >
            Convert to LowerCase
          </button>
          <button disabled={text.length === 0} className="btn btn-primary my-3 mx-3" onClick={handleClierClick}>
            Clear Text
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary my-3 mx-3"
            onClick={handleCopyClick}
          >
            Copy Text
          </button>
          <button disabled={text.length === 0} className="btn btn-primary my-3 mx-3" onClick={handleExtraSpaces}>
            Remove Extra Spaces
          </button>
        </div>
      </div>
      <div className="container my-2" style={{color: props.mode === "dark" ? "white" : "#042743"}}>
        <h2 style={{color: props.mode === "dark" ? "white" : "#042743"}}>Your Text Summary</h2>
        <p style={{color: props.mode === "dark" ? "white" : "#042743"}}>
          {text.split(/\s+/).filter((word) => word.length !== 0).length} Words and {text.length} Characters
        </p>
        <p>{0.008 * text.split(/\s+/).filter((word) => word.length !== 0).length} Minutes to Read</p>
        <h2 style={{color: props.mode === "dark" ? "white" : "#042743"}}>Preview</h2>
        <p style={{color: props.mode === "dark" ? "white" : "#042743"}}>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
