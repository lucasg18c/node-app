import { Validators } from "../../../configs";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) {
      return ["Missing name"];
    }

    if (!email) {
      return ["Missing email"];
    }

    if (!Validators.email.test(email)) {
      return ["Email is not valid"];
    }

    if (!password) {
      return ["Missing password"];
    }

    if (password.length < 8) {
      return ["Password is too short (min 8 chars.)"];
    }

    return [
      undefined,
      new RegisterUserDto(name, email.toLowerCase(), password),
    ];
  }
}
