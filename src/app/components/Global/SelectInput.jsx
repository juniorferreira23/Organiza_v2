import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function SelectInput({ Options, value, onChange }) {
  return (
    <FloatingLabel controlId="floatingSelect" label="Expense Category">
      <Form.Select
        aria-label="Floating label select example"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option>Open this select menu</option>
        {Options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}

export default SelectInput;
