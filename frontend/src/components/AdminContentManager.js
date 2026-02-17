import React, { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function getToken() {
    return localStorage.getItem('bschool_admin_token');
}

function authHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

const EMPTY_ITEM = {
    slug: '', title: '', subtitle: '', icon: '🎓', badge: '', shortDesc: '',
    duration: '2 Years', mode: 'Full-time', cardBackgroundImage: '',
    heroBackgroundImage: '', navDesc: '',
    overview: [''], eligibility: [''], curriculum: [''], whyChoose: [''],
    highlights: [{ icon: '', title: '', text: '' }],
    sidebarInfo: [{ icon: '', label: '', value: '' }],
    sortOrder: 0, isActive: true,
};

const inputStyle = {
    width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '10px',
    fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none', transition: '0.3s ease',
    boxSizing: 'border-box',
};

const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#64748b',
    marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px',
};

const btnStyle = (bg, color) => ({
    padding: '8px 18px', borderRadius: '10px', border: 'none', background: bg,
    color: color, fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
    fontFamily: 'var(--font-sans)', transition: '0.3s ease',
});

function AdminContentManager({ type, onLogout }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // null = list view, object = form
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [uploadingCard, setUploadingCard] = useState(false);
    const [uploadingHero, setUploadingHero] = useState(false);

    const endpoint = type === 'services' ? 'services' : 'specializations';
    const singular = type === 'services' ? 'Service' : 'Specialization';

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/${endpoint}/admin/all`, { headers: authHeaders() });
            if (res.status === 401) { onLogout?.(); return; }
            const data = await res.json();
            if (data.success) setItems(data[endpoint] || []);
        } catch (err) {
            setMessage(`Failed to fetch ${endpoint}.`);
        } finally {
            setLoading(false);
        }
    }, [endpoint, onLogout]);

    useEffect(() => { fetchItems(); }, [fetchItems]);

    const handleImageUpload = async (file, type) => {
        if (!file) return;
        
        const setUploading = type === 'card' ? setUploadingCard : setUploadingHero;
        setUploading(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch(`${API_URL}/api/upload/image`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                const field = type === 'card' ? 'cardBackgroundImage' : 'heroBackgroundImage';
                setEditing({ ...editing, [field]: data.url });
                setMessage(`✅ ${type === 'card' ? 'Card' : 'Hero'} image uploaded successfully!`);
            } else {
                setMessage(`❌ ${data.message || 'Failed to upload image.'}`);
            }
        } catch (err) {
            setMessage('❌ Error uploading image.');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        setMessage('');
        try {
            const isNew = !editing._id;
            const url = isNew ? `${API_URL}/api/${endpoint}` : `${API_URL}/api/${endpoint}/${editing._id}`;
            const method = isNew ? 'POST' : 'PUT';

            // Clean arrays: remove empty strings
            const cleaned = { ...editing };
            cleaned.overview = cleaned.overview.filter(s => s.trim());
            cleaned.eligibility = cleaned.eligibility.filter(s => s.trim());
            cleaned.curriculum = cleaned.curriculum.filter(s => s.trim());
            cleaned.whyChoose = cleaned.whyChoose.filter(s => s.trim());
            cleaned.highlights = cleaned.highlights.filter(h => h.title.trim() || h.text.trim());
            cleaned.sidebarInfo = cleaned.sidebarInfo.filter(s => s.label.trim() || s.value.trim());

            const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(cleaned) });
            const data = await res.json();

            if (data.success) {
                setMessage(`✅ ${singular} ${isNew ? 'created' : 'updated'} successfully!`);
                setEditing(null);
                fetchItems();
            } else {
                setMessage(`❌ ${data.message || 'Failed to save.'}`);
            }
        } catch (err) {
            setMessage(`❌ Error saving ${singular.toLowerCase()}.`);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
        try {
            const res = await fetch(`${API_URL}/api/${endpoint}/${id}`, { method: 'DELETE', headers: authHeaders() });
            const data = await res.json();
            if (data.success) {
                setMessage(`🗑️ "${title}" deleted.`);
                fetchItems();
            }
        } catch (err) {
            setMessage('❌ Failed to delete.');
        }
    };

    const toggleActive = async (item) => {
        try {
            await fetch(`${API_URL}/api/${endpoint}/${item._id}`, {
                method: 'PUT', headers: authHeaders(),
                body: JSON.stringify({ isActive: !item.isActive }),
            });
            fetchItems();
        } catch (err) { /* silent */ }
    };

    // Array field helpers
    const updateArrayField = (field, index, value) => {
        const arr = [...editing[field]];
        arr[index] = value;
        setEditing({ ...editing, [field]: arr });
    };
    const addArrayItem = (field) => {
        setEditing({ ...editing, [field]: [...editing[field], ''] });
    };
    const removeArrayItem = (field, index) => {
        const arr = editing[field].filter((_, i) => i !== index);
        setEditing({ ...editing, [field]: arr.length ? arr : [''] });
    };

    // Object array helpers (highlights, sidebarInfo)
    const updateObjArray = (field, index, key, value) => {
        const arr = [...editing[field]];
        arr[index] = { ...arr[index], [key]: value };
        setEditing({ ...editing, [field]: arr });
    };
    
    // Default icons for highlights and sidebar
    const defaultHighlightIcons = ['🎯', '💼', '🌍', '🏢', '📚', '💡', '🎓', '⭐'];
    const defaultSidebarIcons = ['⏱️', '📋', '📍', '💰', '📊', '🎯'];
    
    const addObjItem = (field, template) => {
        if (field === 'highlights') {
            const iconIndex = editing[field].length % defaultHighlightIcons.length;
            template.icon = defaultHighlightIcons[iconIndex];
        } else if (field === 'sidebarInfo') {
            const iconIndex = editing[field].length % defaultSidebarIcons.length;
            template.icon = defaultSidebarIcons[iconIndex];
        }
        setEditing({ ...editing, [field]: [...editing[field], { ...template }] });
    };
    
    const removeObjItem = (field, index) => {
        const arr = editing[field].filter((_, i) => i !== index);
        if (arr.length === 0) {
            const defaultIcon = field === 'highlights' ? defaultHighlightIcons[0] : defaultSidebarIcons[0];
            arr.push(field === 'highlights' ? { icon: defaultIcon, title: '', text: '' } : { icon: defaultIcon, label: '', value: '' });
        }
        setEditing({ ...editing, [field]: arr });
    };

    // ===== FORM VIEW =====
    if (editing) {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--gray-900)' }}>
                        {editing._id ? `Edit ${singular}` : `New ${singular}`}
                    </h2>
                    <button onClick={() => setEditing(null)} style={btnStyle('#f1f5f9', '#64748b')}>← Back to List</button>
                </div>

                {message && (
                    <div style={{
                        padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.9rem',
                        background: message.startsWith('✅') ? '#ecfdf5' : '#fef2f2',
                        color: message.startsWith('✅') ? '#065f46' : '#991b1b',
                        border: `1px solid ${message.startsWith('✅') ? '#a7f3d0' : '#fecaca'}`,
                    }}>{message}</div>
                )}

                <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px' }}>
                    {/* Basic Fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        <div>
                            <label style={labelStyle}>Slug (URL path) *</label>
                            <input style={inputStyle} value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="e.g. mba-admission" />
                        </div>
                        <div>
                            <label style={labelStyle}>Title *</label>
                            <input style={inputStyle} value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="e.g. MBA Admission" />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={labelStyle}>Subtitle</label>
                            <textarea style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} value={editing.subtitle} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} />
                        </div>
                        <div>
                            <label style={labelStyle}>Icon (emoji)</label>
                            <input style={inputStyle} value={editing.icon} onChange={e => setEditing({ ...editing, icon: e.target.value })} />
                        </div>
                        <div>
                            <label style={labelStyle}>Badge</label>
                            <input style={inputStyle} value={editing.badge} onChange={e => setEditing({ ...editing, badge: e.target.value })} placeholder="e.g. Popular" />
                        </div>
                        <div>
                            <label style={labelStyle}>Short Description</label>
                            <input style={inputStyle} value={editing.shortDesc} onChange={e => setEditing({ ...editing, shortDesc: e.target.value })} />
                        </div>
                        <div>
                            <label style={labelStyle}>Nav Description</label>
                            <input style={inputStyle} value={editing.navDesc} onChange={e => setEditing({ ...editing, navDesc: e.target.value })} />
                        </div>
                        <div>
                            <label style={labelStyle}>Duration</label>
                            <input style={inputStyle} value={editing.duration} onChange={e => setEditing({ ...editing, duration: e.target.value })} />
                        </div>
                        <div>
                            <label style={labelStyle}>Mode</label>
                            <input style={inputStyle} value={editing.mode} onChange={e => setEditing({ ...editing, mode: e.target.value })} />
                        </div>
                        <div>
                            <label style={labelStyle}>Sort Order</label>
                            <input type="number" style={inputStyle} value={editing.sortOrder} onChange={e => setEditing({ ...editing, sortOrder: parseInt(e.target.value) || 0 })} />
                        </div>
                    </div>

                    {/* Image Upload Fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                        {/* Card Background Image */}
                        <div>
                            <label style={labelStyle}>Card Background Image</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files[0], 'card')}
                                    disabled={uploadingCard}
                                    style={{ ...inputStyle, padding: '8px' }}
                                />
                                {uploadingCard && <div style={{ fontSize: '0.85rem', color: '#6366f1' }}>⏳ Uploading...</div>}
                                {editing.cardBackgroundImage && (
                                    <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
                                        <img src={editing.cardBackgroundImage} alt="Card preview" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                        <button
                                            onClick={() => setEditing({ ...editing, cardBackgroundImage: '' })}
                                            style={{ position: 'absolute', top: '8px', right: '8px', ...btnStyle('#ef4444', 'white'), padding: '4px 8px', fontSize: '0.75rem' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Hero Background Image */}
                        <div>
                            <label style={labelStyle}>Hero Background Image</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files[0], 'hero')}
                                    disabled={uploadingHero}
                                    style={{ ...inputStyle, padding: '8px' }}
                                />
                                {uploadingHero && <div style={{ fontSize: '0.85rem', color: '#6366f1' }}>⏳ Uploading...</div>}
                                {editing.heroBackgroundImage && (
                                    <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
                                        <img src={editing.heroBackgroundImage} alt="Hero preview" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                        <button
                                            onClick={() => setEditing({ ...editing, heroBackgroundImage: '' })}
                                            style={{ position: 'absolute', top: '8px', right: '8px', ...btnStyle('#ef4444', 'white'), padding: '4px 8px', fontSize: '0.75rem' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
                        <input type="checkbox" checked={editing.isActive} onChange={e => setEditing({ ...editing, isActive: e.target.checked })} id="is-active-toggle" />
                        <label htmlFor="is-active-toggle" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>Active (visible on site)</label>
                    </div>

                    {/* Array Fields */}
                    {[
                        { field: 'overview', label: 'Overview Paragraphs' },
                        { field: 'eligibility', label: 'Eligibility Criteria' },
                        { field: 'curriculum', label: 'Curriculum Items' },
                        { field: 'whyChoose', label: 'Why Choose Us Points' },
                    ].map(({ field, label }) => (
                        <div key={field} style={{ marginBottom: '20px' }}>
                            <label style={labelStyle}>{label}</label>
                            {(editing[field] || ['']).map((val, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <textarea style={{ ...inputStyle, minHeight: '40px', resize: 'vertical', flex: 1 }} value={val} onChange={e => updateArrayField(field, i, e.target.value)} />
                                    <button onClick={() => removeArrayItem(field, i)} style={btnStyle('#fef2f2', '#ef4444')} title="Remove">✕</button>
                                </div>
                            ))}
                            <button onClick={() => addArrayItem(field)} style={btnStyle('#f0fdf4', '#16a34a')}>+ Add</button>
                        </div>
                    ))}

                    {/* Highlights */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Highlights</label>
                        {(editing.highlights || []).map((h, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 2fr auto', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                                <div style={{ fontSize: '1.5rem', textAlign: 'center', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>{h.icon || '🎯'}</div>
                                <input style={inputStyle} value={h.title} onChange={e => updateObjArray('highlights', i, 'title', e.target.value)} placeholder="Title" />
                                <input style={inputStyle} value={h.text} onChange={e => updateObjArray('highlights', i, 'text', e.target.value)} placeholder="Description" />
                                <button onClick={() => removeObjItem('highlights', i)} style={btnStyle('#fef2f2', '#ef4444')}>✕</button>
                            </div>
                        ))}
                        <button onClick={() => addObjItem('highlights', { icon: '', title: '', text: '' })} style={btnStyle('#f0fdf4', '#16a34a')}>+ Add Highlight</button>
                    </div>

                    {/* Sidebar Info */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={labelStyle}>Sidebar Info</label>
                        {(editing.sidebarInfo || []).map((s, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1fr auto', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                                <div style={{ fontSize: '1.5rem', textAlign: 'center', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>{s.icon || '⏱️'}</div>
                                <input style={inputStyle} value={s.label} onChange={e => updateObjArray('sidebarInfo', i, 'label', e.target.value)} placeholder="Label" />
                                <input style={inputStyle} value={s.value} onChange={e => updateObjArray('sidebarInfo', i, 'value', e.target.value)} placeholder="Value" />
                                <button onClick={() => removeObjItem('sidebarInfo', i)} style={btnStyle('#fef2f2', '#ef4444')}>✕</button>
                            </div>
                        ))}
                        <button onClick={() => addObjItem('sidebarInfo', { icon: '', label: '', value: '' })} style={btnStyle('#f0fdf4', '#16a34a')}>+ Add Info</button>
                    </div>

                    {/* Save */}
                    <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                        <button onClick={handleSave} disabled={saving || !editing.slug || !editing.title}
                            style={{ ...btnStyle('linear-gradient(135deg, #4f46e5, #7c3aed)', 'white'), padding: '12px 32px', opacity: saving ? 0.6 : 1 }}>
                            {saving ? '⏳ Saving...' : '💾 Save'}
                        </button>
                        <button onClick={() => setEditing(null)} style={btnStyle('#f1f5f9', '#64748b')}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    // ===== LIST VIEW =====
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--gray-900)' }}>
                    {type === 'services' ? '🎓 Services' : '📚 Specializations'} ({items.length})
                </h2>
                <button onClick={() => setEditing({ ...EMPTY_ITEM })}
                    style={{ ...btnStyle('linear-gradient(135deg, #4f46e5, #7c3aed)', 'white'), padding: '10px 24px' }}>
                    + Add {singular}
                </button>
            </div>

            {message && (
                <div style={{
                    padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.9rem',
                    background: message.startsWith('✅') || message.startsWith('🗑') ? '#ecfdf5' : '#fef2f2',
                    color: message.startsWith('✅') || message.startsWith('🗑') ? '#065f46' : '#991b1b',
                }}>{message}</div>
            )}

            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                {loading ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray-400)' }}>⏳ Loading...</div>
                ) : items.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray-400)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📭</div>
                        No {endpoint} found. Click "Add {singular}" to create one.
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                {['#', 'Icon', 'Title', 'Slug', 'Badge', 'Status', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '700', color: 'var(--gray-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id} style={{ borderBottom: '1px solid #f1f5f9' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '12px 16px', color: 'var(--gray-400)' }}>{item.sortOrder}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '1.3rem' }}>{item.icon}</td>
                                    <td style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--gray-800)' }}>{item.title}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--gray-500)', fontFamily: 'monospace', fontSize: '0.82rem' }}>/{endpoint === 'services' ? 'service' : 'specialization'}/{item.slug}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        {item.badge && <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600', background: '#eef2ff', color: '#4f46e5' }}>{item.badge}</span>}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <button onClick={() => toggleActive(item)} style={{
                                            padding: '4px 14px', borderRadius: '999px', border: 'none', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer',
                                            background: item.isActive ? '#ecfdf5' : '#fef2f2', color: item.isActive ? '#059669' : '#dc2626'
                                        }}>
                                            {item.isActive ? '● Active' : '○ Inactive'}
                                        </button>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button onClick={() => setEditing({ 
                                                ...EMPTY_ITEM, 
                                                ...item, 
                                                overview: item.overview?.length ? item.overview : [''], 
                                                eligibility: item.eligibility?.length ? item.eligibility : [''], 
                                                curriculum: item.curriculum?.length ? item.curriculum : [''], 
                                                whyChoose: item.whyChoose?.length ? item.whyChoose : [''], 
                                                highlights: item.highlights?.length ? item.highlights : [{ icon: '', title: '', text: '' }], 
                                                sidebarInfo: item.sidebarInfo?.length ? item.sidebarInfo : [{ icon: '', label: '', value: '' }],
                                                cardBackgroundImage: item.cardBackgroundImage || '',
                                                heroBackgroundImage: item.heroBackgroundImage || ''
                                            })}
                                                style={btnStyle('#eef2ff', '#4f46e5')}>✏️ Edit</button>
                                            <button onClick={() => handleDelete(item._id, item.title)} style={btnStyle('#fef2f2', '#ef4444')}>🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminContentManager;
