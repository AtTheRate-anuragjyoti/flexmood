import mongoose from 'mongoose';

const ebookSchema = new mongoose.Schema({
  serial: {
    type: Number,
    required: true, // Assuming "serial" is mandatory
    unique: true,   // Ensuring it is unique for each eBook
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
    required: false, // Optional if not always provided
  },
  purchase_link: {
    ind: {
      type: String,
      required: false, // Optional if not always provided
    },
    int: {
      type: String,
      required: false, // Optional if not always provided
    },
  },
});

// Corrected model creation and naming
const eBook = mongoose.models.eBook || mongoose.model('eBook', ebookSchema, 'eBooks');

export default eBook;
