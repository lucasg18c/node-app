import { JwtAdapter } from "../../../configs";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface LoggedInUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<LoggedInUser>;
}
type SignTokenFunction = (
  payload: Object,
  duration?: string
) => Promise<string | null>;
export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignTokenFunction = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<LoggedInUser> {
    const user = await this.authRepository.login(loginUserDto);
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}
