// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    showSection('home');
    initEventListeners();
});

function initEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // Login modal removed; index.html handles navigation to a dedicated login page.
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Initialize animations for the section
        setTimeout(() => {
            initAnimations();
        }, 100);
        // Add this to your navigation.js file
document.addEventListener('DOMContentLoaded', function() {
    // Explore Exams button functionality
    const exploreExamsBtn = document.getElementById('exploreExamsBtn');
    
    if (exploreExamsBtn) {
        exploreExamsBtn.addEventListener('click', function() {
            // Hide all sections
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show courses section (All Exams)
            const coursesSection = document.getElementById('courses');
            if (coursesSection) {
                coursesSection.classList.add('active');
                
                // Smooth scroll to top of courses section
                coursesSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Update navigation active state
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('nav a[data-section="courses"]').classList.add('active');
        });
    }
});
    }
}