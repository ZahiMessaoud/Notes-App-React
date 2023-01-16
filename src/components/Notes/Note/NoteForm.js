
const NoteForm = (props) => {
    const {formTitle, title, content, titleChanged, contentChanged, submitClicked, submitText} = props;
    return <div>
    <h2>{formTitle}</h2>
    <form>
      <input
        type="text"
        name="title"
        className="form-input mb-30"
        placeholder="العنوان"
        value={title}
        onChange={titleChanged}
      />

      <textarea
        rows="10"
        name="content"
        className="form-input"
        placeholder="النص"
        value={content}
        onChange={contentChanged}
      />
      <a onClick={submitClicked} href="#" className="button green">
        {submitText}
      </a>
    </form>
  </div>;
};

export default NoteForm; 