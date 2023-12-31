import React, { useState } from "react";
import "./css/BMICalculatorPopup.css";

const BMICalculatorPopup = ({ onClose, onCalculate }) => {
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");

	const calculateBMI = () => {
		// Add your BMI calculation logic here
		// Example calculation: BMI = (weight / (height * height)) * 703
		const bmi = (weight / (height * height)) * 703;
		onCalculate(bmi);
	};

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
