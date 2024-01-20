import React from "react";
import { getResult } from "./helpers";

const OPERATORS = ["+", "-", "*", "/"];

const Calculator = () => {
  const [firstOperand, setFirstOperand] = React.useState(0);
  const [secondOperand, setSecondOperand] = React.useState(0);
  const [operator, setOperator] = React.useState("+");
  const [result, setResult] = React.useState(0);

  React.useEffect(() => {
    const result = getResult(firstOperand, secondOperand, operator);
    setResult(result);
  }, [firstOperand, secondOperand, operator]);
  return (
    <div>
      <input
        type="number"
        value={firstOperand}
        onChange={(e) => setFirstOperand(+e.target.value)}
      />
      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        {OPERATORS.map((item, idx) => (
          <option key={idx}> {item} </option>
        ))}
      </select>
      <input
        type="number"
        value={secondOperand}
        onChange={(e) => setSecondOperand(+e.target.value)}
      />{" "}
      = <>{result}</>
    </div>
  );
};

export default Calculator;
