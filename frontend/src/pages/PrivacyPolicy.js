import React from 'react';
import PageHero from '../components/PageHero';

function PrivacyPolicy() {
    return (
        <>
            <PageHero
                title="Privacy Policy"
                subtitle="Your privacy is important to us. This policy explains how Bschool Bridge collects, uses, and protects your personal information."
                gradient="linear-gradient(135deg, #4f46e5, #7c3aed)"
                icon="🔒"
            />

            <section style={{ padding: '80px 24px', maxWidth: '860px', margin: '0 auto' }}>
                <div className="legal-content">
                    <p className="legal-updated">Last Updated: February 15, 2026</p>

                    <div className="legal-section">
                        <h2>1. Introduction</h2>
                        <p>
                            Bschool Bridge ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website <strong>bschoolbridge.in</strong>, use our services, or interact with us in any way.
                        </p>
                        <p>
                            By using our website and services, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our website or services.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>2. Information We Collect</h2>
                        <h3>2.1 Personal Information</h3>
                        <p>We may collect the following personal information when you voluntarily provide it to us:</p>
                        <ul>
                            <li><strong>Contact Information:</strong> Full name, email address, phone number, and mailing address</li>
                            <li><strong>Educational Details:</strong> Academic qualifications, entrance exam scores, college preferences, and course interests</li>
                            <li><strong>Professional Information:</strong> Work experience, current employer, designation, and industry</li>
                            <li><strong>Communication Data:</strong> Messages, inquiries, and feedback submitted through our contact forms</li>
                            <li><strong>Application Data:</strong> Information provided during the admission counseling process</li>
                        </ul>

                        <h3>2.2 Automatically Collected Information</h3>
                        <p>When you visit our website, we may automatically collect certain information, including:</p>
                        <ul>
                            <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
                            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, and referral sources</li>
                            <li><strong>Cookies & Tracking:</strong> We use cookies and similar tracking technologies to enhance your browsing experience</li>
                            <li><strong>Location Data:</strong> Approximate geographic location based on your IP address</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>3. How We Use Your Information</h2>
                        <p>We use the information we collect for the following purposes:</p>
                        <ul>
                            <li><strong>Admission Counseling:</strong> To provide personalized MBA/PGDM admission guidance and college recommendations</li>
                            <li><strong>Communication:</strong> To respond to your inquiries, send updates about admission processes, and provide relevant information</li>
                            <li><strong>Service Improvement:</strong> To analyze website usage, improve our services, and enhance user experience</li>
                            <li><strong>Marketing:</strong> To send promotional materials, newsletters, and educational content (with your consent)</li>
                            <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                            <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, or security concerns</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>4. Information Sharing & Disclosure</h2>
                        <p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
                        <ul>
                            <li><strong>Partner Institutions:</strong> With B-schools and educational institutions you express interest in, to facilitate your admission process</li>
                            <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our website, conducting business, or servicing you</li>
                            <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental regulations</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of company assets</li>
                            <li><strong>Consent:</strong> With your explicit consent for any purpose not listed above</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <h2>5. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                        </p>
                        <ul>
                            <li>SSL/TLS encryption for data transmission</li>
                            <li>Secure server infrastructure with regular security audits</li>
                            <li>Access controls and authentication mechanisms</li>
                            <li>Regular data backup and disaster recovery procedures</li>
                        </ul>
                        <p>
                            However, no method of electronic transmission or storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>6. Cookies Policy</h2>
                        <p>Our website uses cookies and similar technologies to:</p>
                        <ul>
                            <li>Remember your preferences and settings</li>
                            <li>Analyze website traffic and usage patterns</li>
                            <li>Provide personalized content and recommendations</li>
                            <li>Measure the effectiveness of our marketing campaigns</li>
                        </ul>
                        <p>
                            You can control cookies through your browser settings. Disabling cookies may limit certain features of our website.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>7. Your Rights</h2>
                        <p>Under applicable data protection laws, you have the following rights:</p>
                        <ul>
                            <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
                            <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal data</li>
                            <li><strong>Right to Erasure:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                            <li><strong>Right to Restriction:</strong> Request restriction of processing of your personal data</li>
                            <li><strong>Right to Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                            <li><strong>Right to Complaint:</strong> Lodge a complaint with the relevant data protection authority</li>
                        </ul>
                        <p>
                            To exercise any of these rights, please contact us at <strong>privacy@bschoolbridge.in</strong>.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>8. Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites, including partner B-schools and educational resources. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party website you visit.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>9. Children's Privacy</h2>
                        <p>
                            Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a minor, please contact us immediately, and we will take steps to delete such information.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>10. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on our website with a revised "Last Updated" date. Your continued use of our services after any changes constitutes your acceptance of the updated policy.
                        </p>
                    </div>

                    <div className="legal-section">
                        <h2>11. Contact Us</h2>
                        <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
                        <ul>
                            <li><strong>Email:</strong> privacy@bschoolbridge.in</li>
                            <li><strong>Phone:</strong> +91 98765 43210</li>
                            <li><strong>Address:</strong> Bschool Bridge, New Delhi, India</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PrivacyPolicy;
