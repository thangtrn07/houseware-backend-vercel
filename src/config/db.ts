import mongoose from 'mongoose';
import { MONGOOSE_URI } from './index';

const connectMongodb = async (uri?: string) => {
   const connectionString: string = uri || MONGOOSE_URI;
   try {
      await mongoose.connect(connectionString, { retryWrites: true, w: 'majority' });
      console.log('🚀 ~ connectMongodb ~ Successfully');
   } catch (error) {
      console.log('🚀 ~ connectMongodb ~ Error');
      throw new Error(error);
   }
};

export default connectMongodb;
