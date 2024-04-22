// This script organizes and exports the page components used throughout a React application, facilitating modular development and maintenance.
// It segregates page components into authenticated ('Auth') and unauthenticated ('UnAuth') categories to streamline access control and routing.
// Components like 'HomePage', 'LoginPage', and 'AboutPage' are accessible without authentication, supporting general public interaction with the application.
// Authenticated pages such as 'AuthHomePage', 'ProfilePage', and 'UploadPage' are reserved for users with verified access, ensuring secure and personalized experiences.
// Specialized components like 'ChatbotPage', 'MLResults', and 'Questionnaire' provide advanced features and interactive functionalities for authenticated users.
// The export structure not only simplifies the import process in other parts of the application but also enhances clarity and scalability of the component architecture.
// This modular export approach aids in maintaining a clean and organized codebase, promoting efficient development and easier updates.

// Created by: Tanner Helton

export { default as HomePage } from "./UnAuth/HomePage";
export { default as AuthHomePage } from "./Auth/AuthHomePage";
export { default as LoginPage } from "./UnAuth/LoginPage";
export { default as ChatbotPage } from "./Auth/ChatbotPage";
export { default as UploadPage } from "./Auth/UploadPage";
export { default as ProfilePage } from "./Auth/ProfilePage";
export { default as AboutPage } from "./UnAuth/AboutPage";
export { default as MLResults } from "./Auth/MLResults";
export { default as Questionnaire } from "./Auth/Questionnaire";
export { default as ContactUsPage } from "./UnAuth/ContactUsPage";
export { default as ThankYouPage } from "./UnAuth/ThankYouPage";
