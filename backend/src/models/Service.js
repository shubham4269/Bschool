const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: [true, 'Slug is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        subtitle: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '🎓',
        },
        badge: {
            type: String,
            default: '',
        },
        shortDesc: {
            type: String,
            default: '',
        },
        duration: {
            type: String,
            default: '',
        },
        mode: {
            type: String,
            default: '',
        },
        cardBackgroundImage: {
            type: String,
            default: '',
        },
        heroBackgroundImage: {
            type: String,
            default: '',
        },
        overview: {
            type: [String],
            default: [],
        },
        eligibility: {
            type: [String],
            default: [],
        },
        highlights: {
            type: [
                {
                    icon: { type: String, default: '' },
                    title: { type: String, default: '' },
                    text: { type: String, default: '' },
                },
            ],
            default: [],
        },
        curriculum: {
            type: [String],
            default: [],
        },
        sidebarInfo: {
            type: [
                {
                    icon: { type: String, default: '' },
                    label: { type: String, default: '' },
                    value: { type: String, default: '' },
                },
            ],
            default: [],
        },
        whyChoose: {
            type: [String],
            default: [],
        },
        navDesc: {
            type: String,
            default: '',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        sortOrder: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret.__v;
                return ret;
            },
        },
    }
);

module.exports = mongoose.model('Service', serviceSchema);
