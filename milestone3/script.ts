// Get the form element
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLElement;

resumeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get all form values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const designation = (document.getElementById('designation') as HTMLInputElement).value;
    const phone = (document.getElementById('phone-number') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const objective = (document.getElementById('objective') as HTMLTextAreaElement).value || "Motivated and adaptable professional seeking to make a positive impact within a forward-thinking organization. Committed to contributing to team success through hard work, attention to detail, and strong organizational abilities. Eager to embrace new opportunities for growth and continuously improve to meet and exceed company goals.";
    const languages = (document.getElementById('languages') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;

    
    // Get profile image
    const imageInput = document.getElementById('profile-image') as HTMLInputElement;
    const imageFile = imageInput.files?.[0];
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

    // Get education entries
    const educationEntries = document.querySelectorAll('.education-entry');
    let educationHTML = '';
    
    educationEntries.forEach(entry => {
        const degree = (entry.querySelector('.degree') as HTMLInputElement).value;
        const institute = (entry.querySelector('.institute') as HTMLInputElement).value;
        const year = (entry.querySelector('.year') as HTMLInputElement).value;
        
        educationHTML += `
            <div class="each-education">
                <h4>${degree}</h4>
                <p>${institute}</p>
                <div>${year}</div>
            </div>
        `;
    });

    // Get experience entries
    const experienceEntries = document.querySelectorAll('.experience-entry');
    let experienceHTML = '';
    
    // Check if any experience is entered
    let hasExperience = false;
    experienceEntries.forEach(entry => {
        const jobTitle = (entry.querySelector('.job-title') as HTMLInputElement).value;
        const company = (entry.querySelector('.company') as HTMLInputElement).value;
        const duration = (entry.querySelector('.duration') as HTMLInputElement).value;
        
        // Check if any of the fields are filled
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

    // If no experience is entered, show "Fresher"
    if (!hasExperience) {
        experienceHTML = `
            <div class="each-experience">
                <h4>Fresher</h4>
            </div>
        `;
    }

    // Generate skills list with proper formatting
    const skillsList = skills
        .split('\n')  // Split by new line instead of comma
        .filter(skill => skill.trim() !== '')  // Remove empty lines
        .map(skill => {
            const [skillName, level] = skill.split('-').map(s => s.trim());
            return `<li>${skillName}${level ? ` - ${level}` : ''}</li>`;
        })
        .join('\n');  // Join with newline

    // Generate languages list with proper formatting
    const languagesList = languages
        .split('\n')  // Split by new line instead of comma
        .filter(lang => lang.trim() !== '')  // Remove empty lines
        .map(lang => {
            const [language, level] = lang.split('-').map(l => l.trim());
            return `<li>${language}${level ? ` - ${level}` : ''}</li>`;
        })
        .join('\n');  // Join with newline

    // Generate resume HTML
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

    // Display the resume
    resumeDisplay.innerHTML = resumeHTML;
    resumeForm.style.display = 'none';

    // Reinitialize toggle button functionality
    const newToggleButton = document.getElementById("toggleSkillButton") as HTMLButtonElement;
    const newSkillsList = document.getElementById("skillsList") as HTMLElement;

    newToggleButton.addEventListener("click", () => {
        if(newSkillsList.style.display === "block"){
            newSkillsList.style.display = "none";
            newToggleButton.textContent = 'Click to Show Skills';
        } else {
            newSkillsList.style.display = "block";
            newToggleButton.textContent = "Click to Hide Skills";
        }
    });
});

// Add Education Button Functionality with Remove Button
const addEducationBtn = document.getElementById('add-education') as HTMLButtonElement;
const educationContainer = document.getElementById('education-container') as HTMLElement;

addEducationBtn.addEventListener('click', () => {
    const newEducation = document.createElement('div');
    newEducation.className = 'education-entry';
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

// Add Experience Button Functionality with Remove Button
const addExperienceBtn = document.getElementById('add-experience') as HTMLButtonElement;
const experienceContainer = document.getElementById('experience-container') as HTMLElement;

addExperienceBtn.addEventListener('click', () => {
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-entry';
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


document.getElementById('profile-image')?.addEventListener('change', function(e) {
    const preview = document.getElementById('image-preview') as HTMLImageElement;
    const file = (e.target as HTMLInputElement).files?.[0];
    
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

