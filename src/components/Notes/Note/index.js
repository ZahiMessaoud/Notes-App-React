
const Note = (props) => {
    const {title, active, noteClicked} = props;
    return <li onClick={noteClicked} className={`note-item ${active && "active"}`}>{title}</li>;
};

export default Note; 