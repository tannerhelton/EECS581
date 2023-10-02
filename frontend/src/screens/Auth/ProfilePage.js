import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

function ProfilePage({ auth, db }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    displayName: "",
    phoneNumber: "",
    height: "",
  });
  const [editable, setEditable] = useState(false);

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
            height: userInfo.height,
          },
          { merge: true }
        ); // Use merge: true to update or create
        setEditable(false); // Reset the editable state after saving
      } catch (error) {
        console.error("Error updating or creating document: ", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserInfo({
            email: user.email || "",
            displayName: user.displayName || "",
            phoneNumber: user.phoneNumber || "",
            height: userSnap.data().height || "",
          });
        }
      }
    };

    fetchData();
  }, [auth, db]);

  return (
    <div>
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
        <strong>Email:</strong> {userInfo.email}{" "}
        {/* Assume email is not editable */}
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
      <p>
        <strong>Height:</strong>
        {editable ? (
          <input
            type="text"
            name="height"
            value={userInfo.height}
            onChange={handleChange}
          />
        ) : (
          userInfo.height
        )}
      </p>
      {editable ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
}

export default ProfilePage;
