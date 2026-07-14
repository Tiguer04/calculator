import { useState } from 'react';

function Button({value, onClick, className}) {
  return <button className={className} onClick={onClick}>{value}</button>
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
    if(operator !== '-'){      
      setOperation(prev => prev === "Error" || prev === "Infinity" || prev === "NaN"? 0 + operator : prev + operator);
    } else{
      setOperation(prev => prev === "Error" || prev === "Infinity" || prev === "NaN"? operator : prev + operator);
    }
  }

  function handleEqualClick(operation){
    if(operation.endsWith('+') || operation.endsWith('-') || operation.endsWith('*') || operation.endsWith('/')){
      setOperation("Error");
      return;
    }

    const chars = operation.split(/([+\-*/])/);

    const replacers = { '/': '÷', '*': '×' };

    const formatedOperation = chars.map(char => replacers[char] || char).join(' ');

    let i = 0;

    while(i < chars.length){
      if(chars[i] === '*' || chars[i] === '/'){
        const res = chars[i] === '*'
        ? parseFloat(chars[i-1]) * parseFloat(chars[i+1])
        : parseFloat(chars[i-1]) / parseFloat(chars[i+1]);

        chars.splice(i-1, 3, String(res));
        i = 0;
      } else{
        i++;
      }
    }

    let result = parseFloat(chars[0])

    for(let i = 1; i < chars.length; i += 2){
      if(chars[i] === '+') result += parseFloat(chars[i+1]);
      else if(chars[i] === '-') result -= parseFloat(chars[i+1]);
    }

    result = parseFloat(result.toFixed(3));

    setHistory(prev => [...prev, `${formatedOperation} = ${result}`])
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
            <Button value="CLEAR" onClick={() => setOperation("0")} className="tool-button" />
            <Button value="DELETE" onClick={() => handleDeleteClick(operation)} className="tool-button" />
          </div>
          <div className="row">
            <Button value="1" onClick={() => handleNumberClick("1")} className="number-button" />
            <Button value="2" onClick={() => handleNumberClick("2")} className="number-button" />
            <Button value="3" onClick={() => handleNumberClick("3")} className="number-button" />
            <Button value="÷" onClick={() => handleOperatorClick("/")} className="operator-button" />
          </div>
          <div className="row">
            <Button value="4" onClick={() => handleNumberClick("4")} className="number-button" />
            <Button value="5" onClick={() => handleNumberClick("5")} className="number-button" />
            <Button value="6" onClick={() => handleNumberClick("6")} className="number-button" />
            <Button value="×" onClick={() => handleOperatorClick("*")} className="operator-button" />
          </div>
          <div className="row">
            <Button value="7" onClick={() => handleNumberClick("7")} className="number-button" />
            <Button value="8" onClick={() => handleNumberClick("8")} className="number-button" />
            <Button value="9" onClick={() => handleNumberClick("9")} className="number-button" />
            <Button value="+" onClick={() => handleOperatorClick("+")} className="operator-button" />
          </div>
          <div className="row">
            <Button value="=" onClick={() => handleEqualClick(operation)} className="operator-button" />
            <Button value="0" onClick={() => handleNumberClick("0")} className="number-button" />
            <Button value="." onClick={() => handleNumberClick(".")} className="number-button" />
            <Button value="-" onClick={() => handleOperatorClick("-")} className="operator-button" />
          </div>
          {history.length > 0 && (
            <>
              <div className="history-label">history actions</div>
              <div className="history-row">
                
                <Button value={showHistory ? "CLOSE" : "OPEN"} onClick={() => setShowHistory(s => !s)} className="history-button" />

                <Button value="DELETE" onClick={() => {
                  setHistory(prev => prev.slice(0, -1));
                  if(history.length === 1) setShowHistory(false);
                }} className="history-button" />

                <Button value="CLEAR" onClick={() => { 
                  setHistory([]); 
                  setShowHistory(false); }} className="history-button" />

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