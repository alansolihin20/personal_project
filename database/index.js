import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://alansolihin60:DONS200903@cluster0.lvgffum.mongodb.net/');
    console.log('Connected to mongodb');
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
