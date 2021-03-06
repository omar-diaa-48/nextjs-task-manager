import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

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
    signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDTO):Promise<{ accessToken : string }>{
        return this.authService.signIn(authCredentialsDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
    }
}
