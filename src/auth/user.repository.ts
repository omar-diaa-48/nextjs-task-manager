import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { zip } from "rxjs/operators";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credentials";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto : AuthCredentialsDTO):Promise<void>{
        const { username, password } = authCredentialsDto

        const user = new User();
        user.username = username;
        user.password = password;

        try {
            await user.save();
        } catch (error) {
            if(error.code === '23505'){
                throw new ConflictException(`${username} already exitst`);
            }else{
                throw new InternalServerErrorException();
            }
            
        }
    }
}