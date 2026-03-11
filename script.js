function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;
    const resultDiv = document.getElementById('result');

    // Clear previous results and styling
    resultDiv.innerHTML = '';
    resultDiv.style.borderColor = '#3498db'; // Default color

    if (!password) {
        resultDiv.textContent = "Please enter a password.";
        return;
    }

    // --- Password Strength Assessment ---
    // This is a common set of criteria, but can be expanded.
    let strengthScore = 0;
    let criteriaMet = {
        length: false,
        lower: false,
        upper: false,
        number: false,
        symbol: false
    };

    // Length
    if (password.length >= 8) {
        strengthScore += 1;
        criteriaMet.length = true;
    }
    if (password.length >= 12) {
        strengthScore += 1;
    }

    // Character types
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
    // Common symbols
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
    resultDiv.innerHTML = `Password Strength: <span>${strengthLabel}</span>`;


    // --- Simulated Cracking Time ---
    // This is a HIGHLY simplified simulation. Real-world password cracking
    // depends on many factors (hardware, algorithms, dictionary attacks, etc.).
    // This simulation is purely for illustrative purposes based on entropy.
    // We'll estimate the number of possible characters and assume a brute-force attack.

    const charSetSize = 92; // Roughly: a-z (26) + A-Z (26) + 0-9 (10) + symbols (~30)
    const passwordLength = password.length;

    // Calculate theoretical entropy (bits)
    const entropyBits = passwordLength * Math.log2(charSetSize);

    // Estimate attempts needed for brute force (simplistic)
    // Assume 10^10 attempts per second (very rough estimate of computational power)
    const attemptsPerSecond = Math.pow(10, 10);
    const theoreticalAttempts = Math.pow(charSetSize, passwordLength);

    let crackingTimeDisplay = "Instant"; // For very short/simple passwords
    let timeInSeconds = 0;

    if (theoreticalAttempts > 1) {
        timeInSeconds = theoreticalAttempts / attemptsPerSecond;

        if (timeInSeconds < 1) {
            crackingTimeDisplay = "Less than a second";
        } else if (timeInSeconds < 60) {
            crackingTimeDisplay = `${timeInSeconds.toFixed(2)} seconds`;
        } else if (timeInSeconds < 3600) { // Hours
            crackingTimeDisplay = `${(timeInSeconds / 60).toFixed(2)} minutes`;
        } else if (timeInSeconds < 86400) { // Days
            crackingTimeDisplay = `${(timeInSeconds / 3600).toFixed(2)} hours`;
        } else if (timeInSeconds < 31536000) { // Years
            crackingTimeDisplay = `${(timeInSeconds / 86400).toFixed(2)} days`;
        } else {
            crackingTimeDisplay = `${(timeInSeconds / 31536000).toFixed(2)} years`;
        }
    }

    resultDiv.innerHTML += `<br>Simulated Cracking Time: <span>${crackingTimeDisplay}</span>`;
}
