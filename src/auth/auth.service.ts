import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials';
import { JwtPayload } from './dto/jwt-payload';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,

        private jwtService: JwtService
        ){}

    async signUp(authCredentialsDto:AuthCredentialsDTO):Promise<void>{
        return this.userRepository.signUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto:AuthCredentialsDTO):Promise<{ accessToken : string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload : JwtPayload = {
            username
        }

        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
