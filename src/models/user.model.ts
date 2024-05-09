import mongoose from 'mongoose';
import { Roles } from '~/types/roles';
const { Schema } = mongoose;

const useSchema = new Schema(
   {
      fullname: {
         type: String,
         required: [true, 'Fullname must be required.']
      },
      image: {
         type: String,
         default:
            'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=1060&t=st=1714115540~exp=1714116140~hmac=e909dd4d0e3d1d492972f614ced50a7b10522900c3136dae90660c7263313039'
      },
      phone: String,
      address: String,
      account: {
         type: Schema.ObjectId,
         ref: 'Account'
      },
      role: {
         type: String,
         enum: Object.values(Roles),
         default: Roles.STAFF
      }
   },
   {
      timestamps: true
   }
);

const User = mongoose.model('User', useSchema);

export default User;
