import React from 'react';
import PageHero from '../components/PageHero';

function TermsAndConditions() {
    return (
        <>
            <PageHero
                title="Terms & Conditions"
                subtitle="These terms govern your use of the Bschool Bridge website and services. Please read them carefully."
                gradient="linear-gradient(135deg, #0ea5e9, #06b6d4)"
                icon="📜"
            />

            <section style={{ padding: '80px 24px', maxWidth: '860px', margin: '0 auto' }}>
                <div className="legal-content">
                    <p className="legal-updated">Last Updated: February 15, 2026</p>

                    <div className="legal-section">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the Bschool Bridge website (<strong>bschoolbridge.in</strong>) and its services (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must not use our website or services.
                        </p>
                        <p>
                            These Terms constitute a legally binding agreement between you ("User," "you," or "your") and Bschool Bridge ("Company," "we," "our," or "us"). We reserve the right to modify these Terms at any time, and your continued use of the Services constitutes acceptance of any changes.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>2. Description of Services</h2>
                        <p>Bschool Bridge provides the following education counseling and admission guidance services:</p>
                        <ul>
                            <li><strong>Career Counseling:</strong> Personalized guidance on MBA, PGDM, and management program options</li>
                            <li><strong>College Recommendations:</strong> Shortlisting of suitable B-schools based on your profile and preferences</li>
                            <li><strong>Application Support:</strong> Assistance with application forms, SOPs, LORs, and documentation</li>
                            <li><strong>Interview Preparation:</strong> Mock interviews, GD preparation, and WAT coaching</li>
                            <li><strong>Information Portal:</strong> Educational content about MBA programs, entrance exams, and career paths</li>
                            <li><strong>Admission Facilitation:</strong> Connecting students with partner educational institutions</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>3. User Eligibility</h2>
                        <p>To use our Services, you must:</p>
                        <ul>
                            <li>Be at least 16 years of age</li>
                            <li>Have the legal capacity to enter into binding agreements</li>
                            <li>Provide accurate and truthful information in all forms and communications</li>
                            <li>Not use the Services for any unlawful or unauthorized purpose</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>4. User Responsibilities</h2>
                        <p>As a user of our Services, you agree to:</p>
                        <ul>
                            <li><strong>Provide Accurate Information:</strong> All information submitted through our forms, including academic records, contact details, and professional background, must be truthful and accurate</li>
                            <li><strong>Maintain Confidentiality:</strong> If you are provided with login credentials for any dashboard or portal, you are responsible for maintaining their confidentiality</li>
                            <li><strong>Respect Intellectual Property:</strong> Not copy, reproduce, distribute, or create derivative works based on our content without written permission</li>
                            <li><strong>Use Respectfully:</strong> Not engage in any behavior that is abusive, threatening, or harassing towards our staff or counselors</li>
                            <li><strong>Comply with Laws:</strong> Use our Services in compliance with all applicable local, state, and national laws</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>5. Service Fees & Payment</h2>
                        <h3>5.1 Free Services</h3>
                        <p>
                            Certain services, including initial counseling consultations, general information access, and profile evaluations, are offered free of charge. These free services may be modified or discontinued at our discretion.
                        </p>

                        <h3>5.2 Paid Services</h3>
                        <p>
                            If applicable, paid services will be clearly communicated with their fees before you commit. Payment terms include:
                        </p>
                        <ul>
                            <li>All fees are quoted in Indian Rupees (INR) unless otherwise specified</li>
                            <li>Payment must be made through the designated payment channels provided by us</li>
                            <li>Service fees are non-refundable once the counseling process has commenced, unless otherwise stated in writing</li>
                            <li>We reserve the right to modify our fee structure with prior notice</li>
                        </ul>

                        <h3>5.3 Refund Policy</h3>
                        <p>
                            Refund requests will be evaluated on a case-by-case basis. Refunds may be granted under the following circumstances:
                        </p>
                        <ul>
                            <li>Service not initiated within 30 days of payment</li>
                            <li>Duplicate payment made in error</li>
                            <li>Technical issues preventing service delivery on our end</li>
                        </ul>
                        <p>Refunds will not be granted for dissatisfaction with admission outcomes, as admissions are ultimately decided by institutions.</p>
                    </div>

                    <div className="legal-section">
                        <h2>6. Intellectual Property Rights</h2>
                        <p>
                            All content on the Bschool Bridge website, including but not limited to:
                        </p>
                        <ul>
                            <li>Text, articles, guides, and educational content</li>
                            <li>Graphics, logos, icons, and visual elements</li>
                            <li>Website design, layout, and user interface</li>
                            <li>Software, code, and underlying technology</li>
                            <li>Trademarks, service marks, and brand names</li>
                        </ul>
                        <p>
                            are the exclusive property of Bschool Bridge and are protected by Indian copyright and trademark laws. You are granted a limited, non-exclusive, non-transferable license to access and use the website for personal, non-commercial purposes only.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>7. Prohibited Activities</h2>
                        <p>You agree not to:</p>
                        <ul>
                            <li>Scrape, crawl, or use automated means to access our website content</li>
                            <li>Attempt to gain unauthorized access to our systems or databases</li>
                            <li>Upload malicious code, viruses, or harmful software</li>
                            <li>Impersonate another person or entity</li>
                            <li>Use our Services to spam, harass, or harm others</li>
                            <li>Reproduce or redistribute our content for commercial purposes without consent</li>
                            <li>Interfere with or disrupt the integrity or performance of our website</li>
                            <li>Provide false or misleading academic/professional information</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>8. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by applicable law, Bschool Bridge and its officers, directors, employees, and agents shall not be liable for:
                        </p>
                        <ul>
                            <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                            <li>Any loss of profits, revenue, data, or goodwill</li>
                            <li>Any admission rejections from educational institutions</li>
                            <li>Any inaccuracies in college data, rankings, or placement statistics</li>
                            <li>Service interruptions caused by circumstances beyond our reasonable control</li>
                        </ul>
                        <p>
                            Our total liability for any claim arising under these Terms shall not exceed the amount you have paid to us for the specific service in question.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>9. Indemnification</h2>
                        <p>
                            You agree to indemnify, defend, and hold harmless Bschool Bridge, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising from:
                        </p>
                        <ul>
                            <li>Your use of or inability to use our Services</li>
                            <li>Your violation of these Terms</li>
                            <li>Your violation of any rights of a third party</li>
                            <li>Any false or misleading information you provide to us</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>10. Privacy</h2>
                        <p>
                            Your use of our Services is also governed by our <a href="/privacy-policy" style={{ color: 'var(--primary-500)', textDecoration: 'underline' }}>Privacy Policy</a>, which describes how we collect, use, and protect your personal information. By using our Services, you consent to the data practices described in our Privacy Policy.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>11. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your access to our Services at any time, without prior notice, for any reason, including but not limited to:
                        </p>
                        <ul>
                            <li>Violation of these Terms</li>
                            <li>Providing false or misleading information</li>
                            <li>Engaging in prohibited activities</li>
                            <li>Non-payment of applicable fees</li>
                        </ul>
                        <p>
                            Upon termination, your right to use our Services will immediately cease. Provisions of these Terms that by their nature should survive termination shall remain in effect.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>12. Governing Law & Jurisdiction</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located inBilashpur House, Dadijee Lane, Boring Rd, Patna, Bihar 800001.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>13. Dispute Resolution</h2>
                        <p>
                            In the event of any dispute or disagreement, both parties agree to first attempt to resolve the matter through good-faith negotiation. If the dispute cannot be resolved amicably within 30 days, either party may pursue resolution through arbitration in accordance with the Arbitration and Conciliation Act, 1996.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>14. Severability</h2>
                        <p>
                            If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>15. Contact Us</h2>
                        <p>For any questions or concerns regarding these Terms and Conditions, please contact us:</p>
                        <ul>
                            <li><strong>Email:</strong> legal@bschoolbridge.in</li>
                            <li><strong>Phone:</strong>+917903415288
+917670848963</li>
                            <li><strong>Address:</strong> Bschool Bridge,Bilashpur House, Dadijee Lane, Boring Rd, Patna, Bihar 800001</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TermsAndConditions;
