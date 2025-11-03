// Global variables
const navLinks = document.querySelectorAll('nav a[data-section]');
const sections = document.querySelectorAll('section');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

// Exam data for modals
const examData = {
    neet: {
        title: "NEET - National Eligibility cum Entrance Test",
        prerequisites: [
            "Must have passed 10+2 or equivalent with Physics, Chemistry, Biology/Biotechnology",
            "Minimum 50% marks in PCB for General category (40% for reserved categories)",
            "Minimum age: 17 years as of December 31 of admission year",
            "Maximum attempts: No limit (as per latest guidelines)"
        ],
        career: [
            "MBBS in government and private medical colleges",
            "BDS (Bachelor of Dental Surgery)",
            "BAMS (Bachelor of Ayurvedic Medicine and Surgery)",
            "BHMS (Bachelor of Homeopathic Medicine and Surgery)",
            "Other medical and paramedical courses"
        ],
        cutoffs: `
            <table class="cutoff-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Cutoff Percentile</th>
                        <th>Marks Range (2023)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>General</td>
                        <td>50th Percentile</td>
                        <td>720-137</td>
                    </tr>
                    <tr>
                        <td>OBC</td>
                        <td>40th Percentile</td>
                        <td>136-107</td>
                    </tr>
                    <tr>
                        <td>SC</td>
                        <td>40th Percentile</td>
                        <td>136-107</td>
                    </tr>
                    <tr>
                        <td>ST</td>
                        <td>40th Percentile</td>
                        <td>136-107</td>
                    </tr>
                    <tr>
                        <td class="highlight">General-PwD</td>
                        <td class="highlight">45th Percentile</td>
                        <td class="highlight">136-121</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    upsc: {
        title: "UPSC - Civil Services Examination",
        prerequisites: [
            "Bachelor's degree in any discipline from a recognized university",
            "Age: 21-32 years (relaxation for reserved categories)",
            "Indian citizenship",
            "Maximum attempts: 6 for General, 9 for OBC, unlimited for SC/ST"
        ],
        career: [
            "Indian Administrative Service (IAS)",
            "Indian Police Service (IPS)",
            "Indian Foreign Service (IFS)",
            "Indian Revenue Service (IRS)",
            "Other Group A and Group B central services"
        ],
        cutoffs: `
            <table class="cutoff-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Prelims Cutoff</th>
                        <th>Mains Cutoff</th>
                        <th>Final Cutoff (2022)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>General</td>
                        <td>88.22</td>
                        <td>745</td>
                        <td>960</td>
                    </tr>
                    <tr>
                        <td>OBC</td>
                        <td>87.54</td>
                        <td>707</td>
                        <td>925</td>
                    </tr>
                    <tr>
                        <td>SC</td>
                        <td>74.08</td>
                        <td>700</td>
                        <td>890</td>
                    </tr>
                    <tr>
                        <td>ST</td>
                        <td>69.35</td>
                        <td>700</td>
                        <td>890</td>
                    </tr>
                    <tr>
                        <td class="highlight">EWS</td>
                        <td class="highlight">82.83</td>
                        <td class="highlight">745</td>
                        <td class="highlight">960</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    jee: {
        title: "JEE - Joint Entrance Examination",
        prerequisites: [
            "Must have passed 10+2 or equivalent with Physics, Chemistry, Mathematics",
            "Minimum 75% marks in 12th (65% for SC/ST) or be in top 20 percentile",
            "Maximum attempts: 2 consecutive years for JEE Advanced",
            "Age limit: For JEE Advanced, born on or after October 1, 1997 (relaxation for reserved categories)"
        ],
        career: [
            "B.Tech in IITs, NITs, IIITs, and other GFTIs",
            "B.Arch in top architecture colleges",
            "B.Planning in specialized institutions",
            "Dual degree programs (B.Tech + M.Tech)",
            "Integrated M.Tech programs"
        ],
        cutoffs: `
            <table class="cutoff-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>JEE Main Cutoff</th>
                        <th>Top IIT Cutoff (JEE Advanced)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>General</td>
                        <td>90.77 percentile</td>
                        <td>Rank 1-2500</td>
                    </tr>
                    <tr>
                        <td>OBC</td>
                        <td>73.61 percentile</td>
                        <td>Rank 2501-9000</td>
                    </tr>
                    <tr>
                        <td>SC</td>
                        <td>51.97 percentile</td>
                        <td>Rank 9001-15000</td>
                    </tr>
                    <tr>
                        <td>ST</td>
                        <td>37.23 percentile</td>
                        <td>Rank 15001-27000</td>
                    </tr>
                    <tr>
                        <td class="highlight">General-EWS</td>
                        <td class="highlight">75.62 percentile</td>
                        <td class="highlight">Rank 2501-5000</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    mpsc: {
        title: "MPSC - Maharashtra Public Service Commission",
        prerequisites: [
            "Bachelor's degree from a recognized university",
            "Age: 19-38 years (relaxation for reserved categories)",
            "Must be a domicile of Maharashtra",
            "Knowledge of Marathi language required"
        ],
        career: [
            "Maharashtra Administrative Service (MAS)",
            "Police Sub-Inspector",
            "Sales Tax Inspector",
            "Block Development Officer",
            "Various Group B services in Maharashtra government"
        ],
        cutoffs: `
            <table class="cutoff-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Prelims Cutoff (2022)</th>
                        <th>Mains Cutoff (2022)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>General</td>
                        <td>105-110</td>
                        <td>720-750</td>
                    </tr>
                    <tr>
                        <td>OBC</td>
                        <td>95-100</td>
                        <td>680-710</td>
                    </tr>
                    <tr>
                        <td>SC</td>
                        <td>85-90</td>
                        <td>640-670</td>
                    </tr>
                    <tr>
                        <td>ST</td>
                        <td>80-85</td>
                        <td>610-640</td>
                    </tr>
                </tbody>
            </table>
        `
    }
};

// Preparation data for each exam
const preparationData = {
    neet: {
        title: "NEET Preparation Guide",
        registration: {
            officialLink: "https://neet.nta.nic.in",
            dates: "Registration: Feb-April, Exam: May",
            fee: "₹1600 (General), ₹1500 (OBC), ₹900 (SC/ST)"
        },
        subjects: [
            { name: "Physics", topics: "Mechanics, Optics, Modern Physics", weightage: "25%", priority: "High" },
            { name: "Chemistry", topics: "Organic, Inorganic, Physical", weightage: "25%", priority: "High" },
            { name: "Biology", topics: "Botany, Zoology, Human Physiology", weightage: "50%", priority: "Very High" }
        ],
        youtube: [
            { channel: "Physics Wallah", url: "https://youtube.com/c/PhysicsWallah", focus: "Complete Syllabus", rating: "★★★★★" },
            { channel: "Unacademy NEET", url: "https://youtube.com/c/UnacademyNEET", focus: "Live Classes", rating: "★★★★☆" },
            { channel: "KV eDUCARE", url: "https://youtube.com/c/KVeDUCARE", focus: "Biology Focus", rating: "★★★★☆" }
        ],
        books: [
            { name: "NCERT Biology Class 11 & 12", author: "NCERT", essential: true, link: "https://www.amazon.in/s?k=ncert+biology+class+11+12" },
            { name: "Concepts of Physics", author: "H.C. Verma", essential: true, link: "https://www.amazon.in/s?k=concepts+of+physics+hc+verma" },
            { name: "Objective Chemistry", author: "R.K. Gupta", essential: false, link: "https://www.amazon.in/s?k=objective+chemistry+rk+gupta" }
        ]
    },
    upsc: {
        title: "UPSC Civil Services Preparation",
        registration: {
            officialLink: "https://upsc.gov.in",
            dates: "Prelims: June, Mains: Sept, Interview: Jan-Mar",
            fee: "₹100 (General), No fee for Females/SC/ST"
        },
        subjects: [
            { name: "General Studies I", topics: "History, Geography, Polity", weightage: "Prelims", priority: "High" },
            { name: "General Studies II", topics: "Governance, Constitution, Social Justice", weightage: "Prelims", priority: "High" },
            { name: "General Studies III", topics: "Economy, Environment, Security", weightage: "Prelims", priority: "High" },
            { name: "Essay", topics: "Current Issues, Philosophical", weightage: "Mains", priority: "Medium" }
        ],
        youtube: [
            { channel: "StudyIQ IAS", url: "https://youtube.com/c/StudyIQEducation", focus: "Current Affairs", rating: "★★★★★" },
            { channel: "Unacademy IAS", url: "https://youtube.com/c/UnacademyIAS", focus: "Complete Syllabus", rating: "★★★★☆" },
            { channel: "Vision IAS", url: "https://youtube.com/c/VisionIAS", focus: "Mains Answer Writing", rating: "★★★★☆" }
        ],
        books: [
            { name: "Indian Polity", author: "M. Laxmikanth", essential: true, link: "https://www.amazon.in/s?k=indian+polity+laxmikanth" },
            { name: "Indian Economy", author: "Ramesh Singh", essential: true, link: "https://www.amazon.in/s?k=indian+economy+ramesh+singh" },
            { name: "Geography of India", author: "Majid Hussain", essential: true, link: "https://www.amazon.in/s?k=geography+of+india+majid+hussain" }
        ]
    },
    jee: {
        title: "JEE Main & Advanced Preparation",
        registration: {
            officialLink: "https://jeemain.nta.nic.in",
            dates: "Jan & April Sessions",
            fee: "₹1000 (General), ₹500 (F/SC/ST)"
        },
        subjects: [
            { name: "Physics", topics: "Mechanics, E&M, Modern Physics", weightage: "33%", priority: "High" },
            { name: "Chemistry", topics: "Physical, Organic, Inorganic", weightage: "33%", priority: "High" },
            { name: "Mathematics", topics: "Calculus, Algebra, Coordinate", weightage: "34%", priority: "High" }
        ],
        youtube: [
            { channel: "Physics Wallah", url: "https://youtube.com/c/PhysicsWallah", focus: "Complete JEE", rating: "★★★★★" },
            { channel: "Unacademy JEE", url: "https://youtube.com/c/UnacademyJEE", focus: "Advanced Level", rating: "★★★★☆" },
            { channel: "Vedantu JEE", url: "https://youtube.com/c/VedantuJEE", focus: "Problem Solving", rating: "★★★★☆" }
        ],
        books: [
            { name: "Concepts of Physics", author: "H.C. Verma", essential: true, link: "https://www.amazon.in/s?k=concepts+of+physics+hc+verma" },
            { name: "Organic Chemistry", author: "M.S. Chouhan", essential: true, link: "https://www.amazon.in/s?k=organic+chemistry+ms+chouhan" },
            { name: "Mathematics", author: "R.D. Sharma", essential: true, link: "https://www.amazon.in/s?k=mathematics+rd+sharma" }
        ]
    },
    mpsc: {
        title: "MPSC Preparation Guide",
        registration: {
            officialLink: "https://mpsc.gov.in",
            dates: "Varies by notification",
            fee: "₹394 (General), ₹294 (Reserved)"
        },
        subjects: [
            { name: "Marathi Language", topics: "Grammar, Comprehension", weightage: "100 marks", priority: "High" },
            { name: "General Studies", topics: "History, Geography, Polity", weightage: "Prelims + Mains", priority: "Very High" },
            { name: "Current Affairs", topics: "National & International", weightage: "Significant", priority: "High" }
        ],
        youtube: [
            { channel: "MPSC Galaxy", url: "https://youtube.com/c/MPSCGalaxy", focus: "Complete MPSC", rating: "★★★★☆" },
            { channel: "Study IQ Marathi", url: "https://youtube.com/c/StudyIQMarathi", focus: "Marathi Content", rating: "★★★★☆" },
            { channel: "Unacademy MPSC", url: "https://youtube.com/c/UnacademyMPSC", focus: "Live Classes", rating: "★★★★☆" }
        ],
        books: [
            { name: "MPSC Compass", author: "MPSC Experts", essential: true, link: "https://www.amazon.in/s?k=mpsc+compass" },
            { name: "Maharashtra Geography", author: "Various", essential: true, link: "https://www.amazon.in/s?k=maharashtra+geography" },
            { name: "Marathi Vyakaran", author: "Various", essential: true, link: "https://www.amazon.in/s?k=marathi+vyakaran" }
        ]
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Vidyasetu...');
  
  // Show only the home section initially
  sections.forEach(s => s.classList.remove('active'));
  document.getElementById('home').classList.add('active');
  
  // Set active nav link
  navLinks.forEach(l => l.classList.remove('active'));
  document.querySelector('a[data-section="home"]').classList.add('active');
  
  // Initialize all functionalities
  initNavigation();
  initAnimations();
  initExamSystem();
  initTimetable();

});
  // ✅ Corrected Explore Exams button code
const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    const examsSection = document.getElementById('courses'); // <-- corrected ID
    if (examsSection) {
      sections.forEach(s => s.classList.remove('active'));
      examsSection.classList.add('active');
      navLinks.forEach(l => l.classList.remove('active'));
      const examsLink = document.querySelector('a[data-section="courses"]');
      if (examsLink) examsLink.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}



// Navigation system
// In scripts/main.js, update the initNavigation function:
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default if it's the login button
            if (this.id !== 'loginBtn') {
                e.preventDefault();
                const targetSection = this.dataset.section;
                
                // Update active states
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                sections.forEach(s => s.classList.remove('active'));
                document.getElementById(targetSection).classList.add('active');
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Login modal - only show if not logged in
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (sessionStorage.getItem('loggedIn') !== 'true') {
                loginModal.classList.add('active');
            }
            // If logged in, the login.js will handle logout
        });
    }

    
} 
    

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (loginModal) loginModal.classList.remove('active');
        });
    }

    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('active');
        });
    }


// Animation system
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target, 0, parseInt(entry.target.textContent), 1500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + (obj.id === 'successCount' ? '%' : '+');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Exam system
function initExamSystem() {
    // Add event listeners to "I want to prepare" buttons
    document.querySelectorAll('.prepare-btn').forEach(button => {
        button.addEventListener('click', function() {
            const examCard = this.closest('.exam-card');
            const examName = examCard.querySelector('h4').textContent.toLowerCase();
            openPreparationModal(examName);
        });
    });
}

// Global functions for exams
function selectTab(tag) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterExams(tag);
}

function filterExams(tab = '') {
    const search = document.querySelector('.search-input')?.value.toLowerCase() || '';
    const allIndiaChecked = document.querySelector('input[value="All India"]')?.checked || false;
    const stateChecked = document.querySelector('input[value="State"]')?.checked || false;
    const selectedState = document.getElementById('stateDropdown')?.value || '';

    document.querySelectorAll('.exam-card').forEach(card => {
        const tags = card.getAttribute('data-tags').toLowerCase();
        const title = card.querySelector('h4').innerText.toLowerCase();

        let matchesTab = tab ? tags.includes(tab.toLowerCase()) : true;
        let matchesSearch = title.includes(search);
        let matchesAllIndia = !allIndiaChecked || tags.includes('all india');
        let matchesState = !stateChecked || (selectedState && tags.includes(selectedState.toLowerCase()));

        if (matchesTab && matchesSearch && matchesAllIndia && matchesState) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function openExamModal(examId) {
    const exam = examData[examId];
    if (!exam) {
        alert('Exam details not available yet.');
        return;
    }
    
    document.getElementById('modalExamTitle').textContent = exam.title;
    
    const prerequisitesList = document.getElementById('modalPrerequisites');
    prerequisitesList.innerHTML = '';
    exam.prerequisites.forEach(req => {
        const li = document.createElement('li');
        li.textContent = req;
        prerequisitesList.appendChild(li);
    });
    
    const careerList = document.getElementById('modalCareer');
    careerList.innerHTML = '';
    exam.career.forEach(opp => {
        const li = document.createElement('li');
        li.textContent = opp;
        careerList.appendChild(li);
    });
    
    document.getElementById('modalCutoffs').innerHTML = exam.cutoffs;
    document.getElementById('examModal').classList.add('active');
}

function closeExamModal() {
    document.getElementById('examModal').classList.remove('active');
}

// TIMETABLE SYSTEM - COMPLETELY FIXED
function initTimetable() {
    console.log('Initializing timetable...');
    
    const sessionForm = document.getElementById('sessionForm');
    const sessionList = document.getElementById('sessionList');
    const saveTimetableBtn = document.getElementById('saveTimetableBtn');
    const resetTimetableBtn = document.getElementById('resetTimetableBtn');
    const timetableGrid = document.querySelector('.timetable-grid');
    
    let studySessions = JSON.parse(localStorage.getItem('studySessions')) || [];
    
    // Initialize components
    initializeTimetableGrid();
    loadSessions();
    
    // FORM SUBMISSION - FIXED
    if (sessionForm) {
        sessionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const subject = document.getElementById('subject').value.trim();
            const startTimeSelect = document.getElementById('startTime');
            const endTimeSelect = document.getElementById('endTime');
            const prioritySelect = document.getElementById('priority');
            
            if (!subject) {
                alert('Please enter a subject/topic');
                return false;
            }
            
            if (!startTimeSelect.value || !endTimeSelect.value) {
                alert('Please select both start and end time');
                return false;
            }
            
            const startTime = parseInt(startTimeSelect.value);
            const endTime = parseInt(endTimeSelect.value);
            const priority = prioritySelect.value;
            
            // Get selected days - PROPERLY
            const dayCheckboxes = document.querySelectorAll('#timetable input[name="days"]:checked');
            const days = Array.from(dayCheckboxes).map(cb => cb.value);
            
            console.log('Selected days:', days);
            
            if (days.length === 0) {
                alert('Please select at least one day');
                return false;
            }
            
            if (startTime >= endTime) {
                alert('End time must be after start time');
                return false;
            }
            
            // Create session
            const session = {
                id: Date.now(),
                subject,
                startTime,
                endTime,
                days,
                priority
            };
            
            studySessions.push(session);
            saveSessions();
            addSessionToUI(session);
            updateTimetableGrid();
            updateStudySummary();
            sessionForm.reset();
            
            return false;
        });
    }
    
    // Save timetable
    if (saveTimetableBtn) {
        saveTimetableBtn.addEventListener('click', function() {
            saveSessions();
            alert('Timetable saved successfully!');
        });
    }
    
    // Reset timetable
    if (resetTimetableBtn) {
        resetTimetableBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset your timetable? This action cannot be undone.')) {
                studySessions = [];
                saveSessions();
                updateTimetableGrid();
                if (sessionList) {
                    sessionList.innerHTML = '<li class="no-sessions">No study sessions added yet. Use the form above to create your schedule.</li>';
                }
                updateStudySummary();
            }
        });
    }
    
    function initializeTimetableGrid() {
        if (!timetableGrid) return;
        
        // Clear existing grid (except headers)
        while (timetableGrid.children.length > 8) {
            timetableGrid.removeChild(timetableGrid.lastChild);
        }
        
        // Add time slots (6 AM to 9 PM)
        for (let hour = 6; hour <= 21; hour++) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = formatTime(hour);
            timetableGrid.appendChild(timeSlot);
            
            // Add empty slots for each day
            for (let day of ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']) {
                const daySlot = document.createElement('div');
                daySlot.className = 'day-column';
                daySlot.id = `${day}-${hour}`;
                timetableGrid.appendChild(daySlot);
            }
        }
    }
    
    function loadSessions() {
        if (studySessions.length > 0 && sessionList) {
            sessionList.innerHTML = '';
            studySessions.forEach(session => {
                addSessionToUI(session);
            });
            updateTimetableGrid();
            updateStudySummary();
        }
    }
    
    function addSessionToUI(session) {
        if (!sessionList) return;
        
        if (sessionList.querySelector('.no-sessions')) {
            sessionList.innerHTML = '';
        }
        
        const listItem = document.createElement('li');
        listItem.className = 'session-item';
        listItem.innerHTML = `
            <div>
                <strong>${session.subject}</strong> 
                (${formatTime(session.startTime)} - ${formatTime(session.endTime)})
                <br>
                <small>Days: ${session.days.map(day => getFullDayName(day)).join(', ')}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="priority-badge" style="background: ${getPriorityColor(session.priority)}">${session.priority}</span>
                <button class="btn-delete" data-id="${session.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        sessionList.appendChild(listItem);
        
        // Delete functionality
        listItem.querySelector('.btn-delete').addEventListener('click', function() {
            const sessionId = parseInt(this.getAttribute('data-id'));
            studySessions = studySessions.filter(s => s.id !== sessionId);
            saveSessions();
            updateTimetableGrid();
            updateStudySummary();
            listItem.remove();
            
            if (studySessions.length === 0 && sessionList) {
                sessionList.innerHTML = '<li class="no-sessions">No study sessions added yet. Use the form above to create your schedule.</li>';
            }
        });
    }
    
    function updateTimetableGrid() {
        if (!timetableGrid) return;
        
        // Clear all slots
        document.querySelectorAll('.day-column').forEach(col => {
            col.innerHTML = '';
        });
        
        // Add sessions to grid
        studySessions.forEach(session => {
            session.days.forEach(day => {
                for (let hour = session.startTime; hour < session.endTime; hour++) {
                    const slot = document.getElementById(`${day}-${hour}`);
                    if (slot) {
                        const sessionElement = document.createElement('div');
                        sessionElement.className = 'study-session';
                        sessionElement.textContent = session.subject;
                        sessionElement.style.backgroundColor = getPriorityColor(session.priority);
                        slot.appendChild(sessionElement);
                    }
                }
            });
        });
    }
    
    function updateStudySummary() {
        const totalHours = studySessions.reduce((total, session) => {
            return total + (session.endTime - session.startTime) * session.days.length;
        }, 0);
        
        const totalSessions = studySessions.length;
        const uniqueSubjects = new Set(studySessions.map(session => session.subject)).size;
        
        const totalHoursEl = document.getElementById('totalHours');
        const totalSessionsEl = document.getElementById('totalSessions');
        const totalSubjectsEl = document.getElementById('totalSubjects');
        
        if (totalHoursEl) totalHoursEl.textContent = `${totalHours} hrs`;
        if (totalSessionsEl) totalSessionsEl.textContent = totalSessions;
        if (totalSubjectsEl) totalSubjectsEl.textContent = uniqueSubjects;
    }
    
    function formatTime(hour) {
        if (hour < 12) {
            return `${hour}:00 AM`;
        } else if (hour === 12) {
            return '12:00 PM';
        } else {
            return `${hour - 12}:00 PM`;
        }
    }
    
    function getFullDayName(shortName) {
        const days = {
            'mon': 'Monday',
            'tue': 'Tuesday',
            'wed': 'Wednesday',
            'thu': 'Thursday',
            'fri': 'Friday',
            'sat': 'Saturday',
            'sun': 'Sunday'
        };
        return days[shortName] || shortName;
    }
    
    function getPriorityColor(priority) {
        const colors = {
            'low': '#6ab04c',
            'medium': '#f9ca24',
            'high': '#eb4d4b'
        };
        return colors[priority] || '#f9ca24';
    }
    
    function saveSessions() {
        localStorage.setItem('studySessions', JSON.stringify(studySessions));
    }
}

// Preparation modal functions
function openPreparationModal(examId) {
    const exam = preparationData[examId];
    if (!exam) {
        alert('Preparation guide not available for this exam yet.');
        return;
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="preparation-modal active">
            <div class="preparation-modal-content">
                <div class="preparation-header">
                    <h2>${exam.title}</h2>
                    <button class="close-btn" onclick="closePreparationModal()">&times;</button>
                </div>
                
                <!-- Registration Section -->
                <div class="preparation-section">
                    <h3><i class="fas fa-user-plus"></i> Registration & Application</h3>
                    <div class="registration-info">
                        <p><strong>Official Website:</strong> <a href="${exam.registration.officialLink}" target="_blank">Apply Here</a></p>
                        <p><strong>Important Dates:</strong> ${exam.registration.dates}</p>
                        <p><strong>Application Fee:</strong> ${exam.registration.fee}</p>
                    </div>
                </div>
                
                <!-- Subjects Section -->
                <div class="preparation-section">
                    <h3><i class="fas fa-book"></i> Subjects to Prepare</h3>
                    <div class="subjects-grid">
                        ${exam.subjects.map(subject => `
                            <div class="subject-card priority-${subject.priority.toLowerCase().replace(' ', '-')}">
                                <h4>${subject.name}</h4>
                                <p><strong>Weightage:</strong> ${subject.weightage}</p>
                                <p><strong>Key Topics:</strong> ${subject.topics}</p>
                                <span class="priority-badge">${subject.priority} Priority</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- YouTube Resources -->
                <div class="preparation-section">
                    <h3><i class="fab fa-youtube"></i> YouTube Resources</h3>
                    <div class="resources-grid">
                        ${exam.youtube.map(channel => `
                            <div class="resource-card">
                                <h4>${channel.channel} <span class="rating">${channel.rating}</span></h4>
                                <p>${channel.focus}</p>
                                <a href="${channel.url}" target="_blank" class="resource-link">
                                    <i class="fab fa-youtube"></i> Visit Channel
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Book Recommendations -->
                <div class="preparation-section">
                    <h3><i class="fas fa-book-open"></i> Book Recommendations</h3>
                    <div class="books-list">
                        ${exam.books.map(book => `
                            <div class="book-card ${book.essential ? 'essential' : ''}">
                                <h4>${book.name}</h4>
                                <p><strong>Author:</strong> ${book.author}</p>
                                ${book.essential ? '<span class="essential-badge">Must Have</span>' : ''}
                                <a href="${book.link}" target="_blank" class="book-link">
                                    <i class="fas fa-shopping-cart"></i> Buy Now
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="preparation-actions">
                    <button class="btn btn-primary" onclick="savePreparationPlan('${examId}')">
                        <i class="fas fa-save"></i> Save This Plan
                    </button>
                    <button class="btn btn-secondary" onclick="closePreparationModal()">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closePreparationModal() {
    const modal = document.querySelector('.preparation-modal');
    if (modal) {
        modal.remove();
    }
}

function savePreparationPlan(examId) {
    const savedPlans = JSON.parse(localStorage.getItem('savedPreparationPlans') || '[]');
    if (!savedPlans.includes(examId)) {
        savedPlans.push(examId);
        localStorage.setItem('savedPreparationPlans', JSON.stringify(savedPlans));
    }
    alert('Preparation plan saved! You can access it from your profile.');
    closePreparationModal();
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('preparation-modal')) {
        closePreparationModal();
    }
});
// Explore Exams button functionality
function initExploreExamsButton() {
    const exploreBtn = document.getElementById('exploreExamsBtn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            // Navigate to All Exams section
            switchSection('courses');
            
            // Optional: Scroll to top of exams section
            const coursesSection = document.getElementById('courses');
            if (coursesSection) {
                coursesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initExploreExamsButton();
    // Your other initialization code...
});