let participantCount = 1;

// Participant template function
function participantTemplate(count) {
    return `
        <section class="participant${count}">
            <h2>Participant ${count}</h2>
            <label for="name${count}">Name:</label>
            <input type="text" id="name${count}" name="name${count}" required>
            
            <label for="age${count}">Age:</label>
            <input type="number" id="age${count}" name="age${count}" required min="8" max="18">
            
            <fieldset class="activities">
                <legend>Activities</legend>
                <div class="radio-group">
                    <input type="radio" id="basic${count}" name="track${count}" value="basic" checked>
                    <label for="basic${count}">Basic Camp ($50)</label>
                    
                    <input type="radio" id="advanced${count}" name="track${count}" value="advanced">
                    <label for="advanced${count}">Advanced Camp ($75)</label>
                </div>
            </fieldset>
            
            <label for="fee${count}">Registration Fee:</label>
            <input type="number" id="fee${count}" name="fee${count}" readonly value="50">
        </section>
    `;
}

// Success message template
function successTemplate(info) {
    return `
        Thank you ${info.name} for registering. 
        You have registered ${info.participants} participant${info.participants > 1 ? 's' : ''} 
        and owe $${info.fees} in Fees.
    `;
}

// Calculate total fees
function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements];
    return feeElements.reduce((total, element) => {
        return total + Number(element.value);
    }, 0);
}

// Add event listener for the Add Participant button
document.getElementById('addParticipant').addEventListener('click', () => {
    participantCount++;
    const button = document.getElementById('addParticipant');
    button.insertAdjacentHTML('beforebegin', participantTemplate(participantCount));
    
    // Add event listeners for the new radio buttons
    setupRadioListeners(participantCount);
});

// Setup radio button listeners for fee updates
function setupRadioListeners(count) {
    const basicRadio = document.getElementById(`basic${count}`);
    const advancedRadio = document.getElementById(`advanced${count}`);
    const feeInput = document.getElementById(`fee${count}`);

    basicRadio.addEventListener('change', () => {
        feeInput.value = 50;
    });

    advancedRadio.addEventListener('change', () => {
        feeInput.value = 75;
    });
}

// Setup initial radio button listeners
setupRadioListeners(1);

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = document.getElementById('registrationForm');
    const summary = document.getElementById('summary');
    const adultName = document.getElementById('adult-name').value;
    const fees = totalFees();
    
    // Create and display summary
    summary.innerHTML = successTemplate({
        name: adultName,
        participants: participantCount,
        fees: fees
    });
    
    // Hide form and show summary
    form.classList.add('hide');
    summary.classList.remove('hide');
});