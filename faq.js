document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            const arrow = this.querySelector('.faq-arrow');
            
            // Close all other FAQ items
            faqItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherArrow = item.querySelector('.faq-arrow');
                    otherAnswer.style.display = 'none';
                    otherArrow.textContent = '&#9660;';
                }
            });
            
            // Toggle current FAQ item
            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
                answer.style.display = 'none';
                arrow.textContent = '&#9660;';
            } else {
                faqItem.classList.add('active');
                answer.style.display = 'block';
                arrow.textContent = '&#9650;';
            }
        });
    });
    
    // Category Filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter FAQ items
            allFaqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (selectedCategory === 'general' || itemCategory === selectedCategory) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Reset search
            const searchInput = document.querySelector('.faq-search');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });
    
    // Search Functionality
    const searchInput = document.querySelector('.faq-search');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all items when search is empty
            allFaqItems.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '1';
            });
            return;
        }
        
        // Reset category buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        allFaqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.opacity = '1';
                
                // Highlight search term
                highlightSearchTerm(item, searchTerm);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    function highlightSearchTerm(item, searchTerm) {
        const questionElement = item.querySelector('.faq-question span');
        const answerElement = item.querySelector('.faq-answer');
        
        // Remove existing highlights
        questionElement.innerHTML = questionElement.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
        answerElement.innerHTML = answerElement.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
        
        // Add new highlights
        const questionText = questionElement.textContent;
        const answerText = answerElement.textContent;
        
        const highlightedQuestion = questionText.replace(new RegExp(searchTerm, 'gi'), 
            `<mark class="search-highlight">$&</mark>`);
        const highlightedAnswer = answerText.replace(new RegExp(searchTerm, 'gi'), 
            `<mark class="search-highlight">$&</mark>`);
        
        questionElement.innerHTML = highlightedQuestion;
        answerElement.innerHTML = highlightedAnswer;
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add hover effects for FAQ items
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all FAQ items when Escape is pressed
            faqItems.forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                const arrow = item.querySelector('.faq-arrow');
                answer.style.display = 'none';
                arrow.textContent = '&#9660;';
            });
        }
    });
    
    // Add CSS for search highlighting
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            background-color: #fff3cd;
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: 600;
        }
        
        .faq-item {
            transition: opacity 0.3s ease, transform 0.2s ease;
        }
        
        body.loaded .faq-main {
            opacity: 1;
        }
        
        .faq-main {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize tooltips for category buttons
    categoryButtons.forEach(button => {
        const category = button.getAttribute('data-category');
        const count = document.querySelectorAll(`[data-category="${category}"]`).length;
        
        button.title = `${category.charAt(0).toUpperCase() + category.slice(1)} questions (${count})`;
    });
    
    // Add animation for category buttons
    categoryButtons.forEach((button, index) => {
        button.style.animationDelay = `${index * 0.1}s`;
        button.style.animation = 'fadeInUp 0.5s ease forwards';
    });
    
    // Add animation for FAQ items
    faqItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
        item.style.animation = 'fadeInUp 0.5s ease forwards';
    });
    
    // Add CSS animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .category-btn, .faq-item {
            opacity: 0;
        }
    `;
    document.head.appendChild(animationStyle);
}); 