import React, { useState, useEffect } from 'react';

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

const btnStyle = (bg, color) => ({
    padding: '8px 18px', borderRadius: '10px', border: 'none', background: bg,
    color: color, fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
    fontFamily: 'var(--font-sans)', transition: '0.3s ease',
});

function HeroSliderManager({ onLogout }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/settings/hero-images`);
            const data = await res.json();
            if (data.success) {
                setImages(data.images || []);
            }
        } catch (err) {
            setMessage('Failed to fetch images.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (file) => {
        if (!file) return;
        
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
                const newImages = [...images, data.url];
                await saveImages(newImages);
                setMessage('✅ Image uploaded successfully!');
            } else {
                setMessage(`❌ ${data.message || 'Failed to upload image.'}`);
            }
        } catch (err) {
            setMessage('❌ Error uploading image.');
        } finally {
            setUploading(false);
        }
    };

    const saveImages = async (newImages) => {
        try {
            const res = await fetch(`${API_URL}/api/settings/hero-images`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify({ images: newImages }),
            });

            const data = await res.json();
            if (data.success) {
                setImages(newImages);
            }
        } catch (err) {
            console.error('Error saving images:', err);
        }
    };

    const handleRemoveImage = async (index) => {
        if (!window.confirm('Remove this image from the slider?')) return;
        
        const newImages = images.filter((_, i) => i !== index);
        await saveImages(newImages);
        setMessage('🗑️ Image removed.');
    };

    const handleReorder = async (index, direction) => {
        const newImages = [...images];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (newIndex < 0 || newIndex >= newImages.length) return;
        
        [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
        await saveImages(newImages);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--gray-900)' }}>
                    🎬 Hero Slider Images ({images.length})
                </h2>
            </div>

            {message && (
                <div style={{
                    padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.9rem',
                    background: message.startsWith('✅') || message.startsWith('🗑') ? '#ecfdf5' : '#fef2f2',
                    color: message.startsWith('✅') || message.startsWith('🗑') ? '#065f46' : '#991b1b',
                    border: `1px solid ${message.startsWith('✅') || message.startsWith('🗑') ? '#a7f3d0' : '#fecaca'}`,
                }}>{message}</div>
            )}

            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px', marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Upload New Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    disabled={uploading}
                    style={{
                        width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '10px',
                        fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none',
                    }}
                />
                {uploading && <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#6366f1' }}>⏳ Uploading...</div>}
                <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#64748b' }}>
                    Recommended: 1920x1080px, JPG format, under 500KB
                </div>
            </div>

            {loading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray-400)' }}>⏳ Loading...</div>
            ) : images.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray-400)', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🖼️</div>
                    No images uploaded yet. Upload your first hero slider image above.
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {images.map((image, index) => (
                        <div key={index} style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                            <div style={{ position: 'relative', paddingTop: '56.25%', background: '#f8fafc' }}>
                                <img 
                                    src={image} 
                                    alt={`Slide ${index + 1}`} 
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600' }}>
                                    Slide {index + 1}
                                </div>
                            </div>
                            <div style={{ padding: '16px', display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        onClick={() => handleReorder(index, 'up')} 
                                        disabled={index === 0}
                                        style={{ ...btnStyle('#eef2ff', '#4f46e5'), opacity: index === 0 ? 0.5 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        onClick={() => handleReorder(index, 'down')} 
                                        disabled={index === images.length - 1}
                                        style={{ ...btnStyle('#eef2ff', '#4f46e5'), opacity: index === images.length - 1 ? 0.5 : 1, cursor: index === images.length - 1 ? 'not-allowed' : 'pointer' }}
                                    >
                                        ↓
                                    </button>
                                </div>
                                <button onClick={() => handleRemoveImage(index)} style={btnStyle('#fef2f2', '#ef4444')}>
                                    🗑️ Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HeroSliderManager;
