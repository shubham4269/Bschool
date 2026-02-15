const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            trim: true,
        },
        course: {
            type: String,
            default: 'Not specified',
        },
        message: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'converted', 'closed'],
            default: 'new',
        },
        notes: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                ret.createdAt = ret.createdAt.toISOString();
                if (ret.updatedAt) ret.updatedAt = ret.updatedAt.toISOString();
                delete ret.__v;
                return ret;
            },
        },
    }
);

module.exports = mongoose.model('Lead', leadSchema);
