import mongoose from 'mongoose';

const ebookSchema = new mongoose.Schema({
  serial: {
    type: Number,
    required: true,
    unique: true,
  },
  dynamic_serial: {
    type: Number,
    required: true,
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
    required: false,
  },
  fileName: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    tabs: {
      type: [String],
      required: true,
      default: ["ambitious"],
    },
    tags: {
      type: [String],
      required: false,
    },
  },
  // New fields added
  description: {
    type: String,
    required: true,
    default: "# About This Book\n\nDescription coming soon...", // Default markdown
  },
  contents: {
    type: String,
    required: true,
    default: "# Table of Contents\n\nContents coming soon...", // Default markdown
  }
});

const eBook = mongoose.models.eBook || mongoose.model('eBook', ebookSchema, 'eBooks');

export default eBook;