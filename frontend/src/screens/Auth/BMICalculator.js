/**
 * BMICalculator.js
 * 
 * This component is a BMI (Body Mass Index) calculator popup used within the Questionnaire page 
 * of the application. It allows users to input their height and weight to calculate their BMI. 
 * The component provides a straightforward interface for users to easily calculate their BMI 
 * as part of a larger questionnaire process, enhancing user interaction and providing valuable 
 * health metrics on the fly.
 * 
 * Contributors:
 * - Thomas Gansner - Creation of the BMI calculator functionality and integration into the questionnaire
 * - Sloan Stubler - Styling and interactivity enhancements
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
