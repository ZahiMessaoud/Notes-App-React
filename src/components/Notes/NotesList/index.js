import Note from "../Note";

const NotesList = (props) => (
  <ul className="notes-list">
    {props.children}
  </ul>
);

export default NotesList;
