import { saveFeedbackToFirestore } from '../script/firebase.ts';

const feedbackForm = document.getElementById("QZD2eWWqxtOhJPC9Qe7K") as HTMLFormElement | null;
const feedbackInput = document.getElementById("feedback") as HTMLTextAreaElement | null;
const emailInput = document.getElementById("email") as HTMLInputElement | null;
const telephoneInput = document.getElementById("telephone") as HTMLInputElement | null;
const firstNameInput = document.getElementById("first_name") as HTMLInputElement | null;
const lastNameInput = document.getElementById("last_name") as HTMLInputElement | null;
const submitButton = document.querySelector('input[type="submit"]') as HTMLInputElement | null;
const resetButton = document.querySelector('input[type="reset"]') as HTMLInputElement | null;

const validateForm = (): boolean => {
    let isValid = true;
    clearValidationErrors();

    if (!feedbackInput?.value.trim()) {
        showValidationError(feedbackInput, "Feedback is required.");
        isValid = false;
    }

    if (!emailInput?.value.trim()) {
        showValidationError(emailInput, "Email is required.");
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showValidationError(emailInput, "Please enter a valid email address.");
        isValid = false;
    }

    if (!telephoneInput?.value.trim()) {
        showValidationError(telephoneInput, "Telephone number is required.");
        isValid = false;
    } else if (!validatePhoneNumber(telephoneInput.value)) {
        showValidationError(telephoneInput, "Please enter a valid telephone number.");
        isValid = false;
    }

    if (!firstNameInput?.value.trim()) {
        showValidationError(firstNameInput, "First name is required.");
        isValid = false;
    }

    if (!lastNameInput?.value.trim()) {
        showValidationError(lastNameInput, "Last name is required.");
        isValid = false;
    }

    return isValid;
};

const showValidationError = (inputElement: HTMLInputElement | HTMLTextAreaElement, message: string): void => {
    if (inputElement) {
        const errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message");
        errorSpan.textContent = message;
        inputElement.parentNode?.appendChild(errorSpan);
    }
};

const clearValidationErrors = (): void => {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => error.remove());
};

const validateEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};

const validatePhoneNumber = (phone: string): boolean => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
};

const handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault();

    if (validateForm()) {
        const formData = {
            feedback: feedbackInput?.value ?? "",
            email: emailInput?.value ?? "",
            telephone: telephoneInput?.value ?? "",
            first_name: firstNameInput?.value ?? "",
            last_name: lastNameInput?.value ?? "",
            createdAt: new Date()
        };

        try {
            const docId = await saveFeedbackToFirestore(formData);
            feedbackForm?.reset();
            alert("Feedback submitted successfully!"); // Replaced toast with alert for success
        } catch (e) {
            console.error("Error submitting feedback: ", e);
            alert("There was an error submitting your feedback. Please try again."); // Replaced toast with alert for error
        }
    }
};

const handleReset = (): void => {
    clearValidationErrors();
};

document.addEventListener('DOMContentLoaded', () => {
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", handleSubmit);
    }

    if (resetButton) {
        resetButton.addEventListener("click", handleReset);
    }
});
