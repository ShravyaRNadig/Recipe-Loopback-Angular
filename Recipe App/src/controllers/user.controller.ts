import {inject} from '@loopback/core';
import {getJsonSchema, post, requestBody, response} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {JWTService} from '../services/jwt.service';

export class UserController {
  constructor(
    @inject('repositories.UserRepository') private userRepository: UserRepository,
    @inject('services.JWTService') private jwtService: JWTService,
  ) { }
  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchema(User),
        },
      },
    },
  })
  async signup(@requestBody() userData: User) {

    const savedUser = await this.userRepository.create(userData);
    // delete savedUser.password;
    return savedUser;
  }
  @post('/users/login')
  @response(200, {
    description: 'User login and JWT token generation',
    content: {'application/json': {schema: {type: 'string'}}},
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {email: string; password: string},
  ): Promise<{token: string}> {
    const user = await this.userRepository.findOne({
      where: {email: credentials.email, password: credentials.password},
    });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Handle id conversion
    if (user.id === undefined) {
      throw new Error('User ID is undefined');
    }

    const userIdString: string = user.id.toString(); // Convert to string safely
    const token = this.jwtService.generateToken(userIdString);
    return {token};
  }
}

