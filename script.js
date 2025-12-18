document.addEventListener("DOMContentLoaded", () => {
    
    const fadeElements = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        fadeElements.forEach(element => {
            observer.observe(element);
        });

    } else {
        fadeElements.forEach(element => {
            element.classList.add("visible");
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const roleButtons = document.querySelectorAll('.role-btn');
    const preview = document.getElementById('role-preview');

    if (!roleButtons.length || !preview) return;

    const roleText = {
        doctor: {
            title: '👨‍⚕️ Doctor View',
            description: 'Full medical record access, update history, request labs, and prescribe e-prescriptions.',
            features: ['Complete patient history', 'Lab test requests', 'E-prescription system', 'Medical notes & updates']
        },
        pharmacist: {
            title: '💊 Pharmacist View',
            description: 'View active e-prescriptions, allergy flags, and medication dispense history.',
            features: ['Active e-prescriptions', 'Allergy warnings', 'Dispense history', 'Medication verification']
        },
        lab: {
            title: '🔬 Lab View',
            description: 'See doctor-requested tests and upload verified results directly to patient profiles.',
            features: ['Test requests from doctors', 'Result upload system', 'Patient verification', 'Report management']
        },
        ems: {
            title: '🚑 Emergency View',
            description: 'Access critical information: blood type, allergies, current medications (with patient consent).',
            features: ['Blood type & allergies', 'Current medications', 'Emergency contacts', 'Vital medical info']
        }
    };

    roleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            roleButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const role = btn.getAttribute('data-role');
            const roleData = roleText[role];
            
            if (roleData) {
                const featuresHTML = roleData.features.map(feature => 
                    `<div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary-teal); flex-shrink: 0;">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        <span style="font-size: 0.9rem; color: var(--text-light);">${feature}</span>
                    </div>`
                ).join('');
                
                preview.innerHTML = `
                    <div style="text-align: left;">
                        <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-blue); margin-bottom: 0.75rem;">${roleData.title}</h4>
                        <p style="color: var(--text-light); margin-bottom: 1rem; line-height: 1.6;">${roleData.description}</p>
                        <div style="margin-top: 1rem;">
                            ${featuresHTML}
                        </div>
                    </div>
                `;
            } else {
                preview.innerHTML = '<strong>Role view will appear here.</strong><p>Select a role to preview what they\'d see when scanning the static QR code.</p>';
            }
            
            preview.classList.add('flash');
            setTimeout(() => preview.classList.remove('flash'), 700);
        });
    });
});