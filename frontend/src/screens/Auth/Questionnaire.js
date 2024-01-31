import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./css/Questionnaire.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import BMICalculatorPopup from "./BMICalculator";

function Questionnaire({ db }) {
	const [answers, setAnswers] = useState({
		bmi: "",
		smoking: "",
		heavyDrinking: "",
		strokeHistory: "",
		physicalHealthDays: "",
		mentalHealthDays: "",
		difficultyWalking: "",
		gender: "",
		ageCategory: "",
		race: "", // New question
		diabetic: "", // New question
		physicalActivity: "", // New question
		genHealth: "", // New question
		sleepTime: "", // New question
		asthma: "", // New question
		kidneyDisease: "", // New question
		skinCancer: "", // New question
	});

	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [showBMICalculator, setShowBMICalculator] = useState(false);
	const [calculatedBMI, setCalculatedBMI] = useState(null);
	const navigate = useNavigate();

	const handleAnswerChange = (question, answer) => {
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[question]: answer,
		}));
	};

	const clearMessages = () => {
		setSuccessMessage("");
		setErrorMessage("");
	};

	const saveQuestionnaireToFirestore = async () => {
		clearMessages();
		try {
			const docRef = await addDoc(collection(db, "questionnaires"), answers);

			setSuccessMessage("Questionnaire answers saved successfully!");
			setErrorMessage("");

			console.log("Questionnaire answers saved with ID: ", docRef.id);
		} catch (error) {
			console.error("Error saving questionnaire answers: ", error);

			setSuccessMessage("");
			setErrorMessage("An error occurred while saving. Please try again.");
		}
	};

	const generateAndDisplayMatplotlibResults = () => {
		navigate("/matplotlib-results");
	};

	// buttons for when BMI Calculator is open
	const openBMICalculator = () => {
		setShowBMICalculator(true);
	};

	const closeBMICalculator = () => {
		setShowBMICalculator(false);
	};
	// Handles button click BMICalculator
	const handleBMICalculation = (bmi) => {
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			bmi: bmi.toFixed(2), // Round BMI to two decimal places
		}));
		setCalculatedBMI(bmi);
		closeBMICalculator();
	};

	return (
		<div className="questionnaire-card">
			<h1>Questionnaire</h1>
			{successMessage && (
				<div className="success-message">{successMessage}</div>
			)}
			{errorMessage && <div className="error-message">{errorMessage}</div>}
			<div className="question-set">
				<div className="question">
					<label className="q-text">BMI (Body Mass Index):</label>
					<input
						type="number"
						onChange={(e) => handleAnswerChange("bmi", e.target.value)}
						value={answers.bmi}
						placeholder="Enter BMI"
					/>
					<button className="q-buttons" onClick={openBMICalculator}>
						Calculate BMI
					</button>
				</div>
				<div className="question">
					<label className="q-text">Do you smoke?</label>
					<select
						onChange={(e) => handleAnswerChange("smoking", e.target.value)}
						value={answers.smoking}
					>
						<option value="">Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="question">
					<label className="q-text">Are you a heavy drinker?</label>
					<select
						onChange={(e) =>
							handleAnswerChange("heavyDrinking", e.target.value)
						}
						value={answers.heavyDrinking}
					>
						<option value="">Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
			</div>
			<div className="question-set">
				<div className="question">
					<label className="q-text">Have you ever had a stroke?</label>
					<select
						onChange={(e) =>
							handleAnswerChange("strokeHistory", e.target.value)
						}
						value={answers.strokeHistory}
					>
						<option value="">Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="question">
					<label className="q-text">
						Now thinking about your physical health, how many days during the
						past 30 have you been injured or had illness?
					</label>
					<input
						type="number"
						onChange={(e) =>
							handleAnswerChange("physicalHealthDays", e.target.value)
						}
						value={answers.physicalHealthDays}
						placeholder="Enter days"
					/>
				</div>
				<div className="question">
					<label className="q-text">
						Now thinking about your mental health, how many days during the past
						30 has your mental not been good?
					</label>
					<input
						type="number"
						onChange={(e) =>
							handleAnswerChange("mentalHealthDays", e.target.value)
						}
						value={answers.mentalHealthDays}
						placeholder="Enter days"
					/>
				</div>
			</div>
			<div className="question-set">
				<div className="question">
					<label className="q-text">
						Do you have serious difficulty walking or climbing stairs?
					</label>
					<select
						onChange={(e) =>
							handleAnswerChange("difficultyWalking", e.target.value)
						}
						value={answers.difficultyWalking}
					>
						<option value="">Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div className="question">
					<label className="q-text">Are you male or female?</label>
					<select
						onChange={(e) => handleAnswerChange("gender", e.target.value)}
						value={answers.gender}
					>
						<option value="">Select</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<div className="question">
					<label className="q-text">Age category:</label>
					<select
						onChange={(e) => handleAnswerChange("ageCategory", e.target.value)}
						value={answers.ageCategory}
					>
						<option value="">Select</option>
						<option value="25-29">25-29</option>
						<option value="30-34">30-34</option>
						<option value="35-39">35-39</option>
						<option value="40-44">40-44</option>
						<option value="45-49">45-49</option>
						<option value="50-54">50-54</option>
						<option value="55-59">55-59</option>
						<option value="60-64">60-64</option>
						<option value="65-69">65-69</option>
						<option value="70-74">70-74</option>
						<option value="75-79">75-79</option>
						<option value="80 or older">80 or older</option>
					</select>
				</div>
			</div>
			<div className="question-set">
				<div className="question">
					<label className="q-text">What is your race?</label>
					<select
						onChange={(e) => handleAnswerChange("race", e.target.value)}
						value={answers.race}
					>
						<option value="">Select</option>
						<option value="White">White</option>
						<option value="Black">Black</option>
						<option value="Asian">Asian</option>
						<option value="Native American">Native American</option>
						<option value="Native Hawaiian">Native Hawaiian</option>
						<option value="Other Pacific Islander">
							Other Pacific Islander
						</option>
					</select>
				</div>
				<div className="question">
					<label className="q-text">Are you diabetic?</label>
					<select
						onChange={(e) => handleAnswerChange("diabetic", e.target.value)}
						value={answers.diabetic}
					>
						<option value="">Select</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>
				<div className="question">
					<label className="q-text">Do you exercise regularly?</label>
					<select
						onChange={(e) =>
							handleAnswerChange("physicalActivity", e.target.value)
						}
						value={answers.physicalActivity}
					>
						<option value="">Select</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>
			</div>
			<div className="question-set">
				<div className="question">
					<label className="q-text">How is your general health?</label>
					<select
						onChange={(e) => handleAnswerChange("genHealth", e.target.value)}
						value={answers.genHealth}
					>
						<option value="">Select</option>
						<option value="Very good">Very good</option>
						<option value="Good">Good</option>
						<option value="Fair">Fair</option>
						<option value="Bad">Bad</option>
						<option value="Very Bad">Very bad</option>
					</select>
				</div>
				<div className="question">
					<label className="q-text">
						How many hours do you sleep per night on average?
					</label>
					<input
						type="number"
						onChange={(e) => handleAnswerChange("sleepTime", e.target.value)}
						value={answers.sleepTime}
						placeholder="Enter hours"
					/>
				</div>
				<div className="question">
					<label className="q-text">Do you have asthma?</label>
					<select
						onChange={(e) => handleAnswerChange("asthma", e.target.value)}
						value={answers.asthma}
					>
						<option value="">Select</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
						{/* Add more asthma options here */}
					</select>
				</div>
			</div>
			<div className="question-set">
				<div className="question">
					<label className="q-text">Do you have kidney disease?</label>
					<select
						onChange={(e) =>
							handleAnswerChange("kidneyDisease", e.target.value)
						}
						value={answers.kidneyDisease}
					>
						<option value="">Select</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
						{/* Add more kidney disease options here */}
					</select>
				</div>
				<div className="question">
					<label className="q-text">Do you have skin cancer?</label>
					<select
						onChange={(e) => handleAnswerChange("skinCancer", e.target.value)}
						value={answers.skinCancer}
					>
						<option value="">Select</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
						{/* Add more skin cancer options here */}
					</select>
				</div>
				<div className="question">
					<button className="q-buttons" onClick={saveQuestionnaireToFirestore}>
						Save Questionnaire
					</button>
				</div>
				<div className="question">
					<button
						className="q-buttons"
						onClick={generateAndDisplayMatplotlibResults}
					>
						Next
					</button>
				</div>
				<Link to="/" className="back-to-profile">
					<ArrowBackIosNewIcon />
				</Link>
				{showBMICalculator && (
					<BMICalculatorPopup
						onClose={closeBMICalculator}
						onCalculate={handleBMICalculation}
					/>
				)}
			</div>
		</div>
	);
}

export default Questionnaire;
