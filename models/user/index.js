import mongoose from 'mongoose';

const userScehma = new mongoose.model(
  {
    id: String,
    name: String,
    year: String,
    author: String,
  },
  { timestamps: true }
);

const User = mongoose.models.Users || mongoose.model('user', userScehma);

export default User;
