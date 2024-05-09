import mongoose from 'mongoose';
import { Accounts } from '~/types/account';
const { Schema } = mongoose;

const accountSchema = new Schema(
   {
      username: {
         type: String,
         unique: true,
         required: [true, '{VALUE} must be required.']
      },
      password: {
         type: String,
         required: [true, '{VALUE} must be required.']
      },
      provider: {
         type: String,
         enum: Object.values(Accounts),
         default: Accounts.LOCAL
      },
      providerId: String
   },
   {
      timestamps: true
   }
);

const Account = mongoose.model('Account', accountSchema);

export default Account;
