import React, { useState, useEffect, useCallback } from 'react';
import AdminContentManager from '../components/AdminContentManager';
import HeroSliderManager from '../components/HeroSliderManager';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const STATUS_CONFIG = {
    new: { label: 'New', color: '#1E3A8A', bg: '#eff6ff' },
    contacted: { label: 'Contacted', color: '#f59e0b', bg: '#fffbeb' },
    converted: { label: 'Converted', color: '#10b981', bg: '#ecfdf5' },
    closed: { label: 'Closed', color: '#ef4444', bg: '#fef2f2' },
};

const COURSE_LABELS = {
    mba: 'MBA Admission',
    pgdm: 'PGDM Admission',
    'mba-without-cat': 'MBA Without CAT',
    'direct-mba': 'Direct MBA',
    'executive-mba': 'Executive MBA',
    'distance-mba': 'Distance / Online MBA',
    'Not specified': 'Not Specified',
};

// ===== AUTH HELPER =====
function getToken() {
    return localStorage.getItem('bschool_admin_token');
}

function setToken(token) {
    localStorage.setItem('bschool_admin_token', token);
}

function removeToken() {
    localStorage.removeItem('bschool_admin_token');
}

function authHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

// ===== LOGIN COMPONENT =====
function AdminLogin({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                setToken(data.token);
                onLogin(data.admin);
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('Unable to connect to server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0A1119 0%, #111827 40%, #1E3A8A 100%)',
            padding: '24px',
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '48px 40px',
                maxWidth: '440px',
                width: '100%',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                        width: '64px', height: '64px',
                        background: 'linear-gradient(to right, #1E3A8A, #20282D)',
                        borderRadius: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.6rem', fontWeight: '900', color: 'white',
                        fontFamily: "var(--font-heading)",
                        margin: '0 auto 20px',
                        boxShadow: '0 0 30px rgba(30, 58, 138, 0.2)',
                    }}>
                        B
                    </div>
                    <h1 style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '8px',
                    }}>
                        Admin Login
                    </h1>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                    }}>
                        Sign in to access the Bschool Bridge dashboard
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '12px',
                        padding: '14px 18px',
                        color: '#fca5a5',
                        fontSize: '0.9rem',
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        ❌ {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: '8px',
                            letterSpacing: '0.5px',
                        }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            id="admin-username"
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '2px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '0.95rem',
                                fontFamily: "'Inter', sans-serif",
                                outline: 'none',
                                transition: '0.3s ease',
                                boxSizing: 'border-box',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#1E3A8A';
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.06)';
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: '8px',
                            letterSpacing: '0.5px',
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            id="admin-password"
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '2px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '0.95rem',
                                fontFamily: "'Inter', sans-serif",
                                outline: 'none',
                                transition: '0.3s ease',
                                boxSizing: 'border-box',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#1E3A8A';
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.06)';
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        id="admin-login-btn"
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'linear-gradient(to right, #1E3A8A, #20282D)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '700',
                            fontFamily: "'Inter', sans-serif",
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: '0.3s ease',
                            opacity: loading ? 0.7 : 1,
                            boxShadow: '0 4px 15px rgba(30, 58, 138, 0.3)',
                        }}
                    >
                        {loading ? '⏳ Signing in...' : '🔐 Sign In'}
                    </button>
                </form>

                <div style={{
                    marginTop: '28px',
                    padding: '16px',
                    background: 'rgba(30, 58, 138, 0.06)',
                    borderRadius: '12px',
                    border: '1px solid rgba(30, 58, 138, 0.12)',
                }}>
                    <div style={{
                        fontSize: '0.8rem',
                        color: 'rgba(255, 255, 255, 0.4)',
                        textAlign: 'center',
                        lineHeight: '1.6',
                    }}>
                        🔒 This area is restricted to authorized administrators only.
                    </div>
                </div>
            </div>
        </div>
    );
}

// ===== ADMIN DASHBOARD COMPONENT =====
function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecking, setAuthChecking] = useState(true);
    const [adminInfo, setAdminInfo] = useState(null);
    const [leads, setLeads] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLead, setSelectedLead] = useState(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('leads');

    // Verify existing token on mount
    useEffect(() => {
        const verifyToken = async () => {
            const token = getToken();
            if (!token) {
                setAuthChecking(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/api/admin/verify`, {
                    method: 'POST',
                    headers: authHeaders(),
                });
                const data = await res.json();
                if (data.success) {
                    setIsAuthenticated(true);
                    setAdminInfo(data.admin);
                } else {
                    removeToken();
                }
            } catch {
                removeToken();
            } finally {
                setAuthChecking(false);
            }
        };

        verifyToken();
    }, []);

    const handleLogin = (admin) => {
        setIsAuthenticated(true);
        setAdminInfo(admin);
    };

    const handleLogout = () => {
        removeToken();
        setIsAuthenticated(false);
        setAdminInfo(null);
        setLeads([]);
        setStats(null);
    };

    const fetchLeads = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            if (filterStatus !== 'all') params.append('status', filterStatus);
            if (searchQuery) params.append('search', searchQuery);

            const res = await fetch(`${API_URL}/api/leads?${params}`, {
                headers: authHeaders(),
            });
            const data = await res.json();

            if (res.status === 401) {
                handleLogout();
                return;
            }

            if (data.success) {
                setLeads(data.leads);
            }
        } catch (err) {
            setError('Failed to fetch leads. Make sure the backend server is running.');
        } finally {
            setLoading(false);
        }
    }, [filterStatus, searchQuery]);

    const fetchStats = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/leads/stats`, {
                headers: authHeaders(),
            });
            const data = await res.json();
            if (data.success) setStats(data);
        } catch (err) {
            // Stats load silently
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchLeads();
            fetchStats();
        }
    }, [isAuthenticated, fetchLeads, fetchStats]);

    const updateLeadStatus = async (id, status) => {
        try {
            const res = await fetch(`${API_URL}/api/leads/${id}`, {
                method: 'PATCH',
                headers: authHeaders(),
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                fetchLeads();
                fetchStats();
                if (selectedLead && selectedLead.id === id) {
                    setSelectedLead({ ...selectedLead, status });
                }
            }
        } catch (err) {
            alert('Failed to update lead status.');
        }
    };

    const deleteLead = async (id) => {
        if (!window.confirm('Are you sure you want to delete this lead?')) return;
        try {
            const res = await fetch(`${API_URL}/api/leads/${id}`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            const data = await res.json();
            if (data.success) {
                fetchLeads();
                fetchStats();
                if (selectedLead && selectedLead.id === id) setSelectedLead(null);
            }
        } catch (err) {
            alert('Failed to delete lead.');
        }
    };

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getCourseLabel = (course) => COURSE_LABELS[course] || course;

    // Show loading while verifying token
    if (authChecking) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #0A1119 0%, #111827 40%, #1E3A8A 100%)',
            }}>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🔐</div>
                    <div style={{ fontSize: '1.1rem', opacity: 0.7 }}>Verifying session...</div>
                </div>
            </div>
        );
    }

    // Show login if not authenticated
    if (!isAuthenticated) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    // Authenticated dashboard
    return (
        <div style={{ background: '#f1f5f9', minHeight: '100vh', paddingTop: '100px' }}>
            <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px 60px' }}>

                {/* Header with Logout */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '36px',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}>
                    <div>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '800',
                            color: 'var(--gray-900)', marginBottom: '8px',
                        }}>
                            📊 Admin Dashboard
                        </h1>
                        <p style={{ color: 'var(--gray-500)', fontSize: '1rem' }}>
                            Manage and track all incoming leads from the contact form.
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'var(--gray-500)',
                            fontWeight: '500',
                        }}>
                            👤 {adminInfo?.username || 'Admin'}
                        </span>
                        <button
                            onClick={handleLogout}
                            id="admin-logout-btn"
                            style={{
                                padding: '10px 24px',
                                borderRadius: '999px',
                                border: '2px solid #e2e8f0',
                                background: 'white',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-sans)',
                                color: '#64748b',
                                transition: '0.3s ease',
                            }}
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{
                    display: 'flex', gap: '4px', marginBottom: '28px',
                    background: 'white', borderRadius: '14px', padding: '5px',
                    border: '1px solid #e2e8f0', width: 'fit-content',
                }}>
                    {[
                        { key: 'leads', label: '📋 Leads', count: stats?.stats?.total },
                        { key: 'services', label: '🎓 Services' },
                        { key: 'specializations', label: '📚 Specializations' },
                        { key: 'hero-slider', label: '🎬 Hero Slider' },
                        { key: 'blogs', label: '📝 Blog' },
                        { key: 'partners', label: '🤝 Partners' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            id={`tab-${tab.key}`}
                            style={{
                                padding: '10px 24px', borderRadius: '10px', border: 'none',
                                fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer',
                                fontFamily: 'var(--font-sans)', transition: '0.3s ease',
                                background: activeTab === tab.key ? 'var(--gradient-primary)' : 'transparent',
                                color: activeTab === tab.key ? 'white' : '#64748b',
                            }}
                        >
                            {tab.label}{tab.count != null ? ` (${tab.count})` : ''}
                        </button>
                    ))}
                </div>

                {/* Services Tab */}
                {activeTab === 'services' && (
                    <AdminContentManager type="services" onLogout={handleLogout} />
                )}

                {/* Specializations Tab */}
                {activeTab === 'specializations' && (
                    <AdminContentManager type="specializations" onLogout={handleLogout} />
                )}

                {/* Hero Slider Tab */}
                {activeTab === 'hero-slider' && (
                    <HeroSliderManager onLogout={handleLogout} />
                )}

                {/* Blogs Tab */}
                {activeTab === 'blogs' && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h2 style={{ marginBottom: '20px', color: '#2d3748' }}>Blog Management</h2>
                        <p style={{ marginBottom: '30px', color: '#718096' }}>
                            Manage your blog posts from the dedicated blog management page.
                        </p>
                        <a
                            href="/admin/blogs"
                            style={{
                                display: 'inline-block',
                                background: 'linear-gradient(to right, #667eea, #764ba2)',
                                color: 'white',
                                padding: '14px 32px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                transition: 'all 0.3s',
                            }}
                        >
                            Go to Blog Management
                        </a>
                    </div>
                )}

                {/* Partners Tab */}
                {activeTab === 'partners' && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h2 style={{ marginBottom: '20px', color: '#2d3748' }}>Partner Management</h2>
                        <p style={{ marginBottom: '30px', color: '#718096' }}>
                            Manage academic partner logos and categories.
                        </p>
                        <a
                            href="/admin/partners"
                            style={{
                                display: 'inline-block',
                                background: 'linear-gradient(to right, #667eea, #764ba2)',
                                color: 'white',
                                padding: '14px 32px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                transition: 'all 0.3s',
                            }}
                        >
                            Go to Partner Management
                        </a>
                    </div>
                )}


                {/* Leads Tab */}
                {activeTab === 'leads' && (<>
                    {/* Stats Cards */}
                    {stats && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '16px',
                            marginBottom: '32px',
                        }}>
                            {[
                                { label: 'Total Leads', value: stats.stats.total, icon: '📋', gradient: 'linear-gradient(to right, #1E3A8A, #20282D)' },
                                { label: 'New Leads', value: stats.stats.new, icon: '🆕', gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' },
                                { label: 'Contacted', value: stats.stats.contacted, icon: '📞', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
                                { label: 'Converted', value: stats.stats.converted, icon: '✅', gradient: 'linear-gradient(135deg, #10b981, #14b8a6)' },
                                { label: "Today's Leads", value: stats.stats.today, icon: '📅', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
                            ].map((stat, i) => (
                                <div key={i} style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    border: '1px solid #e2e8f0',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px',
                                        background: stat.gradient, borderRadius: '50%', opacity: 0.1,
                                    }} />
                                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{stat.icon}</div>
                                    <div style={{
                                        fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800',
                                        color: 'var(--gray-900)', lineHeight: 1,
                                    }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: '4px', fontWeight: '500' }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Filters Bar */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '20px 24px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginBottom: '24px',
                    }}>
                        <div style={{ flex: 1, minWidth: '240px' }}>
                            <input
                                type="text"
                                placeholder="🔍 Search by name, email, phone, or course..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px 18px', border: '2px solid #e2e8f0',
                                    borderRadius: '12px', fontSize: '0.9rem', fontFamily: 'var(--font-sans)',
                                    outline: 'none', transition: '0.3s ease',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#1E3A8A'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                id="admin-search"
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {['all', 'new', 'contacted', 'converted', 'closed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '999px',
                                        border: 'none',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-sans)',
                                        transition: '0.3s ease',
                                        background: filterStatus === status ? 'var(--gradient-primary)' : '#f1f5f9',
                                        color: filterStatus === status ? 'white' : '#64748b',
                                    }}
                                    id={`filter-${status}`}
                                >
                                    {status === 'all' ? 'All' : STATUS_CONFIG[status]?.label || status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div style={{
                            background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px',
                            padding: '16px 20px', color: '#991b1b', marginBottom: '24px', fontSize: '0.95rem',
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Leads Table */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden',
                    }}>
                        {loading ? (
                            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray-400)' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏳</div>
                                Loading leads...
                            </div>
                        ) : leads.length === 0 ? (
                            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray-400)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📭</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--gray-600)', marginBottom: '8px' }}>
                                    No leads found
                                </div>
                                <div style={{ fontSize: '0.9rem' }}>
                                    {filterStatus !== 'all' || searchQuery
                                        ? 'Try adjusting your filters or search query.'
                                        : 'Leads submitted via the contact form will appear here.'}
                                </div>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                            {['Name', 'Email', 'Phone', 'Program', 'Status', 'Date', 'Actions'].map((h) => (
                                                <th key={h} style={{
                                                    padding: '14px 16px', textAlign: 'left', fontWeight: '700',
                                                    color: 'var(--gray-600)', fontSize: '0.8rem', textTransform: 'uppercase',
                                                    letterSpacing: '0.5px', whiteSpace: 'nowrap',
                                                }}>
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leads.map((lead) => {
                                            const statusConf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                                            return (
                                                <tr
                                                    key={lead.id}
                                                    style={{
                                                        borderBottom: '1px solid #f1f5f9',
                                                        cursor: 'pointer',
                                                        transition: '0.2s ease',
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                    onClick={() => setSelectedLead(lead)}
                                                >
                                                    <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--gray-800)' }}>
                                                        {lead.name}
                                                    </td>
                                                    <td style={{ padding: '14px 16px', color: 'var(--gray-600)' }}>{lead.email}</td>
                                                    <td style={{ padding: '14px 16px', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>{lead.phone}</td>
                                                    <td style={{ padding: '14px 16px', color: 'var(--gray-600)' }}>{getCourseLabel(lead.course)}</td>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        <span style={{
                                                            display: 'inline-block', padding: '4px 14px', borderRadius: '999px',
                                                            fontSize: '0.78rem', fontWeight: '600',
                                                            background: statusConf.bg, color: statusConf.color,
                                                        }}>
                                                            {statusConf.label}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '14px 16px', color: 'var(--gray-400)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                                        {formatDate(lead.createdAt)}
                                                    </td>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        <div style={{ display: 'flex', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
                                                            <select
                                                                value={lead.status}
                                                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                                                style={{
                                                                    padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                                                    fontSize: '0.8rem', fontFamily: 'var(--font-sans)', cursor: 'pointer',
                                                                    background: 'white', outline: 'none',
                                                                }}
                                                            >
                                                                <option value="new">New</option>
                                                                <option value="contacted">Contacted</option>
                                                                <option value="converted">Converted</option>
                                                                <option value="closed">Closed</option>
                                                            </select>
                                                            <button
                                                                onClick={() => deleteLead(lead.id)}
                                                                style={{
                                                                    padding: '6px 10px', borderRadius: '8px', border: '1px solid #fecaca',
                                                                    background: '#fff', cursor: 'pointer', fontSize: '0.85rem',
                                                                }}
                                                                title="Delete lead"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Lead count */}
                    {!loading && leads.length > 0 && (
                        <div style={{
                            marginTop: '16px', fontSize: '0.85rem', color: 'var(--gray-400)', textAlign: 'right',
                        }}>
                            Showing {leads.length} lead{leads.length !== 1 ? 's' : ''}
                        </div>
                    )}

                    {/* Lead Detail Modal */}
                    {selectedLead && (
                        <div
                            style={{
                                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                zIndex: 9999, padding: '24px',
                            }}
                            onClick={() => setSelectedLead(null)}
                        >
                            <div
                                style={{
                                    background: 'white', borderRadius: '20px', padding: '36px',
                                    maxWidth: '560px', width: '100%', maxHeight: '80vh', overflowY: 'auto',
                                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                                    marginBottom: '28px',
                                }}>
                                    <div>
                                        <h2 style={{
                                            fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '700',
                                            color: 'var(--gray-900)', marginBottom: '4px',
                                        }}>
                                            {selectedLead.name}
                                        </h2>
                                        <span style={{
                                            display: 'inline-block', padding: '4px 14px', borderRadius: '999px',
                                            fontSize: '0.78rem', fontWeight: '600',
                                            background: (STATUS_CONFIG[selectedLead.status] || STATUS_CONFIG.new).bg,
                                            color: (STATUS_CONFIG[selectedLead.status] || STATUS_CONFIG.new).color,
                                        }}>
                                            {(STATUS_CONFIG[selectedLead.status] || STATUS_CONFIG.new).label}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedLead(null)}
                                        style={{
                                            background: 'none', border: 'none', fontSize: '1.5rem',
                                            cursor: 'pointer', color: 'var(--gray-400)', lineHeight: 1,
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                    {[
                                        { label: 'Email', value: selectedLead.email, icon: '✉️' },
                                        { label: 'Phone', value: selectedLead.phone, icon: '📞' },
                                        { label: 'Interested Program', value: getCourseLabel(selectedLead.course), icon: '🎓' },
                                        { label: 'Submitted On', value: formatDate(selectedLead.createdAt), icon: '📅' },
                                    ].map((item, i) => (
                                        <div key={i} style={{
                                            display: 'flex', gap: '14px', alignItems: 'center',
                                            padding: '14px 16px', background: '#f8fafc', borderRadius: '12px',
                                        }}>
                                            <div style={{ fontSize: '1.2rem', width: '36px', textAlign: 'center' }}>{item.icon}</div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                    {item.label}
                                                </div>
                                                <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--gray-800)', marginTop: '2px' }}>
                                                    {item.value}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {selectedLead.message && (
                                        <div style={{
                                            padding: '16px', background: '#f8fafc', borderRadius: '12px',
                                        }}>
                                            <div style={{
                                                fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: '600',
                                                textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px',
                                            }}>
                                                💬 Message
                                            </div>
                                            <div style={{
                                                fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: '1.7',
                                                whiteSpace: 'pre-wrap',
                                            }}>
                                                {selectedLead.message}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div style={{
                                    display: 'flex', gap: '10px', marginTop: '28px', paddingTop: '20px',
                                    borderTop: '1px solid #e2e8f0',
                                }}>
                                    <select
                                        value={selectedLead.status}
                                        onChange={(e) => {
                                            updateLeadStatus(selectedLead.id, e.target.value);
                                            setSelectedLead({ ...selectedLead, status: e.target.value });
                                        }}
                                        style={{
                                            flex: 1, padding: '12px 16px', borderRadius: '12px', border: '2px solid #e2e8f0',
                                            fontSize: '0.9rem', fontFamily: 'var(--font-sans)', cursor: 'pointer',
                                            outline: 'none',
                                        }}
                                    >
                                        <option value="new">🆕 New</option>
                                        <option value="contacted">📞 Contacted</option>
                                        <option value="converted">✅ Converted</option>
                                        <option value="closed">❌ Closed</option>
                                    </select>
                                    <button
                                        onClick={() => { deleteLead(selectedLead.id); setSelectedLead(null); }}
                                        style={{
                                            padding: '12px 24px', borderRadius: '12px', border: '2px solid #fecaca',
                                            background: '#fff', cursor: 'pointer', fontSize: '0.9rem',
                                            fontFamily: 'var(--font-sans)', fontWeight: '600', color: '#ef4444',
                                        }}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>)}
            </div>
        </div>
    );
}

export default AdminDashboard;
