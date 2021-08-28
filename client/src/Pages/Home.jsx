/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "../../Assets/CSS/home.css";
import { Editor } from "@tinymce/tinymce-react";

const Home = () => {
   const token = localStorage.getItem("token") || undefined;
   const [user, setUser] = useState(undefined);
   const [sem, setSem] = useState(1);
   const [book, setBook] = useState(1);
   const [pages, setPages] = useState();
   const [pageID, setPageID] = useState();
   const editorRef = useRef(null);
   const log = () => {
      if (editorRef.current) {
         console.log(editorRef.current.getContent());
      }
   };

   const addPage = () => {
      if (user) {
         let request = {
            user: user._id,
            sem: sem,
            book: book,
         };
         fetch("http://localhost:3000/api/page/add", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
         })
            .then((response) => response.json())
            .then((data) => {
               console.log(data);
            })
            .catch((err) => console.log(err));
      }
   };

   useEffect(() => {
      if (token) {
         fetch("http://localhost:3000/api/getuser", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${token}`,
            },
         })
            .then((response) => response.json())
            .then((data) => {
               setUser(data);
            })
            .catch((err) => console.log(err));
      }
   }, []);

   useEffect(() => {
      if (user) {
         let request = {
            user: user._id,
            sem: sem,
            book: book,
         };
         fetch("http://localhost:3000/api/page/get", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
         })
            .then((response) => response.json())
            .then((data) => {
               setPageID(data[0]._id);
               setPages(data[0].content);
            })
            .catch((err) => console.log(err));
      }
   }, [user]);

   const saveToDB = () => {
      fetch("http://localhost:3000/api/page/save", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            content: tinyMCE.activeEditor.getContent({ format: "raw" }),
            user: user._id,
            sem: sem,
            book: book,
         }),
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
         })
         .catch((err) => console.log(err));
   };

   const uploadImage = () => {
      const files = document.getElementById("filesUpload");
      const formData = new FormData();

      for (const file in files.files) {
         if (Object.hasOwnProperty.call(files.files, file)) {
            const element = files.files[file];
            formData.append("files", element);
         }
      }

      fetch(`http://localhost:3000/api/upload/${pageID}`, {
         method: "POST",
         body: formData,
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
         });
   };

   return (
      <div className="home">
         <nav className="side-panel">
            <div className="side-panel-info flex-center">
               Hello, Welcome Back
            </div>
            <Navigation
               onSelect={({ itemId }) => {
                  setSem(Number(itemId.replace("/sem")));
                  window.location.href = "http://localhost:8080/home" + itemId;
               }}
               items={[
                  {
                     title: "SEM-1",
                     itemId: "/sem1",
                  },
                  {
                     title: "SEM-2",
                     itemId: "/sem2",
                  },
                  {
                     title: "SEM-3",
                     itemId: "/sem3",
                  },
                  {
                     title: "SEM-4",
                     itemId: "/sem4",
                  },
                  {
                     title: "SEM-5",
                     itemId: "/sem5",
                  },
                  {
                     title: "SEM-6",
                     itemId: "/sem6",
                  },
                  {
                     title: "SEM-7",
                     itemId: "/sem7",
                  },
                  {
                     title: "SEM-8",
                     itemId: "/sem8",
                  },
               ]}
            />
         </nav>
         <div className="main-container">
            <div className="select-book">
               <select
                  name="book-select"
                  id="book-select"
                  onChange={(e) => setBook(e.target.value.replace("Book", ""))}
               >
                  <option value="Book1">Book1</option>
                  <option value="Book2">Book2</option>
                  <option value="Book3">Book3</option>
                  <option value="Book4">Book4</option>
                  <option value="Book5">Book5</option>
                  <option value="Book6">Book6</option>
                  <option value="Book7">Book7</option>
                  <option value="Book8">Book8</option>
               </select>
            </div>
            <div className="pages">
               <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={pages}
                  init={{
                     height: 500,
                     menubar: false,
                     plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                     ],
                     toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                     content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
               />
               <button onClick={log}>Log editor content</button>
            </div>
            <div>
               <label htmlFor="files">Add Image</label>
               <input
                  type="file"
                  accept="image"
                  multiple
                  name="files"
                  id="filesUpload"
               />
               <button type="button" onClick={uploadImage}>
                  Add Image
               </button>
            </div>
            <button type="button" onClick={addPage}>
               Add Page
            </button>
            <br />
            <button type="button" onClick={saveToDB}>
               Save
            </button>
         </div>
      </div>
   );
};

export default Home;
