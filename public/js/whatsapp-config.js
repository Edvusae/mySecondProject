/**
 * WhatsApp Business Integration
 * Edwin Tsembegano Portfolio
 * Number: +263719199587 (Zimbabwe)
 */

// WhatsApp Business Number (Zimbabwe format)
const WHATSAPP_NUMBER = '263719199587'; // Zimbabwe country code + number without leading 0

// Pre-defined message templates for different contexts
const messageTemplates = {
    general: "Hi Edwin, I found your portfolio and I'd like to discuss a project with you.",
    webDev: "Hi Edwin, I'm interested in your Website Development services. Can we discuss my project?",
    systems: "Hi Edwin, I need a custom web-based system. I'd like to learn more about your services.",
    marketing: "Hi Edwin, I'm interested in your Digital Marketing services. Can we schedule a consultation?",
    project: "Hi Edwin, I saw your projects and I'm impressed! I'd like to work with you.",
    contact: "Hi Edwin, I'd like to get in touch regarding a project opportunity."
};

/**
 * Open WhatsApp chat with pre-filled message
 * @param {string} context - The context for the message (general, webDev, systems, marketing, project, contact)
 */
function openWhatsApp(context = 'general') {
    // Get the appropriate message template
    const message = messageTemplates[context] || messageTemplates.general;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Construct WhatsApp URL (works on both mobile and desktop)
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    
    // Optional: Track the click for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'event_category': 'Contact',
            'event_label': context,
            'value': 1
        });
    }
    
    console.log('WhatsApp opened with context:', context);
}

/**
 * Initialize WhatsApp floating button
 */
function initWhatsAppButton() {
    const floatingBtn = document.querySelector('.whatsapp-float button, .whatsapp-float a');
    
    if (floatingBtn) {
        // Add click event if it's a button without onclick
        if (floatingBtn.tagName === 'BUTTON' && !floatingBtn.hasAttribute('onclick')) {
            floatingBtn.addEventListener('click', function() {
                openWhatsApp('general');
            });
        }
        
        console.log('WhatsApp button initialized successfully');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppButton);
} else {
    initWhatsAppButton();
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openWhatsApp,
        initWhatsAppButton,
        WHATSAPP_NUMBER
    };
}