// Club Pulse Ghana - Main JavaScript File

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayMatches();
    displaySignups();
    setupFormListener();
});

// Match data
const matches = [
    {
        homeTeam: `Hearts of Oak`,
        awayTeam: `Asante Kotoko`,
        date: `2026-06-15`,
        venue: `Accra Sports Stadium`,
        time: `3:00 PM`,
        status: `Upcoming`
    },
    {
        homeTeam: `Aduana Stars`,
        awayTeam: `Accra Lions`,
        date: `2026-06-16`,
        venue: `Dorban Park`,
        time: `4:00 PM`,
        status: `Upcoming`
    },
    {
        homeTeam: `Dreams FC`,
        awayTeam: `Bechem United`,
        date: `2026-06-17`,
        venue: `Techiman Stadium`,
        time: `3:30 PM`,
        status: `Upcoming`
    },
    {
        homeTeam: `Tamale City FC`,
        awayTeam: `Samartex`,
        date: `2026-06-18`,
        venue: `Aliu Mahama Stadium`,
        time: `2:00 PM`,
        status: `Upcoming`
    }
];

// Display matches in different formats based on page
function displayMatches() {
    const matchFeed = document.getElementById('matchFeed');
    const eventsTable = document.getElementById('eventsTableBody');

    // For home page - match feed format
    if (matchFeed) {
        matchFeed.innerHTML = matches.map(match => {
            const statusClass = getStatusClass(match.status);
            return `
                <div class="match-card">
                    <h3>${match.homeTeam} vs ${match.awayTeam}</h3>
                    <p><strong>Date:</strong> ${formatDate(match.date)}</p>
                    <p><strong>Time:</strong> ${match.time}</p>
                    <p><strong>Venue:</strong> ${match.venue}</p>
                    <span class="match-status ${statusClass}">${match.status}</span>
                </div>
            `;
        }).join('');
    }

    // For events page - table format
    if (eventsTable) {
        eventsTable.innerHTML = matches.map(match => {
            const statusClass = getStatusClass(match.status);
            return `
                <tr>
                    <td>${formatDate(match.date)}</td>
                    <td>${match.homeTeam} vs ${match.awayTeam}</td>
                    <td>${match.venue}</td>
                    <td><span class="match-status ${statusClass}">${match.status}</span></td>
                </tr>
            `;
        }).join('');
    }
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function for status styling
function getStatusClass(status) {
    const statusMap = {
        'Upcoming': 'status-upcoming',
        'Live': 'status-live',
        'Completed': 'status-completed'
    };
    return statusMap[status] || 'status-upcoming';
}

// Setup form submission
function setupFormListener() {
    const form = document.getElementById('fanForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmission(form);
    });
}

// Handle form submission with validation
function handleFormSubmission(form) {
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const club = form.querySelector('#club').value;
    const newsletter = form.querySelector('input[name="newsletter"]').checked;

    // Conditional validation
    if (!name || name.length < 2) {
        showFormMessage(`Please enter a valid name (at least 2 characters).`, 'error');
        return;
    }

    if (!email || !isValidEmail(email)) {
        showFormMessage(`Please enter a valid email address.`, 'error');
        return;
    }

    if (!club) {
        showFormMessage(`Please select a favorite club.`, 'error');
        return;
    }

    // Create signup object
    const signup = {
        id: Date.now(),
        name,
        email,
        club,
        newsletter,
        timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    saveSignup(signup);

    // Show success message
    showFormMessage(`Thank you, ${name}! Welcome to the Club Pulse Ghana community!`, 'success');

    // Reset form and update display
    form.reset();
    displaySignups();
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Save signup to localStorage
function saveSignup(signup) {
    let signups = JSON.parse(localStorage.getItem('clubPulseSignups') || '[]');
    signups.push(signup);
    localStorage.setItem('clubPulseSignups', JSON.stringify(signups));
}

// Display all signups from localStorage
function displaySignups() {
    const signupsList = document.getElementById('signupsList');
    if (!signupsList) return;

    let signups = JSON.parse(localStorage.getItem('clubPulseSignups') || '[]');

    // Show only recent 5 signups, most recent first
    const recentSignups = signups.slice(-5).reverse();

    if (recentSignups.length === 0) {
        signupsList.innerHTML = `<p>Be the first to join our fan community!</p>`;
        return;
    }

    signupsList.innerHTML = `
        <div class="signups-list">
            ${recentSignups.map(signup => `
                <div class="signup-item">
                    <div class="signup-name">${signup.name}</div>
                    <div class="signup-club">Favorite: ${signup.club}</div>
                    <div class="signup-time">${signup.timestamp}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Show form messages
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;

    messageDiv.style.marginTop = '1rem';
    messageDiv.style.padding = '1rem';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.fontWeight = '600';

    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }

    messageDiv.textContent = message;

    // Clear message after 4 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 4000);
}

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
setActiveNavLink();
