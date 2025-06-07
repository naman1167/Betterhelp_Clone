document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                    i.querySelector('.faq-answer').style.display = 'none';
                    i.querySelector('.faq-arrow').innerHTML = '&#9660;';
                }
            });
            // Toggle this item
            const answer = item.querySelector('.faq-answer');
            const arrow = item.querySelector('.faq-arrow');
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                answer.style.display = 'none';
                arrow.innerHTML = '&#9660;';
            } else {
                item.classList.add('active');
                answer.style.display = 'block';
                arrow.innerHTML = '&#9650;';
            }
        });
    });
}); 