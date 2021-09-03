import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
        ){}

    async signUp(authCredentialsDto:AuthCredentialsDTO):Promise<void>{
        return this.userRepository.signUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto:AuthCredentialsDTO){
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException('Invalid credentials')
        }
    }
}
