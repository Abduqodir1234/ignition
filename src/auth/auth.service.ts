import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { RegisterUserInput } from './dto/register-user.input';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schema/user';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async create(createUserInput: RegisterUserInput) {
    const hash = await argon.hash(createUserInput.password);

    if (await this.userModel.exists({ email: createUserInput.email }))
      throw new Error('User exists with this email');

    const newTask = new this.userModel({
      email: createUserInput.email,
      password: hash,
    });

    return newTask.save();
  }

  async login(loginInput: LoginInput) {
    const user = await this.userModel.findOne({ email: loginInput.email });

    if (!user) throw new Error('User not found');

    const isValid = argon.verify(user.password, loginInput.password);

    if (!isValid) throw new Error('Password not valid');

    return this.signToken(user.id);
  }

  async signToken(userId: number): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
