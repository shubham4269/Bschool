const mongoose = require('mongoose');

const partnerCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  showOnHomepage: {
    type: Boolean,
    default: false
  },
  logos: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      default: 0
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('PartnerCategory', partnerCategorySchema);
