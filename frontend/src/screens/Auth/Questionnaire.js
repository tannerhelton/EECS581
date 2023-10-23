import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./css/Questionnaire.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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
	});
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

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

	return (
		<div className="questionnaire-card">
			<h1>Questionnaire</h1>
			{successMessage && (
				<div className="success-message">{successMessage}</div>
			)}
			{errorMessage && <div className="error-message">{errorMessage}</div>}
			<div className="question">
				<label>BMI (Body Mass Index):</label>
				<input
					type="number"
					onChange={(e) => handleAnswerChange("bmi", e.target.value)}
					value={answers.bmi}
					placeholder="Enter BMI"
				/>
			</div>
			<div className="question">
				<label>Do you smoke?</label>
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
				<label>Are you a heavy drinker?</label>
				<select
					onChange={(e) => handleAnswerChange("heavyDrinking", e.target.value)}
					value={answers.heavyDrinking}
				>
					<option value="">Select</option>
					<option value="yes">Yes</option>
					<option value="no">No</option>
				</select>
			</div>
			<div className="question">
				<label>Have you ever had a stroke?</label>
				<select
					onChange={(e) => handleAnswerChange("strokeHistory", e.target.value)}
					value={answers.strokeHistory}
				>
					<option value="">Select</option>
					<option value="yes">Yes</option>
					<option value="no">No</option>
				</select>
			</div>
			<div className="question">
				<label>
					Now thinking about your physical health, how many days during the past
					30 have you been injured or had illness?
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
				<label>
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
			<div className="question">
				<label>
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
				<label>Are you male or female?</label>
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
				<label>Age category:</label>
				<select
					onChange={(e) => handleAnswerChange("ageCategory", e.target.value)}
					value={answers.ageCategory}
				>
					<option value="">Select</option>
					<option value="65-69">65-69</option>
					<option value="60-64">60-64</option>
					<option value="70-74">70-74</option>
					<option value="55-59">55-59</option>
					<option value="50-54">50-54</option>
				</select>
			</div>
			<div className="question">
				<button onClick={saveQuestionnaireToFirestore}>
					Save Questionnaire
				</button>
			</div>
			<Link to="/profile" className="back-to-profile">
				<ArrowBackIosNewIcon />
			</Link>
		</div>
	);
}

export default Questionnaire;
