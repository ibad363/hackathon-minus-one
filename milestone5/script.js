"use strict";
// Get the main form and display area from HTML
const resumeForm = document.getElementById('resumeForm');
const resumeDisplay = document.getElementById('resume-display');
const editTip = document.getElementById('edit-tip');
// When someone submits the form, do this
resumeForm.addEventListener('submit', (e) => {
    var _a;
    e.preventDefault(); // Stop the page from refreshing
    // Get all the information user typed in the form
    const name = document.getElementById('name').value;
    const designation = document.getElementById('designation').value;
    const phone = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
    // If user didn't write an objective, use this default text
    const objective = document.getElementById('objective').value || "Motivated and adaptable professional seeking to make a positive impact within a forward-thinking organization. Committed to contributing to team success through hard work, attention to detail, and strong organizational abilities. Eager to embrace new opportunities for growth and continuously improve to meet and exceed company goals.";
    const languages = document.getElementById('languages').value;
    const skills = document.getElementById('skills').value;
    const address = document.getElementById('address').value;
    // Handle the profile picture
    const imageInput = document.getElementById('profile-image');
    const imageFile = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';
    // Get all education information
    const educationEntries = document.querySelectorAll('.education-entry');
    let educationHTML = '';
    // For each education entry, create HTML
    educationEntries.forEach(entry => {
        const degree = entry.querySelector('.degree').value;
        const institute = entry.querySelector('.institute').value;
        const year = entry.querySelector('.year').value;
        // Create a nice looking box for each education
        educationHTML += `
            <div class="each-education">
                <h4 contenteditable="true">${degree}</h4>
                <p contenteditable="true">${institute}</p>
                <div contenteditable="true">${year}</div>
            </div>
        `;
    });
    // Get all work experience information
    const experienceEntries = document.querySelectorAll('.experience-entry');
    let experienceHTML = '';
    // Check if user has any work experience
    let hasExperience = false;
    experienceEntries.forEach(entry => {
        const jobTitle = entry.querySelector('.job-title').value;
        const company = entry.querySelector('.company').value;
        const duration = entry.querySelector('.duration').value;
        // If any experience info is filled, create HTML for it
        if (jobTitle || company || duration) {
            hasExperience = true;
            experienceHTML += `
                <div class="each-experience">
                    <h4 contenteditable="true">${jobTitle} , ${company}</h4>
                    <p contenteditable="true">${duration}</p>
                </div>
            `;
        }
    });
    // If user has no experience, show them as "Fresher"
    if (!hasExperience) {
        experienceHTML = `
            <div class="each-experience">
                <h4 contenteditable="true">Fresher</h4>
            </div>
        `;
    }
    // Make skills look nice in a list
    // Each skill should be on a new line and can have a level (like "HTML - Expert")
    const skillsList = skills
        .split('\n') // Break into separate lines
        .filter(skill => skill.trim() !== '') // Remove empty lines
        .map(skill => {
        const [skillName, level] = skill.split('-').map(s => s.trim());
        return `<li>${skillName}${level ? ` - ${level}` : ''}</li>`;
    })
        .join('\n');
    // Make languages look nice in a list
    const languagesList = languages
        .split('\n')
        .filter(lang => lang.trim() !== '')
        .map(lang => {
        const [language, level] = lang.split('-').map(l => l.trim());
        return `<li>${language}${level ? ` - ${level}` : ''}</li>`;
    })
        .join('\n');
    // Create the final resume HTML with all information
    const resumeHTML = `
        <div class="heading">
            <div class="profile-pic-container" id="profile-pic-container">
                <img src="${imageUrl}" alt="profile-picture" id="resume-profile-pic">
                <div class="pic-overlay">Click to change photo</div>
            </div>
            <div class="name-section">
                <h1 contenteditable="true">${name}</h1>
                <h4 contenteditable="true">${designation}</h4>
            </div>
            <div id="design"></div>
        </div>

        <div class="content-section">
            <div class="sidebar">
                <div class="contact-details">
                    <h3>Contact Details</h3>
                    <div><i class="icons fa-solid fa-envelope"></i><a href="mailto:${email}" contenteditable="true">${email}</a></div>
                    <div><i class="icons fa-solid fa-phone"></i><span contenteditable="true">${phone}</span></div>
                    <div><i class="icons fa-solid fa-location-dot"></i><span contenteditable="true">${address}</span></div>
                </div>

                <div class="education">
                    <h3>Education</h3>
                    ${educationHTML}
                </div>

                <div class="experience">
                    <h3>Work Experience</h3>
                    ${experienceHTML}
                </div>
            </div>

            <div class="main-content">
                <div class="career-objective">
                    <h3>Career Objective</h3>
                    <p contenteditable="true">${objective}</p>
                </div>

                <div class="language">
                    <h3>Languages</h3>
                    <ul contenteditable="true">${languagesList}</ul>
                </div>

                <div class="skills">
                    <h3>Skills</h3>
                    <ul id="skillsList" contenteditable="true" style="display: block;">
                        ${skillsList}
                    </ul>
                </div>

                <div class="reference">
                    <h3>References</h3>
                    <p contenteditable="true">References Available upon request</p>
                </div>
            </div>
        </div>
    `;
    // Show the resume and hide the form
    resumeDisplay.innerHTML = resumeHTML;
    resumeForm.style.display = 'none';
    editTip.style.display = 'block';
    // Store the resume in localStorage
    localStorage.setItem(name, resumeHTML); // Store resume with name as key
    // Generate shareable link
    const shareableLink = `${window.location.origin}/index.html?name=${encodeURIComponent(name)}`;
    console.log("Shareable Link: ", shareableLink); // You can display this link to the user
    // After generating the resume, display the shareable link
    const shareLinkInput = document.getElementById('share-link');
    if (shareLinkInput) {
        shareLinkInput.value = shareableLink; // Set the shareable link in the input
    }
    const shareSection = document.getElementById('share-section');
    if (shareSection) {
        shareSection.style.display = 'block'; // Show the share section
    }
    // Add profile picture change functionality
    function setupProfilePicChange() {
        const picContainer = document.querySelector('.profile-pic-container');
        if (picContainer) {
            picContainer.addEventListener('click', function () {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.onchange = function (event) {
                    var _a;
                    const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (file) {
                        // Check file size (5MB limit)
                        if (file.size > 5000000) {
                            alert('File is too large. Please select an image under 5MB.');
                            return;
                        }
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            var _a;
                            const profilePic = document.getElementById('resume-profile-pic');
                            if (profilePic && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result)) {
                                profilePic.src = e.target.result;
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                };
                fileInput.click();
            });
        }
    }
    // Initialize all interactive features
    setupProfilePicChange();
});
// When "Add Education" button is clicked
const addEducationBtn = document.getElementById('add-education');
const educationContainer = document.getElementById('education-container');
addEducationBtn.addEventListener('click', () => {
    // Create new education input fields
    const newEducation = document.createElement('div');
    newEducation.className = 'education-entry';
    // Add HTML for degree, institute, and year inputs
    newEducation.innerHTML = `
        <div class="edu-grid">
            <div>
                <label for="degree">Degree/Certificate:</label>
                <input type="text" class="degree" placeholder="e.g. Bachelor in Computer Science" required>
            </div>
            
            <div>
                <label for="institute">Institute:</label>
                <input type="text" class="institute" placeholder="Institute Name" required>
            </div>
            
            <div>
                <label for="year">Year:</label>
                <input type="text" class="year" placeholder="e.g. 2020-2024" required>
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove Education</button>
    `;
    educationContainer.appendChild(newEducation);
});
// When "Add Experience" button is clicked
const addExperienceBtn = document.getElementById('add-experience');
const experienceContainer = document.getElementById('experience-container');
addExperienceBtn.addEventListener('click', () => {
    // Create new experience input fields
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-entry';
    // Add HTML for job title, company, and duration inputs
    newExperience.innerHTML = `
        <div class="exp-grid">
            <div>
                <label for="job-title">Job Title:</label>
                <input type="text" class="job-title" placeholder="e.g. Software Developer">
            </div>
            
            <div>
                <label for="company">Company:</label>
                <input type="text" class="company" placeholder="Company Name">
            </div>
            
            <div>
                <label for="duration">Duration:</label>
                <input type="text" class="duration" placeholder="e.g. 2020-2022">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove Experience</button>
    `;
    experienceContainer.appendChild(newExperience);
});
// Function to retrieve and display the resume from localStorage
function retrieveResume() {
    // Get the name parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
        // Retrieve the resume from localStorage using the name as key
        const resumeHTML = localStorage.getItem(name);
        if (resumeHTML) {
            // Display the retrieved resume
            const resumeDisplay = document.getElementById('resume-display');
            resumeDisplay.innerHTML = resumeHTML; // Set the inner HTML to the retrieved resume
            // Hide the form
            const resumeForm = document.getElementById('resumeForm');
            if (resumeForm) {
                resumeForm.style.display = 'none'; // Hide the form
            }
        }
        else {
            console.log("No resume found for this name.");
        }
    }
    else {
        console.log("No name parameter in the URL.");
    }
}
// Copy link functionality
const copyLinkButton = document.getElementById('copy-link');
copyLinkButton.addEventListener('click', () => {
    const shareLinkInput = document.getElementById('share-link');
    if (shareLinkInput) {
        shareLinkInput.select(); // Select the link
        document.execCommand('copy'); // Copy the link to clipboard
        copyLinkButton.textContent = 'Link Copied!'; // Change button text to "Link Copied!"
        // Remove the "Link Copied!" text after 2 seconds and revert back to "Copy Link"
        setTimeout(() => {
            copyLinkButton.textContent = 'Copy Link';
        }, 2000);
    }
});
// Call the function to retrieve the resume when the page loads
window.onload = retrieveResume;
// Function to download the resume as PDF or open print dialog
function downloadOrPrintResume() {
    const resumeDisplay = document.getElementById('resume-display'); // Get the resume display element
    if (resumeDisplay) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Download Resume</title>
                        <style>
                            body { margin: 0; font-family: Arial, sans-serif; }
                            /* Include your existing styles here */
                            /* Example styles */
                            .heading { text-align: center; }
                            .content-section { padding: 20px; }
                            /* Add any additional styles for the PDF here */
                        </style>
                    </head>
                    <body>${resumeDisplay.innerHTML}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print(); // Open print dialog
        }
    }
}
// Add event listener to the merged button
const downloadPrintButton = document.getElementById('download-print');
if (downloadPrintButton) {
    downloadPrintButton.addEventListener('click', downloadOrPrintResume);
}
