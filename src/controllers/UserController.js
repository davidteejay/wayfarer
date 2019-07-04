import Model from '../models/Model';
import { serverError } from '../helpers/errorHandler';

const Users = new Model('users');

export default class UserController {
  static async getAllUsers(req, res) {
    try {
      return res.json({
        data: await Users.select(),
        status: 'success',
      });
    } catch (err) {
      return serverError(req, res, err);
    }
  }
}
