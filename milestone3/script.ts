// Get the main form and display area from HTML
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLElement;

// When someone submits the form, do this
resumeForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Stop the page from refreshing
    
    // Get all the information user typed in the form
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const designation = (document.getElementById('designation') as HTMLInputElement).value;
    const phone = (document.getElementById('phone-number') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    // If user didn't write an objective, use this default text
    const objective = (document.getElementById('objective') as HTMLTextAreaElement).value || "Motivated and adaptable professional seeking to make a positive impact within a forward-thinking organization. Committed to contributing to team success through hard work, attention to detail, and strong organizational abilities. Eager to embrace new opportunities for growth and continuously improve to meet and exceed company goals.";
    const languages = (document.getElementById('languages') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;

    
    // Handle the profile picture
    const imageInput = document.getElementById('profile-image') as HTMLInputElement;
    const imageFile = imageInput.files?.[0]; 
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

    // Get all education information
    const educationEntries = document.querySelectorAll('.education-entry');
    let educationHTML = '';
    
    // For each education entry, create HTML
    educationEntries.forEach(entry => {
        const degree = (entry.querySelector('.degree') as HTMLInputElement).value;
        const institute = (entry.querySelector('.institute') as HTMLInputElement).value;
        const year = (entry.querySelector('.year') as HTMLInputElement).value;
        
        // Create a nice looking box for each education
        educationHTML += `
            <div class="each-education">
                <h4>${degree}</h4>
                <p>${institute}</p>
                <div>${year}</div>
            </div>
        `;
    });

    // Get all work experience information
    const experienceEntries = document.querySelectorAll('.experience-entry');
    let experienceHTML = '';
    
    // Check if user has any work experience
    let hasExperience = false;
    experienceEntries.forEach(entry => {
        const jobTitle = (entry.querySelector('.job-title') as HTMLInputElement).value;
        const company = (entry.querySelector('.company') as HTMLInputElement).value;
        const duration = (entry.querySelector('.duration') as HTMLInputElement).value;
        
        // If any experience info is filled, create HTML for it
        if (jobTitle || company || duration) {
            hasExperience = true;
            experienceHTML += `
                <div class="each-experience">
                    <h4>${jobTitle} , ${company}</h4>
                    <p>${duration}</p>
                </div>
            `;
        }
    });

    // If user has no experience, show them as "Fresher"
    if (!hasExperience) {
        experienceHTML = `
            <div class="each-experience">
                <h4>Fresher</h4>
            </div>
        `;
    }

    // Make skills look nice in a list
    // Each skill should be on a new line and can have a level (like "HTML - Expert")
    const skillsList = skills
        .split('\n')  // Break into separate lines
        .filter(skill => skill.trim() !== '')  // Remove empty lines
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
        <img src="${imageUrl}" alt="profile-picture">
        <div class="name-section">
            <h1>${name}</h1>
            <h4>${designation}</h4>
        </div>
        <div id="design"></div>
    </div>

    <div class="content-section">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="contact-details">
                <h3>Contact Details</h3>
                <div><i class="icons fa-solid fa-envelope"></i><a href="mailto:${email}">${email}</a></div>
                <div><i class="icons fa-solid fa-phone"></i>${phone}</div>
                <div><i class="icons fa-solid fa-location-dot"></i>${address}</div>
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

        <!-- Main Content -->
        <div class="main-content">
            <div class="career-objective">
                <h3>Career Objective</h3>
                <p>${objective}</p>
            </div>

            <div class="language">
                <h3>Languages</h3>
                <ul>${languagesList}</ul>
            </div>

            <div class="skills">
                <h3>Skills</h3>
                <button id="toggleSkillButton">Click to Hide Skills</button>
                <ul id="skillsList" style="display: block;">
                    ${skillsList}
                </ul>
            </div>

            <div class="reference">
                <h3>References</h3>
                <p>References Available upon request</p>
            </div>
        </div>
    </div>
    `;

    // Show the resume and hide the form
    resumeDisplay.innerHTML = resumeHTML;
    resumeForm.style.display = 'none';

    // Make the skills show/hide button work
    const ToggleButton = document.getElementById("toggleSkillButton") as HTMLButtonElement;
    const SkillsListResume = document.getElementById("skillsList") as HTMLElement;

    ToggleButton.addEventListener("click", () => {
        // Toggle between showing and hiding skills
        if(SkillsListResume.style.display === "block"){
            SkillsListResume.style.display = "none";
            ToggleButton.textContent = 'Click to Show Skills';
        } else {
            SkillsListResume.style.display = "block";
            ToggleButton.textContent = "Click to Hide Skills";
        }
    });
});

// When "Add Education" button is clicked
const addEducationBtn = document.getElementById('add-education') as HTMLButtonElement;
const educationContainer = document.getElementById('education-container') as HTMLElement;

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
const addExperienceBtn = document.getElementById('add-experience') as HTMLButtonElement;
const experienceContainer = document.getElementById('experience-container') as HTMLElement;

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

// When user selects a profile picture
document.getElementById('profile-image')?.addEventListener('change', function(e) {
    const preview = document.getElementById('image-preview') as HTMLImageElement;
    const file = (e.target as HTMLInputElement).files?.[0];
    
    // If user selected a picture, show it in preview
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (preview && e.target?.result) {
                preview.src = e.target.result as string;
                preview.style.display = 'block';
            }
        }
        reader.readAsDataURL(file);
    }
});

