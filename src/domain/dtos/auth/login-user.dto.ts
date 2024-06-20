import { Validators } from "../../../configs";

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) {
      return ["Missing email"];
    }

    if (!password) {
      return ["Missing password"];
    }

    if (!Validators.email.test(email)) {
      return ["Email is not valid"];
    }

    return [undefined, new LoginUserDto(email.toLowerCase(), password)];
  }
}
