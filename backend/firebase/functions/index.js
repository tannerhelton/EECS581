  // Define activity level and medical diagnosis
  const activityLevel = "moderate";
  const medicalDiagnosis = "diabetes";

  // Call getBasicInfo function with the defined parameters and return the result
  return await getBasicInfo(
    name,
    sex,
    weight,
    height,
    age,
    activityLevel,
    medicalDiagnosis,
    openaiClient
  );
};

// Define a Cloud Function for Firebase
exports.chatRequest = onCall(
  {
    // Enforce App Check: Reject requests with missing or invalid App Check tokens.
    enforceAppCheck: true, 
  },
  async (request) => {
    try {
      // Call the main function and log the result
      const info = await main();
      console.log("RUnning", info);
      // Send the result as the response
      res.send(info);
    } catch (error) {
      // If an error occurs, send a 500 status code with the error message
      res.status(500).send(`Error: ${error.message}`);
    }
  }
);

// The following code is commented out. It seems to be an alternative way to define the same Cloud Function.
// exports.chatRequest = functions.https.onRequest(async (req, res) => {
//   try {
//     const info = await main();
//     console.log("RUnning", info);
//     res.send(info);
//   } catch (error) {
//     res.status(500).send(`Error: ${error.message}`);
//   }
// });