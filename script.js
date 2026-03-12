function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;
    const resultDiv = document.getElementById('result');
    const checkButton = document.querySelector('button');
    const eyeIcon = document.getElementById('eyeIcon'); // Get the eye icon element

    // Clear previous results and styling
    resultDiv.innerHTML = '';
    resultDiv.style.borderColor = '#3498db'; // Reset to default color

    if (!password) {
        resultDiv.textContent = "Please enter a password.";
        return;
    }

    // --- Simulate Loading ---
    checkButton.disabled = true; // Disable button during loading
    resultDiv.innerHTML = '<div class="loader"></div>'; // Show loader

    setTimeout(() => {
        // --- Password Strength Assessment ---
        let strengthScore = 0;
        let criteriaMet = {
            length: false,
            lower: false,
            upper: false,
            number: false,
            symbol: false
        };

        if (password.length >= 8) {
            strengthScore += 1;
            criteriaMet.length = true;
        }
        if (password.length >= 12) {
            strengthScore += 1;
        }

        if (/[a-z]/.test(password)) {
            strengthScore += 1;
            criteriaMet.lower = true;
        }
        if (/[A-Z]/.test(password)) {
            strengthScore += 1;
            criteriaMet.upper = true;
        }
        if (/[0-9]/.test(password)) {
            strengthScore += 1;
            criteriaMet.number = true;
        }
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            strengthScore += 1;
            criteriaMet.symbol = true;
        }

        let strengthLabel = "Weak";
        let borderColor = "#e74c3c"; // Red

        if (strengthScore >= 4) {
            strengthLabel = "Good/Moderate";
            borderColor = "#f39c12"; // Orange
        }
        if (strengthScore >= 6) {
            strengthLabel = "Strong";
            borderColor = "#2ecc71"; // Green
        }
        if (strengthScore >= 8 && password.length >= 12) {
            strengthLabel = "Very Strong";
            borderColor = "#1abc9c"; // Teal
        }

        resultDiv.style.borderColor = borderColor;

        let strengthHtml = `Password Strength: <span>${strengthLabel}</span>`;

        // --- Simulated Cracking Time ---
        const charSetSize = 92; // Roughly: a-z (26) + A-Z (26) + 0-9 (10) + symbols (~30)
        const passwordLength = password.length;
        const attemptsPerSecond = Math.pow(10, 9); // Increased by 10x, still a rough estimate

        let crackingTimeDisplay = "Instant";
        let timeInSeconds = 0;

        if (passwordLength > 0) {
             const theoreticalAttempts = Math.pow(charSetSize, passwordLength);
             timeInSeconds = theoreticalAttempts / attemptsPerSecond;

             if (timeInSeconds < 1) {
                 crackingTimeDisplay = "Less than a second";
             } else if (timeInSeconds < 60) {
                 crackingTimeDisplay = `${timeInSeconds.toFixed(2)} seconds`;
             } else if (timeInSeconds < 3600) {
                 crackingTimeDisplay = `${(timeInSeconds / 60).toFixed(2)} minutes`;
             } else if (timeInSeconds < 86400) {
                 crackingTimeDisplay = `${(timeInSeconds / 3600).toFixed(2)} hours`;
             } else if (timeInSeconds < 31536000) {
                 crackingTimeDisplay = `${(timeInSeconds / 86400).toFixed(2)} days`;
             } else {
                 crackingTimeDisplay = `${(timeInSeconds / 31536000).toFixed(2)} years`;
             }
        }

        let timeHtml = `Simulated Cracking Time: <span>${crackingTimeDisplay}</span>`;

        resultDiv.innerHTML = `${strengthHtml}<br><br>${timeHtml}`;

        checkButton.disabled = false;

    }, 1500); // 1.5 seconds delay for the loading effect
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}
