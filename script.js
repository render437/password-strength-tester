function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;
    const primaryResultsDiv = document.getElementById('result');
    const detailsTrigger = document.getElementById('detailsTrigger');
    const extendedDetailsBox = document.getElementById('extendedDetails');
    const resultsContainer = document.getElementById('resultsContainer');
    const checkButton = document.querySelector('button');

    // Clear previous results and styling
    primaryResultsDiv.innerHTML = '';
    primaryResultsDiv.style.borderColor = '#3498db'; // Reset to default color

    // Ensure extended details are hidden before processing new password
    if (!extendedDetailsBox.classList.contains('hidden')) {
        hidePasswordDetails(); // Reset state if details were open
    }

    if (!password) {
        primaryResultsDiv.textContent = "Please enter a password.";
        detailsTrigger.classList.add('hidden'); // Hide trigger if no password
        return;
    }

    // --- Simulate Loading ---
    checkButton.disabled = true;
    primaryResultsDiv.innerHTML = '<div class="loader"></div>';
    detailsTrigger.classList.add('hidden'); // Hide trigger during loading

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

        // Password length calculation
        let passwordLength = password.length;
        if (passwordLength >= 8) {
            strengthScore += 1;
            criteriaMet.length = true;
        }
        if (passwordLength >= 12) {
            strengthScore += 1;
        }

        // Character type checks
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
        if (strengthScore >= 8 && passwordLength >= 12) {
            strengthLabel = "Very Strong";
            borderColor = "#1abc9c"; // Teal
        }

        primaryResultsDiv.style.borderColor = borderColor;

        let strengthHtml = `Password Strength: <span>${strengthLabel}</span>`;

        // --- Simulated Cracking Time ---
        const charSetSize = 92; // Roughly: a-z (26) + A-Z (26) + 0-9 (10) + symbols (~30)
        // Adjusted attemptsPerSecond for a more impactful difference
        const attemptsPerSecond = Math.pow(10, 10); // ~10 billion attempts per second

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

        primaryResultsDiv.innerHTML = `${strengthHtml}<br><br>${timeHtml}`;

        // Show the trigger link and re-enable button
        detailsTrigger.classList.remove('hidden');
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

function showPasswordDetails() {
    const primaryResultsBox = document.getElementById('primaryResults');
    const extendedDetailsBox = document.getElementById('extendedDetails');
    const resultsContainer = document.getElementById('resultsContainer');

    populateDetailsContent(); // Fill the details first

    // Add class to animate the container to slide and expand
    resultsContainer.classList.add('show-details');
    extendedDetailsBox.classList.remove('hidden'); // Make details box visible

    // Adjust border radii for visual connection
    primaryResultsBox.style.borderTopRightRadius = '0';
    primaryResultsBox.style.borderBottomRightRadius = '0';
}

function hidePasswordDetails() {
    const primaryResultsBox = document.getElementById('primaryResults');
    const extendedDetailsBox = document.getElementById('extendedDetails');
    const resultsContainer = document.getElementById('resultsContainer');

    // Remove animation class
    resultsContainer.classList.remove('show-details');
    extendedDetailsBox.classList.add('hidden'); // Hide details box

    // Reset border-radius on the primary box
    primaryResultsBox.style.borderTopRightRadius = '';
    primaryResultsBox.style.borderBottomRightRadius = '';
}


function populateDetailsContent() {
    const detailsContentDiv = document.getElementById('detailsContent');
    const password = document.getElementById('passwordInput').value; // Get current password for context

    // Basic strength analysis for advice generation
    let strengthScore = 0;
    let criteriaMet = { length: false, lower: false, upper: false, number: false, symbol: false };
    let passwordLength = password.length;

    // Calculate strength score and criteria met
    if (passwordLength >= 8) { criteriaMet.length = true; strengthScore += 1; }
    if (passwordLength >= 12) { strengthScore += 1; }
    if (/[a-z]/.test(password)) { criteriaMet.lower = true; strengthScore += 1; }
    if (/[A-Z]/.test(password)) { criteriaMet.upper = true; strengthScore += 1; }
    if (/[0-9]/.test(password)) { criteriaMet.number = true; strengthScore += 1; }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) { criteriaMet.symbol = true; strengthScore += 1; }

    let advice = `
        <ul>
            <li><strong>Length:</strong> Aim for at least 12 characters. Longer passwords are significantly harder to guess.</li>
    `;

    // Add specific advice if criteria are not met
    if (!criteriaMet.lower) {
        advice += `<li><strong>Lowercase Letters:</strong> Include lowercase letters (a-z).</li>`;
    }
    if (!criteriaMet.upper) {
        advice += `<li><strong>Uppercase Letters:</strong> Include uppercase letters (A-Z).</li>`;
    }
    if (!criteriaMet.number) {
        advice += `<li><strong>Numbers:</strong> Add numbers (0-9).</li>`;
    }
    if (!criteriaMet.symbol) {
        advice += `<li><strong>Symbols:</strong> Use special characters (!@#$%^&*()_+ etc.).</li>`;
    }

    // General tips based on overall score and length
    if (strengthScore < 4 || passwordLength < 8) {
        advice += `<li>Consider using a mix of all character types and increasing the length for a much stronger password.</li>`;
    } else if (strengthScore < 6 || passwordLength < 12) {
        advice += `<li>You're doing well. Adding more characters and a wider variety of symbols will significantly increase strength.</li>`;
    } else if (strengthScore < 8) {
        advice += `<li>You have a strong password. Extending its length to 12+ characters makes it very strong.</li>`;
    } else {
        advice += `<li>Excellent password! Combining length, variety, and avoiding common patterns is key to top-tier security.</li>`;
    }

    advice += `
        <li><strong>Avoid common words or phrases:</strong> Don't use dictionary words, names, or easily guessable sequences.</li>
        <li><strong>Use unique passwords:</strong> Never reuse passwords across different accounts. Use a password manager if needed.</li>
        <li><strong>Consider a passphrase:</strong> A sentence-like password (e.g., "My_Favorite_Book_Is_Dune!1965") can be very strong and memorable.</li>
    </ul>
    `;

    detailsContentDiv.innerHTML = advice;
}
