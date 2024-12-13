import mongoose from 'mongoose';

const ebookSchema = new mongoose.Schema({
  serial: {
    type: Number,
    required: true, // Mandatory field
    unique: true,   // Ensures uniqueness for each eBook
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    INR: {
      type: Number,
      required: true,
      default: 0,
    },
    USD: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  author: {
    type: String,
    required: true,
  },
  cover_img: {
    type: String,
    required: false, // Optional field
  },
  fileName: {
    type: String,
    required: true, // Mandatory field
    unique: true,   // Ensures uniqueness for each eBook
  },
  category: {
    tabs: {
      type: [String], // Array of strings for category tabs
      required: true, // Mandatory field
      default: ["ambitious"], // Default value
    },
    tags: {
      type: [String], // Array of strings for tags
      required: false, // Optional field
    },
  },
});

// Corrected model creation and naming
const eBook = mongoose.models.eBook || mongoose.model('eBook', ebookSchema, 'eBooks');

export default eBook;
