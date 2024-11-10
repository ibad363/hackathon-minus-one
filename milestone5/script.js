"use strict";
// Check for shared resume data on page load
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    if (encodedData) {
        const resumeData = JSON.parse(atob(encodedData));
        // Fill form fields with shared data
        document.getElementById('name').value = resumeData.name;
        document.getElementById('designation').value = resumeData.designation;
        document.getElementById('phone-number').value = resumeData.phone;
        document.getElementById('email').value = resumeData.email;
        document.getElementById('objective').value = resumeData.objective;
        document.getElementById('languages').value = resumeData.languages;
        document.getElementById('skills').value = resumeData.skills;
        document.getElementById('address').value = resumeData.address;
        // Auto-submit form to generate resume
        resumeForm.dispatchEvent(new Event('submit'));
    }
});
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
                    <ul id="skillsList" contenteditable="true">
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
    // Generate and show shareable link
    const shareSection = document.getElementById('share-section');
    shareSection.style.display = 'block';
    // Create shareable link
    const resumeData = {
        name,
        designation,
        phone,
        email,
        objective,
        languages,
        skills,
        address,
        education: [...Array.prototype.slice.call(educationEntries)].map(entry => {
            var _a, _b, _c;
            return ({
                degree: ((_a = entry.querySelector('.degree')) === null || _a === void 0 ? void 0 : _a.value) || '',
                institute: ((_b = entry.querySelector('.institute')) === null || _b === void 0 ? void 0 : _b.value) || '',
                year: ((_c = entry.querySelector('.year')) === null || _c === void 0 ? void 0 : _c.value) || ''
            });
        }),
        experience: [...Array.prototype.slice.call(experienceEntries)].map(entry => {
            var _a, _b, _c;
            return ({
                jobTitle: ((_a = entry.querySelector('.job-title')) === null || _a === void 0 ? void 0 : _a.value) || '',
                company: ((_b = entry.querySelector('.company')) === null || _b === void 0 ? void 0 : _b.value) || '',
                duration: ((_c = entry.querySelector('.duration')) === null || _c === void 0 ? void 0 : _c.value) || ''
            });
        })
    };
    const encodedData = btoa(JSON.stringify(resumeData));
    const shareableLink = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
    const shareLinkInput = document.getElementById('share-link');
    shareLinkInput.value = shareableLink;
    // Copy link button functionality
    const copyButton = document.getElementById('copy-link');
    copyButton.addEventListener('click', () => {
        shareLinkInput.select();
        document.execCommand('copy');
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy Link';
        }, 2000);
    });
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
                <input type="text" class="duration" placeholder=x"e.g. 2020-2022">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove Experience</button>
    `;
    experienceContainer.appendChild(newExperience);
});
// Add this before downloadResume function
const opt = {
    margin: 0, // Minimum margins
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: {
        scale: 1.5,
        useCORS: true,
        letterRendering: true
    },
    jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true,
        hotfixes: ["px_scaling"]
    },
    pagebreak: { mode: ['avoid-all'] }
};
// Add this function before downloadResume
const optimizeForPDF = (element) => {
    // Overall resume display scaling
    element.style.margin = '0';
    element.style.padding = '0';
    element.style.maxHeight = '297mm'; // A4 height
    element.style.width = '210mm'; // A4 width
    element.style.overflow = 'visible';
    element.style.transform = 'none';
    element.style.transformOrigin = 'top left';
    // Optimize heading section
    const headingSection = element.querySelector('.heading');
    if (headingSection) {
        headingSection.style.padding = '15px 0';
        headingSection.style.gridTemplateColumns = '200px 1fr';
        // Profile picture optimization
        const profilePic = headingSection.querySelector('img');
        if (profilePic) {
            profilePic.style.width = '120px';
            profilePic.style.height = '120px';
        }
        // Name section optimization
        const nameSection = headingSection.querySelector('.name-section');
        if (nameSection) {
            const h1 = nameSection.querySelector('h1');
            const h4 = nameSection.querySelector('h4');
            if (h1)
                h1.style.fontSize = '24px';
            if (h4)
                h4.style.fontSize = '16px';
        }
        // Design element adjustment
        const design = headingSection.querySelector('#design');
        if (design) {
            design.style.position = 'absolute';
            design.style.bottom = '-39px';
            design.style.width = '200px';
            design.style.height = '40px';
            design.style.left = '0';
            design.style.zIndex = '1';
            // Create triangle using SVG with exact measurements
            const svgTriangle = `
                <svg width="200" height="40" viewBox="0 0 200 40" style="position: absolute; top: 0; left: 0;">
                    <defs>
                        <clipPath id="triangleClip">
                            <path d="M0,0 L200,0 L100,40 L0,0 Z"/>
                        </clipPath>
                    </defs>
                    <rect width="200" height="40" fill="#284b63" clip-path="url(#triangleClip)"/>
                </svg>
            `;
            design.innerHTML = svgTriangle;
            // Remove any background color from the container
            design.style.backgroundColor = 'transparent';
        }
    }
    // Content section optimization
    const contentSection = element.querySelector('.content-section');
    if (contentSection) {
        contentSection.style.display = 'grid';
        contentSection.style.gridTemplateColumns = '200px 1fr';
        contentSection.style.gap = '0';
        contentSection.style.paddingBottom = '20px'; // Reduce bottom padding
        // Sidebar optimization
        const sidebar = contentSection.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.padding = '60px 15px 20px 15px';
            sidebar.style.fontSize = '12px';
            sidebar.style.backgroundColor = '#f0f5f9';
            sidebar.style.minHeight = '100%';
            // Adjust sidebar headings
            const h3Elements = sidebar.querySelectorAll('h3');
            h3Elements.forEach(h3 => {
                h3.style.fontSize = '18px';
                h3.style.marginBottom = '8px';
            });
            // Adjust educations headings
            const educationSection = sidebar.querySelector('.education');
            if (educationSection) {
                const h4Elements = educationSection.querySelectorAll('h4');
                h4Elements.forEach(h4 => {
                    h4.style.fontSize = '14px';
                    h4.style.marginBottom = '4px';
                    h4.style.fontWeight = '600';
                    h4.style.color = '#333';
                });
            }
        }
        // Main content optimization
        const mainContent = contentSection.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.padding = '40px 15px 20px 15px';
            mainContent.style.fontSize = '12px';
            mainContent.style.backgroundColor = '#b4c4cc';
            // Adjust main content headings
            const h3Elements = mainContent.querySelectorAll('h3');
            h3Elements.forEach(h3 => {
                h3.style.fontSize = '16px';
                h3.style.marginBottom = '2px';
            });
            const paragraphs = mainContent.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.fontSize = '12px';
                p.style.lineHeight = '1.4';
                p.style.margin = '0 0 2px 0';
            });
            // Adjust lists spacing
            const lists = mainContent.querySelectorAll('ul');
            lists.forEach(ul => {
                const items = ul.querySelectorAll('li');
                items.forEach(li => {
                    li.style.margin = '8px 0';
                    li.style.fontSize = '12px';
                });
            });
        }
    }
};
// Update the download function
const downloadResume = async () => {
    const resumeElement = document.getElementById('resume-display');
    const editTip = document.getElementById('edit-tip');
    const shareSection = document.getElementById('share-section');
    if (!resumeElement)
        return;
    // Hide buttons, edit tip and share section and save original styles
    const buttons = resumeElement.querySelectorAll('button');
    const originalStyles = new Map();
    // Hide edit tip and share section
    if (editTip)
        editTip.style.display = 'none';
    if (shareSection)
        shareSection.style.display = 'none';
    buttons.forEach(button => {
        originalStyles.set(button, button.style.display);
        button.style.display = 'none';
    });
    try {
        // Save original styles
        const originalFontSize = resumeElement.style.fontSize;
        const originalTransform = resumeElement.style.transform;
        // Optimize for PDF
        optimizeForPDF(resumeElement);
        // Scale down if needed
        const contentHeight = resumeElement.getBoundingClientRect().height;
        if (contentHeight > 1000) {
            resumeElement.style.transform = 'scale(0.9)';
            resumeElement.style.transformOrigin = 'top left';
        }
        // Generate PDF
        await html2pdf()
            .from(resumeElement)
            .set(opt)
            .save();
        // Restore original styles
        resumeElement.style.fontSize = originalFontSize;
        resumeElement.style.transform = originalTransform;
        buttons.forEach(button => {
            button.style.display = originalStyles.get(button);
        });
        // Show edit tip and share section again
        // if (editTip) editTip.style.display = 'block';
        // if (shareSection) shareSection.style.display = 'block';
    }
    catch (error) {
        console.error('PDF generation failed:', error);
        alert('Failed to generate PDF. Please try again.');
        // Restore all elements in case of error
        buttons.forEach(button => {
            button.style.display = originalStyles.get(button);
        });
        if (editTip)
            editTip.style.display = 'block';
        if (shareSection)
            shareSection.style.display = 'block';
    }
};
// Add event listener for download button
const downloadPdfButton = document.getElementById('download-pdf');
if (downloadPdfButton) {
    downloadPdfButton.addEventListener('click', downloadResume);
}
// Add preview button functionality
const printPdf = document.getElementById('print-pdf');
if (printPdf) {
    printPdf.addEventListener('click', async () => {
        const resumeElement = document.getElementById('resume-display');
        if (!resumeElement)
            return;
        // Create print-specific stylesheet
        const style = document.createElement('style');
        style.id = 'print-styles';
        style.textContent = `
            @media print {
                @page {
                    size: A4;
                    margin: 0;
                }
                html, body {
                width: 210mm;
                height: 297mm;
                margin: 0 !important;
                padding: 0 !important;
                }
                body * {
                    visibility: hidden;
                }
                #resume-display, #resume-display * {
                    visibility: visible;
                }
                #resume-display {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 210mm;
                    height: 297mm;
                    margin: 0;
                    padding: 0;
                    display: flex !important;
                    flex-direction: column !important;
                    page-break-after: avoid;
                    page-break-before: avoid;
                }

                header, footer {
                    display: none !important;
                }


                .heading {
                    padding: 15px 0 !important;
                    background-color: #284b63 !important;
                    color: white !important; 
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                    width: 100% !important;
                    margin: 0 !important;
                    position: relative !important;
                }
                .profile-pic-container img {
                    width: 120px !important;
                    height: 120px !important;
                }
                .content-section {
                    display: grid !important;
                    grid-template-columns: 200px 1fr !important;
                    width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    gap: 0 !important;
                    border: none !important;
                }
                .sidebar {
                    padding: 60px 15px 20px 15px !important;
                    font-size: 12px !important;
                    background-color: #f0f5f9 !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    margin: 0 !important;
                    border: none !important;
                    height: 100% !important;
                }
                .main-content {
                    padding: 40px 15px 20px 15px !important;
                    font-size: 12px !important;
                    background-color: #b4c4cc !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    margin: 0 !important;
                    border: none !important;
                    height: 100% !important;
                }
                button, .remove-btn {
                    display: none !important;
                }
            }
        `;
        try {
            // Add print styles
            document.head.appendChild(style);
            // Apply optimization
            optimizeForPDF(resumeElement);
            // Open print dialog
            window.print();
        }
        catch (error) {
            console.error('Print failed:', error);
            alert('Printing failed. Please try again.');
        }
        finally {
            // Remove print styles
            const printStyle = document.getElementById('print-styles');
            if (printStyle) {
                printStyle.remove();
            }
        }
    });
}
