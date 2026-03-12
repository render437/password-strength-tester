document.getElementById('checkButton').addEventListener('click', checkPassword);

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    const resultsDiv = document.getElementById('results');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const timeToCrack = document.getElementById('timeToCrack');
    const passwordInfo = document.getElementById('passwordInfo');
    const recommendations = document.getElementById('recommendations');

    // Simulate a 1-2 second processing time
    resultsDiv.style.display = 'block'; // Show results container

    // Basic password strength check logic (can be expanded significantly)
    let strength = 'Weak';
    let strengthColor = 'red';
    let crackTime = 'A few seconds';
    let passwordRecs = "Consider adding a mix of uppercase and lowercase letters, numbers, and symbols.";

    if (password.length >= 8) {
        strength = 'Good/Moderate';
        strengthColor = 'orange';
        crackTime = 'A few minutes';
        passwordRecs = "Good start! To make it stronger, try incorporating a variety of character types (uppercase, lowercase, numbers, symbols).";

        if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            strength = 'Strong';
            strengthColor = 'green';
            crackTime = 'Several years';
            passwordRecs = "Excellent! This is a strong password. For even greater security, consider using a unique password for each important account.";
        } else if (password.length >= 12) {
            strength = 'Strong';
            strengthColor = 'green';
            crackTime = 'Decades to centuries';
            passwordRecs = "Excellent! This is a strong password. For even greater security, consider using a unique password for each important account.";
        }
    }

    if (password.length === 0) {
        strengthIndicator.textContent = 'Strength:';
        timeToCrack.textContent = '';
        passwordInfo.style.display = 'none';
        return;
    }

    strengthIndicator.textContent = `Strength: ${strength}`;
    strengthIndicator.style.color = strengthColor;
    timeToCrack.textContent = `Estimated time to crack: ${crackTime}`;

    // Simulate AI-generated info and recommendations (placeholder text for now)
    // In a real application, you might use a more sophisticated algorithm or an API here.
    let aiGeneratedInfo = "";
    if (password.includes("password")) {
        aiGeneratedInfo += " Avoid common words like 'password'. ";
    }
    if (password.length < 8) {
        aiGeneratedInfo += " Aim for at least 8 characters. ";
    }
    if (!/[A-Z]/.test(password)) {
        aiGeneratedInfo += " Include uppercase letters. ";
    }
    if (!/[a-z]/.test(password)) {
        aiGeneratedInfo += " Include lowercase letters. ";
    }
    if (!/[0-9]/.test(password)) {
        aiGeneratedInfo += " Include numbers. ";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        aiGeneratedInfo += " Include special characters. ";
    }

    if (aiGeneratedInfo === "") {
        aiGeneratedInfo = "Your password is very strong! Keep up the good work.";
    }

    recommendations.innerHTML = `<strong>Analysis:</strong> ${aiGeneratedInfo.trim()}<br><br><strong>Recommendations:</strong> ${passwordRecs}`;
    passwordInfo.style.display = 'block'; // Ensure the password info box is visible
}

// Optional: Add event listener for Enter key press in the input field
document.getElementById('passwordInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        checkPassword();
    }
});
