import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const Users = new Model('users');

export default class UserController {
  static async getAllUsers(req, res) {
    try {
      return res.status(200).json({
        data: await Users.select('id, first_name, last_name, email, is_admin'),
        status: 'success',
      });
    } catch (err) {
      return returnError(res, err.message, 500);
    }
  }
}
