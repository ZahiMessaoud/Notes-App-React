const Alert = (props) => (
  <div className="alert-container">
    <ul>
        {props.validationMessages.map((message, index) => {
            return <li key={index}>{message}</li>
        })}
    </ul>
  </div>
);

export default Alert;
