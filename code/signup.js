document.addEventListener('DOMContentLoaded', function() {
    // Get all option buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Add click event listener to each button
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the therapy type from the data attribute
            const therapyType = this.getAttribute('data-therapy-type');
            
            // Add a small delay for visual feedback
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.8';
            
            // Store the selected therapy type in localStorage (optional)
            localStorage.setItem('selectedTherapyType', therapyType);
            
            // Redirect to signup1.html after a brief delay
            setTimeout(() => {
                window.location.href = 'signup1.html';
            }, 150);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(143, 214, 148, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add CSS for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .option-btn {
            transition: all 0.2s ease;
        }
        
        body.loaded .signup-section {
            opacity: 1;
            transform: translateY(0);
        }
        
        .signup-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}); 