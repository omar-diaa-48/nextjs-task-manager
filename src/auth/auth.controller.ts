import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDTO):Promise<void>{
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDTO){
        return this.authService.signIn(authCredentialsDto)
    }
}
