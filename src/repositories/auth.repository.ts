import Account from '~/models/account.model';
import User from '~/models/user.model';
import filterUndefinedOrNullFields from '~/utils/filterUndefineOrNull';
import { BadRequestException, NotFoundException } from '~/utils/response';

class AuthRepository {
   async register({ username, password, fullname, phone, address }) {
      const isExist = await Account.findOne({ username });

      if (isExist) {
         throw new BadRequestException('Username have already exist.');
      }

      const account = await Account.create(filterUndefinedOrNullFields({ username, password }));

      if (!account) {
         throw new BadRequestException('Đã có lỗi');
      }

      const user = await User.create(
         filterUndefinedOrNullFields({ fullname, phone, address, account: account?._id })
      );

      const result = await User.findOne({ _id: user._id }).populate('account').select('-password');

      return result;
   }

   async changePassword({ username, password }) {
      const result = await Account.findOneAndUpdate({ username }, { password });
      if (!result) {
         throw new BadRequestException('Not found account to change password.');
      }
      return result;
   }
}

export default AuthRepository;
