/**
 * LIGHTHOUSE WEBSITE FORMS HANDLER
 * Handles all form submissions for early access, contact, and newsletter
 * Uses local JSON storage by default, easy to switch to Formspree
 */

// Configuration - Switch between local storage and Formspree
const FORM_CONFIG = {
    // Set to 'local' for local JSON storage, 'formspree' for Formspree integration
    mode: 'local',

    // Formspree form IDs (get these from https://formspree.io after creating forms)
    formspreeIds: {
        earlyAccess: 'YOUR_EARLY_ACCESS_FORM_ID',
        contact: 'YOUR_CONTACT_FORM_ID',
        newsletter: 'YOUR_NEWSLETTER_FORM_ID',
        questions: 'YOUR_QUESTIONS_FORM_ID'
    },

    // Local storage file path (relative to website root)
    localStoragePath: './form-submissions.json'
};

/**
 * Initialize all forms when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Early Access forms
    initEarlyAccessForms();

    // Initialize Contact/Questions form
    initQuestionsForm();

    // Initialize Newsletter form
    initNewsletterForm();

    console.log('✅ All forms initialized in', FORM_CONFIG.mode, 'mode');
});

/**
 * Initialize Early Access forms (LIGHTHOUSE and Companion waitlist)
 */
function initEarlyAccessForms() {
    // LIGHTHOUSE Early Access
    const lighthouseForm = document.getElementById('lighthouse-early-access-form');
    if (lighthouseForm) {
        lighthouseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'lighthouse-early-access');
        });
    }

    // Companion Waitlist
    const companionForm = document.getElementById('companion-waitlist-form');
    if (companionForm) {
        companionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'companion-waitlist');
        });
    }
}

/**
 * Initialize Questions/Contact form
 */
function initQuestionsForm() {
    const questionForm = document.getElementById('question-form');
    if (questionForm) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'questions');
        });
    }
}

/**
 * Initialize Newsletter signup form
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'newsletter');
        });
    }
}

/**
 * Main form submission handler
 */
async function handleFormSubmission(form, formType) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = '⏳ Sending...';
    submitButton.style.opacity = '0.6';

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = new Date().toISOString();
    data.formType = formType;

    try {
        if (FORM_CONFIG.mode === 'formspree') {
            await submitToFormspree(formType, data);
        } else {
            await submitToLocal(formType, data);
        }

        // Show success message
        showFormMessage(form, 'success', getSuccessMessage(formType));

        // Reset form
        form.reset();

        // Log to console (for debugging)
        console.log('✅ Form submitted:', formType, data);

    } catch (error) {
        // Show error message
        showFormMessage(form, 'error', 'Something went wrong. Please try again or email nathanmichel@nvvisions.com');
        console.error('❌ Form submission error:', error);
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.opacity = '1';
    }
}

/**
 * Submit form to Formspree
 */
async function submitToFormspree(formType, data) {
    const formId = FORM_CONFIG.formspreeIds[formType] || FORM_CONFIG.formspreeIds.contact;

    const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Formspree submission failed');
    }

    return response.json();
}

/**
 * Submit form to local storage (for development/testing)
 */
async function submitToLocal(formType, data) {
    // In a real implementation, this would send to a backend API
    // For now, we'll store in localStorage and log to console

    // Get existing submissions
    const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');

    // Add new submission
    existingSubmissions.push(data);

    // Save back to localStorage
    localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));

    // Also save to a downloadable file format
    downloadSubmissionAsJSON(data);

    return Promise.resolve();
}

/**
 * Download submission as JSON file (for local mode)
 */
function downloadSubmissionAsJSON(data) {
    const filename = `submission-${data.formType}-${Date.now()}.json`;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);

    console.log('📥 Downloaded submission:', filename);
}

/**
 * Show form success/error message
 */
function showFormMessage(form, type, message) {
    // Remove any existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;

    // Style the message
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginTop = '1rem';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '600';
    messageDiv.style.animation = 'slideIn 0.3s ease';

    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(56, 142, 60, 0.2))';
        messageDiv.style.border = '2px solid #4CAF50';
        messageDiv.style.color = '#4CAF50';
    } else {
        messageDiv.style.background = 'linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(211, 47, 47, 0.2))';
        messageDiv.style.border = '2px solid #f44336';
        messageDiv.style.color = '#f44336';
    }

    // Add message to form
    form.appendChild(messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

/**
 * Get success message based on form type
 */
function getSuccessMessage(formType) {
    const messages = {
        'lighthouse-early-access': '🎉 You\'re on the LIGHTHOUSE early access list! Beacon will reach out soon.',
        'companion-waitlist': '💜 You\'re on the Companion waitlist! Nevaeh will notify you at launch.',
        'questions': '✨ Question received! We\'ll answer it in our autonomous content.',
        'newsletter': '📬 You\'re subscribed! We\'ll keep you updated on the mission.'
    };

    return messages[formType] || '✅ Submission received! Thank you.';
}

/**
 * Add CSS animations
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }

    .form-message {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

/**
 * Utility function to view all submissions (for development)
 */
window.viewAllSubmissions = function() {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    console.table(submissions);
    return submissions;
};

/**
 * Utility function to export all submissions as JSON
 */
window.exportAllSubmissions = function() {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    const json = JSON.stringify(submissions, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `all-submissions-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);

    console.log('📥 Exported all submissions');
};

/**
 * Utility function to clear all submissions (for development)
 */
window.clearAllSubmissions = function() {
    if (confirm('Are you sure you want to clear all form submissions?')) {
        localStorage.removeItem('formSubmissions');
        console.log('🗑️ All submissions cleared');
    }
};

console.log('💡 Developer utilities available:');
console.log('  - viewAllSubmissions() - View all form submissions');
console.log('  - exportAllSubmissions() - Export all submissions as JSON');
console.log('  - clearAllSubmissions() - Clear all submissions');
