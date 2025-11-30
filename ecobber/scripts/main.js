document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Modal Logic
    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');

    // Select all cards that have a data-description attribute
    const cards = document.querySelectorAll('.pillar-card[data-description], .product-card[data-description]');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title') || card.querySelector('h3').innerText;
            const description = card.getAttribute('data-description');

            modalTitle.textContent = title;
            modalDescription.textContent = description;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Workflow Animation Toggle
    const viewProcessBtn = document.getElementById('viewProcessBtn');
    const processAnimation = document.getElementById('processAnimation');

    if (viewProcessBtn && processAnimation) {
        viewProcessBtn.addEventListener('click', () => {
            if (processAnimation.style.display === 'none') {
                processAnimation.style.display = 'block';
                viewProcessBtn.textContent = 'Hide Process Animation';
            } else {
                processAnimation.style.display = 'none';
                viewProcessBtn.textContent = 'View Process Animation';
            }
        });
    }
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});
