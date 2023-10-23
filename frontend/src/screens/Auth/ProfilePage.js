import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/ProfilePage.css"; // Import the CSS file

function ProfilePage({ auth, db }) {
	const [userInfo, setUserInfo] = useState({
		email: "",
		displayName: "",
		phoneNumber: "",
		heightFeet: "",
		heightInches: "",
		dateOfBirth: "",
		gender: "",
		bloodType: "",
		weight: "",
		allergies: "",
		medications: "",
		medicalConditions: "",
		emergencyContactName: "",
		emergencyContactNumber: "",
		dateOfBirthError: "",
	});
	const [editable, setEditable] = useState(false);
	const [error, setError] = useState("");

	const handleEdit = () => setEditable(true);

	const handleSave = async () => {
		const user = auth.currentUser;
		if (user) {
			const userRef = doc(db, "users", user.uid);
			try {
				await setDoc(
					userRef,
					{
						displayName: userInfo.displayName,
						phoneNumber: userInfo.phoneNumber,
						heightFeet: userInfo.heightFeet,
						heightInches: userInfo.heightInches,
						dateOfBirth: userInfo.dateOfBirth,
						gender: userInfo.gender,
						bloodType: userInfo.bloodType,
						weight: userInfo.weight,
						allergies: userInfo.allergies,
						medications: userInfo.medications,
						medicalConditions: userInfo.medicalConditions,
						emergencyContactName: userInfo.emergencyContactName,
						emergencyContactNumber: userInfo.emergencyContactNumber,
					},
					{ merge: true }
				);
				setEditable(false);
				setError(""); // Clear any previous error message
			} catch (error) {
				console.error("Error updating or creating document: ", error);
				setError("An error occurred while saving. Please try again.");
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "dateOfBirth") {
			// Validate the date format (MM/DD/YYYY) using regex
			const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
			if (!datePattern.test(value)) {
				// Invalid date format, set an error message
				setUserInfo((prevInfo) => ({
					...prevInfo,
					dateOfBirth: value,
					dateOfBirthError: "Please enter a valid date (MM/DD/YYYY).",
				}));
				return;
			} else {
				// Clear any previous error message
				setUserInfo((prevInfo) => ({
					...prevInfo,
					dateOfBirth: value,
					dateOfBirthError: "",
				}));
			}
		} else {
			setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const user = auth.currentUser;
			if (user) {
				const userRef = doc(db, "users", user.uid);
				const userSnap = await getDoc(userRef);

				if (userSnap.exists()) {
					const userData = userSnap.data();
					setUserInfo({
						email: user.email || "",
						displayName: userData.displayName || "",
						phoneNumber: userData.phoneNumber || "",
						heightFeet: userData.heightFeet || "",
						heightInches: userData.heightInches || "",
						dateOfBirth: userData.dateOfBirth || "",
						gender: userData.gender || "",
						bloodType: userData.bloodType || "",
						weight: userData.weight || "",
						allergies: userData.allergies || "",
						medications: userData.medications || "",
						medicalConditions: userData.medicalConditions || "",
						emergencyContactName: userData.emergencyContactName || "",
						emergencyContactNumber: userData.emergencyContactNumber || "",
						dateOfBirthError: "", // Clear any previous error message
					});
				}
			}
		};

		fetchData();
	}, [auth, db]);

	return (
		<>
			<div className="profile-card">
				<h1>Account Information</h1>
				<p>
					<strong>Name:</strong>
					{editable ? (
						<input
							type="text"
							name="displayName"
							value={userInfo.displayName}
							onChange={handleChange}
						/>
					) : (
						userInfo.displayName
					)}
				</p>
				<p>
					<strong>Email:</strong> {userInfo.email}
				</p>
				<p>
					<strong>Phone Number:</strong>
					{editable ? (
						<input
							type="text"
							name="phoneNumber"
							value={userInfo.phoneNumber}
							onChange={handleChange}
						/>
					) : (
						userInfo.phoneNumber
					)}
				</p>
				{editable ? (
					<div>
						<button onClick={handleSave}>Save</button>
						<button onClick={() => setEditable(false)}>Cancel</button>
					</div>
				) : (
					<div>
						<button onClick={handleEdit}>Edit</button>
					</div>
				)}
				{error && <div className="error">{error}</div>}
			</div>
		</>
	);
}

export default ProfilePage;
