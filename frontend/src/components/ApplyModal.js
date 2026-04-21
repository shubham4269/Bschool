import React, { useState, useEffect } from 'react';
import { useApplyModal } from '../context/ApplyModalContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function ApplyModal() {
    const { isOpen, closeModal, preselectedCourse } = useApplyModal();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        entranceExam: '',
        percentile: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [animateIn, setAnimateIn] = useState(false);

    // Handle open animation & course preselection
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setAnimateIn(true), 10);
            if (preselectedCourse) {
                setFormData((prev) => ({ ...prev, course: preselectedCourse }));
            }
        } else {
            setAnimateIn(false);
        }
    }, [isOpen, preselectedCourse]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') handleClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    });

    const handleClose = () => {
        setAnimateIn(false);
        setTimeout(() => {
            closeModal();
            setSubmitted(false);
            setError('');
            setFormData({ 
                name: '', 
                email: '', 
                phone: '', 
                course: '', 
                entranceExam: '', 
                percentile: '', 
                message: '' 
            });
        }, 250);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // If entrance exam is being changed, reset percentile if exam is cleared
        if (name === 'entranceExam' && value === '') {
            setFormData({ ...formData, [name]: value, percentile: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setError('');
    };

    const handlePercentileChange = (e) => {
        const value = e.target.value;
        // Allow only numbers and decimal point, and limit to 0-100 range
        if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) <= 100)) {
            setFormData({ ...formData, percentile: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setSubmitted(true);
                setFormData({ 
                    name: '', 
                    email: '', 
                    phone: '', 
                    course: '', 
                    entranceExam: '', 
                    percentile: '', 
                    message: '' 
                });
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`apply-modal-overlay ${animateIn ? 'active' : ''}`}
            onClick={handleClose}
            id="apply-modal-overlay"
        >
            <div
                className={`apply-modal ${animateIn ? 'active' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="apply-modal-close"
                    onClick={handleClose}
                    aria-label="Close modal"
                    id="apply-modal-close"
                >
                    ✕
                </button>

                {submitted ? (
                    /* ===== SUCCESS STATE ===== */
                    <div className="apply-modal-success">
                        <div className="apply-modal-success-icon">🎉</div>
                        <h2 className="apply-modal-success-title">Application Submitted!</h2>
                        <p className="apply-modal-success-text">
                            Thank you for your interest! Our counselors will contact you within 24 hours with personalized guidance.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={handleClose}
                            id="apply-modal-done-btn"
                        >
                            Done ✓
                        </button>
                    </div>
                ) : (
                    /* ===== FORM STATE ===== */
                    <>
                        {/* Header */}
                        <div className="apply-modal-header">
                            <div className="apply-modal-header-icon">🎓</div>
                            <h2 className="apply-modal-title">Apply Now</h2>
                            <p className="apply-modal-subtitle">
                                Fill in your details and our expert counselors will get back to you within 24 hours.
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="apply-modal-error">
                                ❌ {error}
                            </div>
                        )}

                        {/* Form */}
                        <form className="apply-modal-form" onSubmit={handleSubmit} id="apply-modal-form">
                            <div className="apply-modal-row">
                                <div className="apply-modal-field">
                                    <label htmlFor="apply-name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="apply-name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="apply-modal-field">
                                    <label htmlFor="apply-email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="apply-email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="apply-modal-row">
                                <div className="apply-modal-field">
                                    <label htmlFor="apply-phone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="apply-phone"
                                        name="phone"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="apply-modal-field">
                                    <label htmlFor="apply-course">Interested Program</label>
                                    <select
                                        id="apply-course"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a program</option>
                                        <optgroup label="Programs">
                                            <option value="mba">MBA Admission</option>
                                            <option value="pgdm">PGDM Admission</option>
                                            <option value="mba-without-cat">MBA Without CAT</option>
                                            <option value="direct-mba">Direct MBA Admission</option>
                                            <option value="executive-mba">Executive MBA</option>
                                            <option value="distance-mba">Distance / Online MBA</option>
                                        </optgroup>
                                        <optgroup label="Specializations">
                                            <option value="mba-marketing">MBA Marketing</option>
                                            <option value="mba-finance">MBA Finance</option>
                                            <option value="mba-hr">MBA HR</option>
                                            <option value="mba-business-analytics">MBA Business Analytics</option>
                                            <option value="mba-operations">MBA Operations</option>
                                            <option value="mba-digital-marketing">MBA Digital Marketing</option>
                                            <option value="mba-international-business">MBA International Business</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>

                            {/* New Entrance Exam and Percentile Fields */}
                            <div className="apply-modal-row">
                                <div className="apply-modal-field">
                                    <label htmlFor="apply-entrance-exam">Entrance Exam <span style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(optional)</span></label>
                                    <select
                                        id="apply-entrance-exam"
                                        name="entranceExam"
                                        value={formData.entranceExam}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select an exam</option>
                                        <option value="CAT">CAT</option>
                                        <option value="XAT">XAT</option>
                                        <option value="CMAT">CMAT</option>
                                        <option value="GMAT">GMAT</option>
                                        <option value="MAT">MAT</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                {formData.entranceExam && (
                                    <div 
                                        className="apply-modal-field"
                                        style={{
                                            animation: 'fadeSlideIn 0.3s ease-out',
                                            transformOrigin: 'top'
                                        }}
                                    >
                                        <label htmlFor="apply-percentile">
                                            {formData.entranceExam} Percentile <span style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="apply-percentile"
                                            name="percentile"
                                            placeholder="Enter percentile (0-100)"
                                            value={formData.percentile}
                                            onChange={handlePercentileChange}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="apply-modal-field">
                                <label htmlFor="apply-message">Your Message <span style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(optional)</span></label>
                                <textarea
                                    id="apply-message"
                                    name="message"
                                    placeholder="Tell us about your background and goals..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg apply-modal-submit"
                                disabled={loading}
                                id="apply-modal-submit"
                            >
                                {loading ? '⏳ Submitting...' : 'Submit Application →'}
                            </button>

                            <p className="apply-modal-privacy">
                                🔒 Your information is 100% secure and will never be shared with third parties.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default ApplyModal;
