document.addEventListener("DOMContentLoaded", () => {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
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

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let currentSlide = 0;
    
    if (!testimonialCards.length) return;
    
    const showSlide = (index) => {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= testimonialCards.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = testimonialCards.length - 1;
        } else {
            currentSlide = index;
        }
        
        testimonialCards[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };
    
    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };
    
    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(nextSlide, 5000);
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Legal Modal Functionality
    const legalModal = document.getElementById('legalModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const legalLinks = document.querySelectorAll('a[data-legal]');

    const legalContent = {
        privacy: {
            title: 'Privacy Policy',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />',
            content: `
                <p class="last-updated">Last Updated: December 19, 2025</p>
                
                <p>Welcome to NexusCare. We are committed to protecting your privacy and ensuring the security of your personal health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services.</p>

                <h3>1. Information We Collect</h3>
                
                <h4>1.1 Personal Information</h4>
                <p>We collect information that you provide directly to us, including:</p>
                <ul>
                    <li>Name, date of birth, and contact information</li>
                    <li>National identification number or health insurance details</li>
                    <li>Email address and phone number</li>
                    <li>Username and password for your account</li>
                </ul>

                <h4>1.2 Health Information</h4>
                <p>With your explicit consent, we collect and store:</p>
                <ul>
                    <li>Medical history and health records</li>
                    <li>Prescription and medication information</li>
                    <li>Laboratory test results</li>
                    <li>Diagnostic reports and imaging</li>
                    <li>Doctor's notes and treatment plans</li>
                    <li>Emergency contact information</li>
                </ul>

                <h4>1.3 Usage Information</h4>
                <p>We automatically collect certain information when you use our app:</p>
                <ul>
                    <li>Device information (device type, operating system, unique device identifiers)</li>
                    <li>Log information (IP address, access times, app features used)</li>
                    <li>Location data (with your permission, for emergency services)</li>
                </ul>

                <h3>2. How We Use Your Information</h3>
                <p>We use the collected information for the following purposes:</p>
                <ul>
                    <li><strong>Healthcare Services:</strong> To provide you with access to your health records and facilitate communication with healthcare providers</li>
                    <li><strong>Emergency Response:</strong> To quickly provide critical health information to emergency responders when needed</li>
                    <li><strong>Account Management:</strong> To create and manage your account, authenticate your identity, and provide customer support</li>
                    <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our app's functionality and user experience</li>
                    <li><strong>Communication:</strong> To send you important updates, security alerts, and service notifications</li>
                    <li><strong>Compliance:</strong> To comply with legal obligations and respond to lawful requests from authorities</li>
                </ul>

                <h3>3. Information Sharing and Disclosure</h3>
                
                <h4>3.1 Healthcare Providers</h4>
                <p>We share your health information only with healthcare providers you have explicitly authorized through our app. You maintain full control over who can access your information.</p>

                <h4>3.2 Emergency Situations</h4>
                <p>In emergency situations, we may share your critical health information with emergency responders to provide you with appropriate medical care.</p>

                <h4>3.3 Service Providers</h4>
                <p>We work with trusted third-party service providers who assist us in operating our app. These providers are bound by strict confidentiality agreements and are not permitted to use your information for any other purpose.</p>

                <h4>3.4 Legal Requirements</h4>
                <p>We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to protect our rights or the safety of others.</p>

                <h3>4. Data Security</h3>
                <p>We implement industry-standard security measures to protect your information:</p>
                <ul>
                    <li><strong>Encryption:</strong> All data is encrypted in transit (using TLS/SSL) and at rest (using AES-256 encryption)</li>
                    <li><strong>Access Controls:</strong> Strict access controls ensure only authorized personnel can access sensitive data</li>
                    <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments</li>
                    <li><strong>Secure Infrastructure:</strong> Our servers are hosted in secure, certified data centers</li>
                    <li><strong>Multi-Factor Authentication:</strong> We offer multi-factor authentication to protect your account</li>
                </ul>

                <h3>5. Your Rights and Choices</h3>
                <p>You have the following rights regarding your information:</p>
                <ul>
                    <li><strong>Access:</strong> Request access to your personal and health information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your information (subject to legal retention requirements)</li>
                    <li><strong>Data Portability:</strong> Request a copy of your data in a machine-readable format</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                    <li><strong>Access Control:</strong> Manage which healthcare providers can access your information</li>
                </ul>

                <h3>6. Contact Us</h3>
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                <ul>
                    <li><strong>Email:</strong> contact.nexuscare@gmail.com</li>
                    <li><strong>Phone:</strong> +94 72 9696 918 / +94 77 877 5035</li>
                    <li><strong>Address:</strong> Colombo, Sri Lanka</li>
                </ul>
            `
        },
        terms: {
            title: 'Terms of Service',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />',
            content: `
                <p class="last-updated">Last Updated: December 19, 2025</p>
                
                <p><strong>Important:</strong> Please read these Terms of Service carefully before using NexusCare. By accessing or using our services, you agree to be bound by these terms.</p>

                <h3>1. Acceptance of Terms</h3>
                <p>By creating an account or using NexusCare's mobile application and services ("Services"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.</p>

                <h3>2. Description of Service</h3>
                <p>NexusCare is a digital health record management platform that allows you to:</p>
                <ul>
                    <li>Store and manage your personal health records</li>
                    <li>Share health information with authorized healthcare providers</li>
                    <li>Access your medical history anytime, anywhere</li>
                    <li>Receive emergency medical assistance through quick access to critical health data</li>
                    <li>Communicate securely with healthcare professionals</li>
                </ul>

                <h3>3. Eligibility and Account Registration</h3>
                
                <h4>3.1 Age Requirements</h4>
                <p>You must be at least 18 years old to create an account. For users under 18, a parent or legal guardian must create and manage the account.</p>

                <h4>3.2 Account Responsibility</h4>
                <p>You are responsible for:</p>
                <ul>
                    <li>Providing accurate, current, and complete information during registration</li>
                    <li>Maintaining the security of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized access or security breach</li>
                </ul>

                <h3>4. User Responsibilities</h3>
                
                <h4>4.1 Accurate Information</h4>
                <p>You agree to provide accurate and up-to-date health information. While we facilitate the storage and sharing of health records, you are responsible for the accuracy of the information you enter.</p>

                <h4>4.2 Prohibited Activities</h4>
                <p>You agree NOT to:</p>
                <ul>
                    <li>Use the Services for any illegal or unauthorized purpose</li>
                    <li>Impersonate another person or entity</li>
                    <li>Upload false, misleading, or fraudulent health information</li>
                    <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                    <li>Interfere with or disrupt the Services or servers</li>
                    <li>Use automated scripts or bots to access the Services</li>
                </ul>

                <h3>5. Medical Disclaimer</h3>
                <p><strong>NexusCare is NOT a substitute for professional medical advice, diagnosis, or treatment.</strong></p>
                <ul>
                    <li>Our Services are designed to help you manage and share your health records, not to provide medical advice</li>
                    <li>Always seek the advice of qualified healthcare professionals for any medical questions or concerns</li>
                    <li>Never disregard professional medical advice or delay seeking it because of information accessed through our Services</li>
                    <li>In case of a medical emergency, call emergency services immediately</li>
                </ul>

                <h3>6. Privacy and Data Protection</h3>
                <p>Your privacy is important to us. Our collection, use, and protection of your personal and health information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>

                <h3>7. Limitation of Liability</h3>
                <p>To the fullest extent permitted by law:</p>
                <ul>
                    <li>NexusCare is provided "as is" without warranties of any kind</li>
                    <li>We are not liable for any indirect, incidental, special, or consequential damages</li>
                    <li>We are not responsible for medical outcomes or healthcare decisions made based on information stored or accessed through our Services</li>
                    <li>Our total liability shall not exceed the amount you paid to us in the past 12 months (if any)</li>
                </ul>

                <h3>8. Changes to Terms</h3>
                <p>We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last Updated" date. Your continued use of the Services after changes take effect constitutes acceptance of the revised Terms.</p>

                <h3>9. Contact Information</h3>
                <p>For questions about these Terms of Service, please contact us:</p>
                <ul>
                    <li><strong>Email:</strong> contact.nexuscare@gmail.com</li>
                    <li><strong>Phone:</strong> +94 72 9696 918 / +94 77 877 5035</li>
                    <li><strong>Address:</strong> Colombo, Sri Lanka</li>
                </ul>
            `
        },
        cookies: {
            title: 'Cookie Policy',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />',
            content: `
                <p>We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and improve our services. Cookies help us understand how visitors interact with our website so we can deliver better performance and functionality.</p>

                <p>By continuing to use this website, you consent to the use of cookies in accordance with this policy. You can control or disable cookies at any time through your browser settings; however, some features of the website may not function properly if cookies are disabled.</p>

                <p>We do not use cookies to collect personally identifiable information without your explicit consent.</p>

                <p>For more information about how we handle data, please refer to our Privacy Policy.</p>
            `
        },
        refund: {
            title: 'Refund Policy',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />',
            content: `
                <p class="last-updated">Last Updated: December 19, 2025</p>
                
                <p><strong>Current Service Status:</strong> NexusCare's basic services are currently provided free of charge. This Refund Policy will apply to any future premium features, subscriptions, or paid services we may introduce.</p>

                <h3>1. Overview</h3>
                <p>At NexusCare, we are committed to your satisfaction. This Refund Policy outlines the conditions under which you may request a refund for any paid services, subscriptions, or features you purchase from us.</p>

                <h3>2. Free Services</h3>
                <p>Our core health record management features are provided free of charge and are not subject to refunds. These include:</p>
                <ul>
                    <li>Basic health record storage</li>
                    <li>Emergency access to health information</li>
                    <li>Healthcare provider sharing (basic features)</li>
                    <li>Standard security features</li>
                </ul>

                <h3>3. Refund Eligibility</h3>

                <h4>3.1 You ARE Eligible for a Refund If:</h4>
                <ul>
                    <li>You request a refund within 14 days of your initial purchase or subscription</li>
                    <li>You experience technical issues that we cannot resolve within a reasonable timeframe</li>
                    <li>We make significant changes to the service that materially reduce its value</li>
                    <li>The service is not as described or advertised</li>
                    <li>You are charged incorrectly due to a billing error</li>
                </ul>

                <h4>3.2 You ARE NOT Eligible for a Refund If:</h4>
                <ul>
                    <li>You have violated our Terms of Service</li>
                    <li>Your account has been terminated due to misuse</li>
                    <li>You have used the service extensively after the refund period</li>
                    <li>You simply changed your mind after the 14-day period</li>
                    <li>Technical issues are caused by your device, internet connection, or third-party services</li>
                </ul>

                <h3>4. How to Request a Refund</h3>
                <ol>
                    <li><strong>Contact Our Support Team:</strong> Email us at contact.nexuscare@gmail.com with "Refund Request" in the subject line</li>
                    <li><strong>Provide Required Information:</strong> Include your account email, transaction ID, date of purchase, and reason for the refund request</li>
                    <li><strong>Wait for Review:</strong> Our team will review your request within 5-7 business days</li>
                    <li><strong>Receive Decision:</strong> We will notify you via email whether your refund has been approved or denied</li>
                    <li><strong>Refund Processing:</strong> If approved, refunds are processed within 7-10 business days to your original payment method</li>
                </ol>

                <h3>5. Subscription Refunds</h3>

                <h4>5.1 Monthly Subscriptions</h4>
                <ul>
                    <li>You can cancel at any time before your next billing date</li>
                    <li>Cancellations take effect at the end of your current billing period</li>
                    <li>No prorated refunds for partial months unless required by law</li>
                    <li>You retain access to premium features until the end of the paid period</li>
                </ul>

                <h4>5.2 Annual Subscriptions</h4>
                <ul>
                    <li>Full refund if cancelled within 14 days of purchase</li>
                    <li>After 14 days, refunds are prorated based on unused months</li>
                    <li>A service fee may apply for administrative costs</li>
                </ul>

                <h3>6. Processing Time</h3>
                <p>Once your refund is approved:</p>
                <ul>
                    <li><strong>Credit/Debit Card:</strong> 7-10 business days</li>
                    <li><strong>Mobile Payment:</strong> 5-7 business days</li>
                    <li><strong>Bank Transfer:</strong> 10-14 business days</li>
                </ul>
                <p>The exact timing depends on your bank or payment provider's processing time.</p>

                <h3>7. Contact Us</h3>
                <p>For refund requests, questions, or concerns about this policy:</p>
                <ul>
                    <li><strong>Email:</strong> contact.nexuscare@gmail.com</li>
                    <li><strong>Subject Line:</strong> "Refund Request" or "Refund Policy Inquiry"</li>
                    <li><strong>Phone:</strong> +94 72 9696 918 / +94 77 877 5035</li>
                    <li><strong>Address:</strong> Colombo, Sri Lanka</li>
                </ul>
            `
        }
    };

    // Open modal when clicking legal links
    legalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.getAttribute('data-legal');
            const content = legalContent[type];
            
            if (content) {
                modalTitle.textContent = content.title;
                modalBody.innerHTML = content.content;
                legalModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal when clicking close button
    modalClose.addEventListener('click', () => {
        legalModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close modal when clicking outside
    legalModal.addEventListener('click', (e) => {
        if (e.target === legalModal) {
            legalModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && legalModal.classList.contains('active')) {
            legalModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});