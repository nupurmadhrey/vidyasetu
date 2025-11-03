// Timetable functionality
document.addEventListener('DOMContentLoaded', function() {
  const sessionForm = document.getElementById('sessionForm');
  const sessionList = document.getElementById('sessionList');
  const saveTimetableBtn = document.getElementById('saveTimetableBtn');
  const resetTimetableBtn = document.getElementById('resetTimetableBtn');
  const timetableGrid = document.querySelector('.timetable-grid');
  
  let studySessions = JSON.parse(localStorage.getItem('studySessions')) || [];
  
  // Prevent navigation when interacting with timetable elements
  document.querySelectorAll('#timetable button, #timetable input, #timetable select, #timetable form').forEach(element => {
    element.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });

  // Initialize timetable grid
  initializeTimetableGrid();
  
  // Load existing sessions
  loadSessions();
  
  // Handle form submission
  if (sessionForm) {
    sessionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event from bubbling up to navigation
      
      const subject = document.getElementById('subject').value;
      const startTime = parseInt(document.getElementById('startTime').value);
      const endTime = parseInt(document.getElementById('endTime').value);
      const priority = document.getElementById('priority').value;
      
      // Get selected days
      const dayCheckboxes = document.querySelectorAll('input[name="days"]:checked');
      const days = Array.from(dayCheckboxes).map(cb => cb.value);
      
      if (days.length === 0) {
        alert('Please select at least one day');
        return;
      }
      
      if (startTime >= endTime) {
        alert('End time must be after start time');
        return;
      }
      
      // Create session object
      const session = {
        id: Date.now(),
        subject,
        startTime,
        endTime,
        days,
        priority
      };
      
      // Add to sessions array
      studySessions.push(session);
      
      // Save to localStorage
      saveSessions();
      
      // Update UI
      addSessionToUI(session);
      updateTimetableGrid();
      updateStudySummary();
      
      // Reset form
      sessionForm.reset();
      
      return false; // Additional prevention
    });
  }
  
  // Save timetable
  if (saveTimetableBtn) {
    saveTimetableBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent navigation
      saveSessions();
      alert('Timetable saved successfully!');
    });
  }
  
  // Reset timetable
  if (resetTimetableBtn) {
    resetTimetableBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent navigation
      if (confirm('Are you sure you want to reset your timetable? This action cannot be undone.')) {
        studySessions = [];
        saveSessions();
        updateTimetableGrid();
        sessionList.innerHTML = '<li class="no-sessions">No study sessions added yet. Use the form above to create your schedule.</li>';
        updateStudySummary();
      }
    });
  }
  
  // Initialize timetable grid with time slots
  function initializeTimetableGrid() {
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
  
  // Load sessions from localStorage
  function loadSessions() {
    if (studySessions.length > 0) {
      sessionList.innerHTML = '';
      studySessions.forEach(session => {
        addSessionToUI(session);
      });
      updateTimetableGrid();
      updateStudySummary();
    }
  }
  
  // Add session to the list
  function addSessionToUI(session) {
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
    
    // Add delete functionality
    listItem.querySelector('.btn-delete').addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent navigation
      const sessionId = parseInt(this.getAttribute('data-id'));
      studySessions = studySessions.filter(s => s.id !== sessionId);
      saveSessions();
      updateTimetableGrid();
      updateStudySummary();
      listItem.remove();
      
      if (studySessions.length === 0) {
        sessionList.innerHTML = '<li class="no-sessions">No study sessions added yet. Use the form above to create your schedule.</li>';
      }
    });
  }
  
  // Update the timetable grid
  function updateTimetableGrid() {
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
  
  // Update study summary
  function updateStudySummary() {
    const totalHours = studySessions.reduce((total, session) => {
      return total + (session.endTime - session.startTime) * session.days.length;
    }, 0);
    
    const totalSessions = studySessions.length;
    const uniqueSubjects = new Set(studySessions.map(session => session.subject)).size;
    
    document.getElementById('totalHours').textContent = `${totalHours} hrs`;
    document.getElementById('totalSessions').textContent = totalSessions;
    document.getElementById('totalSubjects').textContent = uniqueSubjects;
  }
  
  // Helper functions
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
    return days[shortName];
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
});