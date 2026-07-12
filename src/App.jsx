import { useState } from 'react';

function NumberButton({number, onNumberClick}) {
  return <button className="number-button" onClick={onNumberClick}>{number}</button>
}

function OperatorButton({operator, onOperatorClick}) {
  return <button className="operator-button" onClick={onOperatorClick}>{operator}</button>
}

function ToolButton({symbol, onToolClick}) {
  return <button className="tool-button" onClick={onToolClick}>{symbol}</button>
}

function Display({operation}){
  return <div className="display">{operation}</div>
}

export default function Calculator() {

  const [operation, setOperation] = useState("0");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  function handleNumberClick(number) {
    setOperation(prev => prev === "0" || prev === "Error" || prev === "Infinity" || prev === "NaN"? number : prev + number);
  }

  function handleOperatorClick(operator) {
    setOperation(prev => prev === "Error" || prev === "Infinity" || prev === "NaN"? 0 + operator : prev + operator);
  }

  function handleEqualClick(operation){
    if(operation.endsWith('+') || operation.endsWith('-') || operation.endsWith('*') || operation.endsWith('/')){
      setOperation("Error");
      return;
    }
    const result = parseFloat(eval(operation).toFixed(3));
    setHistory(prev => [...prev, `${operation} = ${result}`])
    setOperation(result.toString());
  }

  function handleDeleteClick(operation){
    setOperation(prev => prev.length === 1 ? "0" : prev.slice(0, -1));
  }

  return (
    <>
    <div className="calculator-layout">
      <div className="calculator">
        <Display operation={operation} />
        <div className="row">
            <ToolButton symbol="CLEAR" onToolClick={() => setOperation("0")} />
            <ToolButton symbol="DELETE" onToolClick={() => handleDeleteClick(operation)} />
          </div>
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
          {history.length > 0 && (
            <>
              <div className="history-label">history actions</div>
              <div className="history-row">
                <button className="history-button" onClick={() => setShowHistory(s => !s)}>
                  {showHistory ? "CLOSE" : "HISTORY"}
                </button>
                <button className="delete-button" onClick={() => {
                  setHistory(prev => prev.slice(0, -1));
                  if(history.length === 1) setShowHistory(false);
                }
                }>
                  DELETE
                </button>
                <button className="clean-button" onClick={() => { setHistory([]); setShowHistory(false); }}>
                  CLEAR
                </button>
              </div>
            </>
          )}
        </div>
        <div className={`history-notebook ${showHistory ? "open" : ""}`}>
          <div className="notebook-header">History</div>
          <div className="notebook-body">
            {history.map((entry, i) => (
              <div key={i} className="notebook-entry">{entry}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}