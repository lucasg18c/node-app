import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../configs";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorization = req.header("Authorization");

      if (!authorization) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await UserModel.findById(payload.id);

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.body.user = user;

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
