import mongoose from 'mongoose';

const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected To MongoDb');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
