import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import * as path from "path";

export class JWTService {
  private readonly privateKey;
  private readonly publicKey;
  constructor(private readonly keypath: string) {
    this.privateKey = fs.readFileSync(path.join(keypath, "private.key"), { encoding: "utf-8" });
    this.publicKey = fs.readFileSync(path.join(keypath, "public.key"), { encoding: "utf-8" });
  }

  signToken(payload: object) {
    return jwt.sign(payload, this.privateKey, { algorithm: "RS256", issuer: "todak", expiresIn: "1d" });
  }

  verifyToken<T>(token: string): T & jwt.JwtPayload {
    const payload = jwt.verify(token, this.publicKey, { algorithms: ["RS256"] });
    return payload as T & jwt.JwtPayload;
  }
}
