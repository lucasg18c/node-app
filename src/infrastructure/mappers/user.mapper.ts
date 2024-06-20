import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }): any {
    const { id, _id, name, email, password, roles } = object;

    if (!_id && !id) {
      throw CustomError.badRequest("id is required");
    }

    if (!name) {
      throw CustomError.badRequest("name is required");
    }

    if (!email) {
      throw CustomError.badRequest("email is required");
    }

    if (!password) {
      throw CustomError.badRequest("password is required");
    }

    if (!roles) {
      throw CustomError.badRequest("roles is required");
    }

    return new UserEntity(id, _id, name, email, password, roles);
  }
}
