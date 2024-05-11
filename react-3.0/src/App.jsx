import { useState } from 'react';
import { calculateInvestmentResults, formatter } from "./util/investment.js";

import Input from "./FormElements/Input.jsx";
import ResultsHeader from "./Results/Header.jsx";

const BASEVALUES = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 0,
  duration: 0
}
const resetButtonStyle = {
  display:"flex",
  justifyContent:"flex-end",
  width:"100%"
}

function App() {
  const [calcInputs, setCalcInputs] = useState(BASEVALUES);

  function handleInputValue(e) {
    setCalcInputs(curVals => {
      const newVals = { ...curVals };
      newVals[e.target.id] = Number(e.target.value);
      return newVals;
    });
  }

  function handleFormReset(){
    setCalcInputs(BASEVALUES);
  }

  let calculatedValues = calculateInvestmentResults(calcInputs);
  let totalInterest = 0;

  for(const key of calculatedValues){
    totalInterest += key.interest;
    key.totalInterest = totalInterest;
  }

  return (
    <div>
      <section id="header">
        <img
          src="./investment-calculator-logo.png"
          alt="Investment Calculator"
        ></img>
        <h1>React Investment Calculator</h1>
      </section>
      <section id="user-input">
        <div className="input-group">
          <Input
            label="Initial Investment"
            id="initialInvestment"
            type="number"
            onChange={handleInputValue}
            value={calcInputs.initialInvestment}
            min="0"
          />
          <Input
            label="Annual Investment"
            id="annualInvestment"
            type="number"
            onChange={handleInputValue}
            value={calcInputs.annualInvestment}
          />
        </div>
        <div className="input-group">
          <Input
            label="Expected Return (%)"
            id="expectedReturn"
            type="number"
            onChange={handleInputValue}
            value={calcInputs.expectedReturn}
            min="0"
          />
          <Input
            label="Duration (Years)"
            id="duration"
            type="number"
            onChange={handleInputValue}
            value={calcInputs.duration}
            min="0"
          />
        </div>
        <div style={resetButtonStyle}>
          <button onClick={handleFormReset}>Reset</button>
        </div>
      </section>
      <section>
        <table id="result">
          <ResultsHeader />
          <tbody>
            {calcInputs.duration < 1 && <tr><td colSpan="5" className="center">Invalid Duration</td></tr>}
            {calcInputs.duration >=1 && calculatedValues.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{formatter.format(row.valueEndOfYear)}</td>
                <td>{formatter.format(row.interest)}</td>
                <td>{formatter.format(row.totalInterest)}</td>
                <td>{formatter.format(row.valueEndOfYear - row.totalInterest)}</td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App
