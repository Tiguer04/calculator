import { useState } from 'react';

function NumberButton({number, onNumberClick}) {
  return <button className="number-button" onClick={onNumberClick}>{number}</button>
}

function OperatorButton({operator, onOperatorClick}) {
  return <button className="operator-button" onClick={onOperatorClick}>{operator}</button>
}

function Display({operation}){
  return <div className="display">{operation}</div>
}

export default function Calculator() {

  const [operation, setOperation] = useState("0");
  const [history, setHistory] = useState([]);

  function handleNumberClick(number) {
    setOperation(prev => prev === "0" ? number : prev + number);
  }

  function handleOperatorClick(operator) {
    setOperation(prev => prev + operator);
  }

  function handleEqualClick(operation){

    if(operation.endsWith('+') || operation.endsWith('-') || operation.endsWith('*') || operation.endsWith('/')){
      setOperation("Error");
      return;
    }

    const result = eval(operation);
    setHistory(prev => [...prev, `${operation} = ${result}`])
    setOperation(result.toString());

  }

  return (
    <>
    <div className="calculator">
      <Display operation={operation} />
        <div className="row">
          <NumberButton number="1" onNumberClick={() => handleNumberClick("1")} />
          <NumberButton number="2" onNumberClick={() => handleNumberClick("2")} />
          <NumberButton number="3" onNumberClick={() => handleNumberClick("3")} />
          <OperatorButton operator="/" onOperatorClick={() => handleOperatorClick("/")} />
        </div>
        <div className="row">
          <NumberButton number="4" onNumberClick={() => handleNumberClick("4")} />
          <NumberButton number="5" onNumberClick={() => handleNumberClick("5")} />
          <NumberButton number="6" onNumberClick={() => handleNumberClick("6")} />
          <OperatorButton operator="*" onOperatorClick={() => handleOperatorClick("*")} />
        </div>
        <div className="row">
          <NumberButton number="7" onNumberClick={() => handleNumberClick("7")} />
          <NumberButton number="8" onNumberClick={() => handleNumberClick("8")} />
          <NumberButton number="9" onNumberClick={() => handleNumberClick("9")} />
          <OperatorButton operator="+" onOperatorClick={() => handleOperatorClick("+")} />
        </div>
        <div className="row">
          <OperatorButton operator="=" onOperatorClick={() => handleEqualClick(operation)} />
          <NumberButton number="0" onNumberClick={() => handleNumberClick("0")} />
          <NumberButton number="." onNumberClick={() => handleNumberClick(".")} />
          <OperatorButton operator="-" onOperatorClick={() => handleOperatorClick("-")} />
        </div>
      </div>
    </>
  )
}