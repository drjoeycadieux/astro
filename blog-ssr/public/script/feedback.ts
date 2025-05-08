import { saveFeedbackToFirestore } from '../script/firebase.ts';

// Grab the form element
const feedbackForm = document.getElementById("QZD2eWWqxtOhJPC9Qe7K") as HTMLFormElement | null;

// Grab the input fields
const feedbackInput = document.getElementById("feedback") as HTMLTextAreaElement | null;
const emailInput = document.getElementById("email") as HTMLInputElement | null;
const telephoneInput = document.getElementById("telephone") as HTMLInputElement | null;
const firstNameInput = document.getElementById("first_name") as HTMLInputElement | null;
const lastNameInput = document.getElementById("last_name") as HTMLInputElement | null;

// Grab the reset and submit buttons
const submitButton = document.querySelector('input[type="submit"]') as HTMLInputElement | null;
const resetButton = document.querySelector('input[type="reset"]') as HTMLInputElement | null;

// Validation function
const validateForm = (): boolean => {
    let isValid = true;

    // Reset any previous validation error messages
    clearValidationErrors();

    // Check if the feedback field is empty
    if (feedbackInput && !feedbackInput.value.trim()) {
        showValidationError(feedbackInput, "Feedback is required.");
        isValid = false;
    }

    // Check if the email field is empty or not a valid email
    if (emailInput && !emailInput.value.trim()) {
        showValidationError(emailInput, "Email is required.");
        isValid = false;
    } else if (emailInput && !validateEmail(emailInput.value)) {
        showValidationError(emailInput, "Please enter a valid email address.");
        isValid = false;
    }

    // Check if the telephone field is empty or not a valid phone number
    if (telephoneInput && !telephoneInput.value.trim()) {
        showValidationError(telephoneInput, "Telephone number is required.");
        isValid = false;
    }

    // Check if the first name field is empty
    if (firstNameInput && !firstNameInput.value.trim()) {
        showValidationError(firstNameInput, "First name is required.");
        isValid = false;
    }

    // Check if the last name field is empty
    if (lastNameInput && !lastNameInput.value.trim()) {
        showValidationError(lastNameInput, "Last name is required.");
        isValid = false;
    }

    return isValid;
};

// Helper function to show validation error messages
const showValidationError = (inputElement: HTMLInputElement | HTMLTextAreaElement, message: string): void => {
    if (inputElement) {
        const errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message");
        errorSpan.textContent = message;
        inputElement.parentNode?.appendChild(errorSpan);
    }
};

// Helper function to clear validation error messages
const clearValidationErrors = (): void => {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => error.remove());
};

// Helper function to validate email format
const validateEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};

// Submit handler function
const handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault();

    // Validate form fields
    if (validateForm()) {
        const formData = {
            feedback: feedbackInput?.value ?? "",
            email: emailInput?.value ?? "",
            telephone: telephoneInput?.value ?? "",
            first_name: firstNameInput?.value ?? "",
            last_name: lastNameInput?.value ?? "",
            createdAt: new Date() // Timestamp of submission
        };

        try {
            // Save form data to Firestore using the helper function
            const docId = await saveFeedbackToFirestore(formData);

            // Optionally, reset the form
            feedbackForm?.reset();

            // Display success message
            alert(`Feedback submitted successfully! Your feedback ID: ${docId}`);
        } catch (e) {
            console.error("Error submitting feedback: ", e);
            alert("There was an error submitting your feedback. Please try again.");
        }
    }
};

// Reset handler function (optional)
const handleReset = (): void => {
    clearValidationErrors(); // Clear validation errors when the form is reset
};

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners only if elements exist
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", handleSubmit);
    }

    if (resetButton) {
        resetButton.addEventListener("click", handleReset);
    }
});
