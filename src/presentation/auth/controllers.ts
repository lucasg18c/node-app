import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../configs";
import { UserModel } from "../../data/mongodb";
import { RegisterUser } from "../../domain/use-cases/auth/register-user.use-case";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { LoginUser } from "../../domain/use-cases/auth/login-user.use-case";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, dto] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    new RegisterUser(this.authRepository)
      .execute(dto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, dto] = LoginUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    new LoginUser(this.authRepository)
      .execute(dto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find().then((users) => {
      res.json({ users, user: req.body.user });
    });
  };
}
