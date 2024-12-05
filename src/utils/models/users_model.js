import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Mandatory field
  },
  email: {
    type: String,
    required: true, // Mandatory field
    unique: true,   // Ensures email uniqueness
  },
  booksPurchased: [
    {
      title: {
        type: String,
        required: true, // Mandatory field
      },
      price: {
        type: Number,
        required: true, // Mandatory field
      },
      currency: {
        type: String,
        required: true, // Mandatory field
      },
      purchaseDate: {
        type: Date,
        default: Date.now, // Automatically sets the purchase date
      },
    },
  ],
});

// Creating the User model
const User = mongoose.models.User || mongoose.model('User', userSchema, 'Users_Data');

export default User;
