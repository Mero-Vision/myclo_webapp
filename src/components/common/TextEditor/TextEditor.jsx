import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill's snow theme CSS
import "./style.css";
const TextEditor = ({ label, name, control, error }) => {
   return (
      <div className="container">
         {label && (
            <label
               className="label"
               style={{ fontSize: "12px", fontWeight: "500" }}
            >
               {label}
            </label>
         )}
         <Controller
            name={name}
            control={control}
            render={({ field }) => (
               <ReactQuill
                  {...field}
                  modules={TextEditor.modules}
                  formats={TextEditor.formats}
                  className={`editor ${error ? "Mui-error" : ""}`}
                  style={{ height: "250px", marginBottom: "30px" }} // Set the height here
               />
            )}
         />
         {error && (
            <div className="errorMessage">{error.message}</div>
         )}
      </div>
   );
};

// Quill modules for adding controls
TextEditor.modules = {
   toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
   ],
};

// Quill formats
TextEditor.formats = [
   "header",
   "font",
   "list",
   "bullet",
   "bold",
   "italic",
   "underline",
   "link",
   "image",
   "align",
   "color",
   "background",
];

export default TextEditor;
