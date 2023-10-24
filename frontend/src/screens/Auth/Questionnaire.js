import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
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
		// Generate Matplotlib results and set them in the state
		const results = "You have cancer"; // Replace with your actual Matplotlib generation logic
		// Redirect to the /matplotlib-results route
		navigate("/matplotlib-results");
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
				<label>What is your race?</label>
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
					<option value="Other Pacific Islander">Other Pacific Islander</option>
				</select>
			</div>
			<div className="question">
				<label>Are you diabetic?</label>
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
				<label>Do you exercise reguarly?</label>
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
			<div className="question">
				<label>How is your general health?</label>
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
				<label>How many hours do you sleep per night on average?</label>
				<input
					type="number"
					onChange={(e) => handleAnswerChange("sleepTime", e.target.value)}
					value={answers.sleepTime}
					placeholder="Enter hours"
				/>
			</div>
			<div className="question">
				<label>Do you have asthma?</label>
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
			<div className="question">
				<label>Do you have kidney disease?</label>
				<select
					onChange={(e) => handleAnswerChange("kidneyDisease", e.target.value)}
					value={answers.kidneyDisease}
				>
					<option value="">Select</option>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
					{/* Add more kidney disease options here */}
				</select>
			</div>
			<div className="question">
				<label>Do you have skin cancer?</label>
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
				<button onClick={saveQuestionnaireToFirestore}>
					Save Questionnaire
				</button>
			</div>
			<div className="question">
				<button onClick={generateAndDisplayMatplotlibResults}>
					Generate Results
				</button>
			</div>
			<Link to="/profile" className="back-to-profile">
				<ArrowBackIosNewIcon />
			</Link>
		</div>
	);
}

export default Questionnaire;
