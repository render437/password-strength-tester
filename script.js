function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;
    const primaryResultsDiv = document.getElementById('result'); // Changed to primaryResultsDiv
    const detailsTrigger = document.getElementById('detailsTrigger');
    const extendedDetailsBox = document.getElementById('extendedDetails');
    const resultsContainer = document.getElementById('resultsContainer');
    const checkButton = document.querySelector('button');

    // Clear previous results and styling
    primaryResultsDiv.innerHTML = '';
    primaryResultsDiv.style.borderColor = '#3498db'; // Reset to default color

    // Hide extended details if visible
    if (!extendedDetailsBox.classList.contains('hidden')) {
        hidePasswordDetails(); // Ensure it's hidden before recalculating
    }

    if (!password) {
        primaryResultsDiv.textContent = "Please enter a password.";
        return;
    }

    // --- Simulate Loading ---
    checkButton.disabled = true;
    primaryResultsDiv.innerHTML = '<div class="loader"></div>';
    detailsTrigger.style.display = 'none'; // Hide trigger during loading

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

        primaryResultsDiv.style.borderColor = borderColor;

        let strengthHtml = `Password Strength: <span>${strengthLabel}</span>`;

        // --- Simulated Cracking Time ---
        const charSetSize = 92;
        const passwordLength = password.length;
        const attemptsPerSecond = Math.pow(10, 9);

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
        detailsTrigger.style.display = 'block'; // Show trigger again
        checkButton.disabled = false;

    }, 1500); // 1.5 seconds delay
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

    // Populate the details content dynamically
    populateDetailsContent();

    // Add class to trigger animation/layout shift
    resultsContainer.classList.add('show-details');

    // Make extended box visible
    extendedDetailsBox.classList.remove('hidden');

    // Adjust primary box to connect to extended box
    primaryResultsBox.style.borderTopRightRadius = '0';
    primaryResultsBox.style.borderBottomRightRadius = '0';
}

function hidePasswordDetails() {
    const primaryResultsBox = document.getElementById('primaryResults');
    const extendedDetailsBox = document.getElementById('extendedDetails');
    const resultsContainer = document.getElementById('resultsContainer');

    // Remove animation class
    resultsContainer.classList.remove('show-details');

    // Hide extended box
    extendedDetailsBox.classList.add('hidden');

    // Reset primary box border radius
    primaryResultsBox.style.borderTopRightRadius = '';
    primaryResultsBox.style.borderBottomRightRadius = '';

    // It might take a moment for the transition to finish before hiding,
    // so we can use a small timeout if we want to be absolutely sure
    // or just rely on CSS transitions. For now, no timeout needed.
}


function populateDetailsContent() {
    const detailsContentDiv = document.getElementById('detailsContent');
    const password = document.getElementById('passwordInput').value; // Get current password for context

    // Basic strength analysis for advice generation
    let strengthScore = 0;
    let criteriaMet = { length: false, lower: false, upper: false, number: false, symbol: false };

    if (password.length >= 8) { criteriaMet.length = true; strengthScore += 1; }
    if (password.length >= 12) { strengthScore += 1; }
    if (/[a-z]/.test(password)) { criteriaMet.lower = true; strengthScore += 1; }
    if (/[A-Z]/.test(password)) { criteriaMet.upper = true; strengthScore += 1; }
    if (/[0-9]/.test(password)) { criteriaMet.number = true; strengthScore += 1; }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) { criteriaMet.symbol = true; strengthScore += 1; }

    let advice = `
        <ul>
            <li><strong>Length:</strong> Aim for at least 12 characters. Longer passwords are much harder to guess.</li>
    `;

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

    // General tips based on score
    if (strengthScore < 4) {
        advice += `<li>Consider using a mix of all character types for a stronger password.</li>`;
    } else if (strengthScore < 6) {
        advice += `<li>You're doing well! Adding more characters and a wider variety of symbols will significantly increase strength.</li>`;
    } else if (strengthScore < 8 && password.length < 12) {
        advice += `<li>You have a strong password. Extending its length to 12+ characters would make it very strong.</li>`;
    } else {
        advice += `<li>Excellent password! Combining length, variety, and avoiding common patterns is key.</li>`;
    }

    advice += `
        <li><strong>Avoid common words or phrases:</strong> Don't use dictionary words, names, or easily guessable sequences.</li>
        <li><strong>Use unique passwords:</strong> Don't reuse passwords across different accounts.</li>
        <li><strong>Consider a passphrase:</strong> A sentence-like password (e.g., "My_Favorite_Book_Is_Dune!1965") can be very strong and memorable.</li>
    </ul>
    `;

    detailsContentDiv.innerHTML = advice;
}
