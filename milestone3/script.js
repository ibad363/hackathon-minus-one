var _a;
// Get the main form and display area from HTML
var resumeForm = document.getElementById('resumeForm');
var resumeDisplay = document.getElementById('resume-display');
// When someone submits the form, do this
resumeForm.addEventListener('submit', function (e) {
    var _a;
    e.preventDefault(); // Stop the page from refreshing
    // Get all the information user typed in the form
    var name = document.getElementById('name').value;
    var designation = document.getElementById('designation').value;
    var phone = document.getElementById('phone-number').value;
    var email = document.getElementById('email').value;
    // If user didn't write an objective, use this default text
    var objective = document.getElementById('objective').value || "Motivated and adaptable professional seeking to make a positive impact within a forward-thinking organization. Committed to contributing to team success through hard work, attention to detail, and strong organizational abilities. Eager to embrace new opportunities for growth and continuously improve to meet and exceed company goals.";
    var languages = document.getElementById('languages').value;
    var skills = document.getElementById('skills').value;
    var address = document.getElementById('address').value;
    // Handle the profile picture
    var imageInput = document.getElementById('profile-image');
    var imageFile = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';
    // Get all education information
    var educationEntries = document.querySelectorAll('.education-entry');
    var educationHTML = '';
    // For each education entry, create HTML
    educationEntries.forEach(function (entry) {
        var degree = entry.querySelector('.degree').value;
        var institute = entry.querySelector('.institute').value;
        var year = entry.querySelector('.year').value;
        // Create a nice looking box for each education
        educationHTML += "\n            <div class=\"each-education\">\n                <h4>".concat(degree, "</h4>\n                <p>").concat(institute, "</p>\n                <div>").concat(year, "</div>\n            </div>\n        ");
    });
    // Get all work experience information
    var experienceEntries = document.querySelectorAll('.experience-entry');
    var experienceHTML = '';
    // Check if user has any work experience
    var hasExperience = false;
    experienceEntries.forEach(function (entry) {
        var jobTitle = entry.querySelector('.job-title').value;
        var company = entry.querySelector('.company').value;
        var duration = entry.querySelector('.duration').value;
        // If any experience info is filled, create HTML for it
        if (jobTitle || company || duration) {
            hasExperience = true;
            experienceHTML += "\n                <div class=\"each-experience\">\n                    <h4>".concat(jobTitle, " , ").concat(company, "</h4>\n                    <p>").concat(duration, "</p>\n                </div>\n            ");
        }
    });
    // If user has no experience, show them as "Fresher"
    if (!hasExperience) {
        experienceHTML = "\n            <div class=\"each-experience\">\n                <h4>Fresher</h4>\n            </div>\n        ";
    }
    // Make skills look nice in a list
    // Each skill should be on a new line and can have a level (like "HTML - Expert")
    var skillsList = skills
        .split('\n') // Break into separate lines
        .filter(function (skill) { return skill.trim() !== ''; }) // Remove empty lines
        .map(function (skill) {
        var _a = skill.split('-').map(function (s) { return s.trim(); }), skillName = _a[0], level = _a[1];
        return "<li>".concat(skillName).concat(level ? " - ".concat(level) : '', "</li>");
    })
        .join('\n');
    // Make languages look nice in a list
    var languagesList = languages
        .split('\n')
        .filter(function (lang) { return lang.trim() !== ''; })
        .map(function (lang) {
        var _a = lang.split('-').map(function (l) { return l.trim(); }), language = _a[0], level = _a[1];
        return "<li>".concat(language).concat(level ? " - ".concat(level) : '', "</li>");
    })
        .join('\n');
    // Create the final resume HTML with all information
    var resumeHTML = "\n        <div class=\"heading\">\n        <img src=\"".concat(imageUrl, "\" alt=\"profile-picture\">\n        <div class=\"name-section\">\n            <h1>").concat(name, "</h1>\n            <h4>").concat(designation, "</h4>\n        </div>\n        <div id=\"design\"></div>\n    </div>\n\n    <div class=\"content-section\">\n        <!-- Sidebar -->\n        <div class=\"sidebar\">\n            <div class=\"contact-details\">\n                <h3>Contact Details</h3>\n                <div><i class=\"icons fa-solid fa-envelope\"></i><a href=\"mailto:").concat(email, "\">").concat(email, "</a></div>\n                <div><i class=\"icons fa-solid fa-phone\"></i>").concat(phone, "</div>\n                <div><i class=\"icons fa-solid fa-location-dot\"></i>").concat(address, "</div>\n            </div>\n\n            <div class=\"education\">\n                <h3>Education</h3>\n                ").concat(educationHTML, "\n            </div>\n\n            <div class=\"experience\">\n                <h3>Work Experience</h3>\n                ").concat(experienceHTML, "\n            </div>\n        </div>\n\n        <!-- Main Content -->\n        <div class=\"main-content\">\n            <div class=\"career-objective\">\n                <h3>Career Objective</h3>\n                <p>").concat(objective, "</p>\n            </div>\n\n            <div class=\"language\">\n                <h3>Languages</h3>\n                <ul>").concat(languagesList, "</ul>\n            </div>\n\n            <div class=\"skills\">\n                <h3>Skills</h3>\n                <button id=\"toggleSkillButton\">Click to Hide Skills</button>\n                <ul id=\"skillsList\" style=\"display: block;\">\n                    ").concat(skillsList, "\n                </ul>\n            </div>\n\n            <div class=\"reference\">\n                <h3>References</h3>\n                <p>References Available upon request</p>\n            </div>\n        </div>\n    </div>\n    ");
    // Show the resume and hide the form
    resumeDisplay.innerHTML = resumeHTML;
    resumeForm.style.display = 'none';
    // Make the skills show/hide button work
    var ToggleButton = document.getElementById("toggleSkillButton");
    var SkillsListResume = document.getElementById("skillsList");
    ToggleButton.addEventListener("click", function () {
        // Toggle between showing and hiding skills
        if (SkillsListResume.style.display === "block") {
            SkillsListResume.style.display = "none";
            ToggleButton.textContent = 'Click to Show Skills';
        }
        else {
            SkillsListResume.style.display = "block";
            ToggleButton.textContent = "Click to Hide Skills";
        }
    });
});
// When "Add Education" button is clicked
var addEducationBtn = document.getElementById('add-education');
var educationContainer = document.getElementById('education-container');
addEducationBtn.addEventListener('click', function () {
    // Create new education input fields
    var newEducation = document.createElement('div');
    newEducation.className = 'education-entry';
    // Add HTML for degree, institute, and year inputs
    newEducation.innerHTML = "\n        <div class=\"edu-grid\">\n            <div>\n                <label for=\"degree\">Degree/Certificate:</label>\n                <input type=\"text\" class=\"degree\" placeholder=\"e.g. Bachelor in Computer Science\" required>\n            </div>\n            \n            <div>\n                <label for=\"institute\">Institute:</label>\n                <input type=\"text\" class=\"institute\" placeholder=\"Institute Name\" required>\n            </div>\n            \n            <div>\n                <label for=\"year\">Year:</label>\n                <input type=\"text\" class=\"year\" placeholder=\"e.g. 2020-2024\" required>\n            </div>\n        </div>\n        <button type=\"button\" class=\"remove-btn\" onclick=\"this.parentElement.remove()\">Remove Education</button>\n    ";
    educationContainer.appendChild(newEducation);
});
// When "Add Experience" button is clicked
var addExperienceBtn = document.getElementById('add-experience');
var experienceContainer = document.getElementById('experience-container');
addExperienceBtn.addEventListener('click', function () {
    // Create new experience input fields
    var newExperience = document.createElement('div');
    newExperience.className = 'experience-entry';
    // Add HTML for job title, company, and duration inputs
    newExperience.innerHTML = "\n        <div class=\"exp-grid\">\n            <div>\n                <label for=\"job-title\">Job Title:</label>\n                <input type=\"text\" class=\"job-title\" placeholder=\"e.g. Software Developer\">\n            </div>\n            \n            <div>\n                <label for=\"company\">Company:</label>\n                <input type=\"text\" class=\"company\" placeholder=\"Company Name\">\n            </div>\n            \n            <div>\n                <label for=\"duration\">Duration:</label>\n                <input type=\"text\" class=\"duration\" placeholder=\"e.g. 2020-2022\">\n            </div>\n        </div>\n        <button type=\"button\" class=\"remove-btn\" onclick=\"this.parentElement.remove()\">Remove Experience</button>\n    ";
    experienceContainer.appendChild(newExperience);
});
// When user selects a profile picture
(_a = document.getElementById('profile-image')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (e) {
    var _a;
    var preview = document.getElementById('image-preview');
    var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
    // If user selected a picture, show it in preview
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            if (preview && ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result)) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
});
