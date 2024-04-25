/**
 * File Name: BMICalculator.js
 * 
 * Description:
 * This component is a BMI (Body Mass Index) calculator popup used within the Questionnaire page 
 * of the application. It allows users to input their height and weight to calculate their BMI. 
 * The component provides a straightforward interface for users to easily calculate their BMI 
 * as part of a larger questionnaire process, enhancing user interaction and providing valuable 
 * health metrics on the fly.
 * 
 * Created by: Thomas Gansner
 * Date Created: October 8, 2024
 * 
 * Revised History:
 * - Sloan Stubler revised the UI design and added error management on March 20, 2024.
 * 
 * Preconditions:
 * - Material UI and React Router must be properly configured within the project.
 * 
 * Input Values:
 * - onClose: A function to close the BMI calculator popup.
 * - onCalculate: A function to calculate the BMI based on the user's input.
 * 
 * Postconditions:
 * - The BMI calculator popup will display the user's input fields for height and weight.
 * 
 * Return Values:
 * - A React component that displays the BMI calculator popup.
 * 
 * Errors and Exceptions:
 * - No handling of invalid input values or exceptions are implemented in this component.
 * 
 * Side Effects:
 * - Changes the BMI value in the Questionnaire page state.
 * 
 * Invariants:
 * - The visual layout and elements remain consistent unless explicitly modified.
 * 
 * Known Faults:
 * - None.
 */

//imports
import React, { useState } from "react";
import "./css/BMICalculatorPopup.css";

//component setup
const BMICalculatorPopup = ({ onClose, onCalculate }) => {
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");

	const calculateBMI = () => {
		// Add your BMI calculation logic here
		// Example calculation: BMI = (weight / (height * height)) * 703
		const bmi = (weight / (height * height)) * 703;
		onCalculate(bmi);
	};

	//return html
	return (
		<div className="bmi-calculator-popup">
			<h2>BMI Calculator</h2>
			<label>Height (in inches):</label>
			<input
				type="number"
				value={height}
				onChange={(e) => setHeight(e.target.value)}
			/>
			<label>Weight (in pounds):</label>
			<input
				type="number"
				value={weight}
				onChange={(e) => setWeight(e.target.value)}
			/>
			<button onClick={calculateBMI}>Calculate BMI</button>
			<button onClick={onClose}>Close</button>
		</div>
	);
};

export default BMICalculatorPopup;
