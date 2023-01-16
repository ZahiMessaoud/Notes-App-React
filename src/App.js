import "./App.css";
import React, { useState, useEffect } from "react";
import Preview from "./components/Preview";
import Message from "./components/Message";
import NotesList from "./components/Notes/NotesList";
import Note from "./components/Notes/Note";
import NoteForm from "./components/Notes/Note/NoteForm";
import Alert from "./components/Alert";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [creating, setCreating] = useState(null);
  const [editing, setEditing] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("notes")) {
      setNotes(JSON.parse(localStorage.getItem("notes")));
    } else {
      localStorage.setItem("notes", JSON.stringify([]));
    }
  }, []);
  useEffect(() => {
    if (validationErrors.length !==0) {
      setTimeout(() => {
        setValidationErrors([]);
      }, 3000);
    }
  }, [validationErrors]);

  const getAddNote = () => {
    return (
      <NoteForm
        title={title}
        content={content}
        formTitle="إضافة ملاحظة جديدة"
        titleChanged={changeTitleHandler}
        contentChanged={changeContentHandler}
        submitClicked={saveNoteHandler}
        submitText="حفظ"
      />
    );
  };

  const getPreview = () => {
    if (notes.length === 0) {
      return <Message title=" لا يوجد ملاحظات" />;
    }

    if (!selectedNote) {
      return <Message title="الرجاء اختيار ملاحظة" />;
    }

    const note = notes.find((note) => {
      return note.id === selectedNote;
    });

    let noteDisplay = (
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    );

    if (editing) {
      noteDisplay = (
        <NoteForm
          title={title}
          content={content}
          formTitle="تعديل الملاحظة"
          titleChanged={changeTitleHandler}
          contentChanged={changeContentHandler}
          submitClicked={updateNoteHandler}
          submitText="تعديل"
        />
      );
    }

    return (
      <div>
        {!editing && (
          <div className="note-operations">
            <a href="#" onClick={editNoteHandler}>
              <i className="fa fa-pencil-alt" />
            </a>
            <a href="#" onClick={deleteNoteHandler}>
              <i className="fa fa-trash" />
            </a>
          </div>
        )}
        {noteDisplay}
      </div>
    );
  };

  const addNoteHandler = () => {
    setCreating(true);
    setEditing(false);
    setTitle("");
    setContent("");
  };
  const saveNoteHandler = () => {

    if (!validate()) return;

    const note = {
      id: new Date().getTime(),
      title: title,
      content: content,
    };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    saveToLocalStorage("notes", updatedNotes);

    setCreating(false);
    setSelectedNote(note.id);

    setTitle("");
    setContent("");
  };

  const updateNoteHandler = () => {
    if (!validate()) return;

    const updatedNotes = [...notes];
    const noteIndex = notes.findIndex((note) => note.id === selectedNote);

    updatedNotes[noteIndex] = {
      id: selectedNote,
      title: title,
      content: content,
    };

    setNotes(updatedNotes);
    saveToLocalStorage("notes", updatedNotes);

    setEditing(false);
    setTitle("");
    setContent("");
  };

  //حذف ملاحظة
  const deleteNoteHandler = () => {
    const updatedNotes = [...notes];
    const noteIndex = notes.findIndex((note) => note.id === selectedNote);
    updatedNotes.splice(noteIndex, 1);
    setSelectedNote(null);
    setNotes(updatedNotes);
    saveToLocalStorage("notes", updatedNotes);
  };

  //تحديد ملاحظة
  const selectNoteHandler = (noteId) => {
    setCreating(false);
    setEditing(false);
    setSelectedNote(noteId);
  };

  // تعديل ملاحظة
  const editNoteHandler = () => {
    setEditing(true);
    const note = notes.find((note) => {
      return note.id === selectedNote;
    });

    setTitle(note.title);
    setContent(note.content);
  };

  // حفظ تغييرات العنوان
  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  // حفظ تغييرات النص
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  };

  // حفظ الملاحظات في التخزين المحلي
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const validate = () => {
    const validationErrors = [];
    let passed = true;
    if (!title) {
      validationErrors.push("الرجاء ادخال عنوان الملاحظة");
      passed = false;
    }
    
    if (!content) {
      validationErrors.push("الرجاء ادخال نص الملاحظة");
      passed = false;
    }

    setValidationErrors(validationErrors);

    return passed;
  }

  return (
    <div className="App">
      <div className="notes-section">
        <NotesList>
          {notes.map((note) => (
            <Note
              key={note.id}
              title={note.title}
              active={selectedNote === note.id}
              noteClicked={() => selectNoteHandler(note.id)}
            />
          ))}
        </NotesList>
        <button className="add-btn" onClick={addNoteHandler}>
          +
        </button>
      </div>
      <Preview>{creating ? getAddNote() : getPreview()}</Preview>
      {validationErrors.length !== 0 && <Alert validationMessages={validationErrors} />}
    </div>
  );
}

export default App;
