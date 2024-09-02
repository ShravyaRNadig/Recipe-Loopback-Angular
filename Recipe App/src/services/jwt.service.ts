import {injectable} from '@loopback/core';
import * as jwt from 'jsonwebtoken';

@injectable()
export class JWTService {
  private secretKey = 'your-secret-key'; // Store this in environment variables in production

  generateToken(userId: string): string {
    const token = jwt.sign({id: userId}, this.secretKey, {expiresIn: '1h'});
    return token;
  }

  verifyToken(token: string): object | string {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
