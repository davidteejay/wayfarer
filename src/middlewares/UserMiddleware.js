import Model from '../models/Model';
import returnError from '../helpers/errorHandler';

const Users = new Model('users');

export default class UserMiddleware {
  static async validateUserData (req, res, next){
    
  }
}
