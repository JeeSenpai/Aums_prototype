import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from './utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    // async validateUser(username: string, pass: string): Promise<any> {
    //      const user = await this.usersService.findUserByUsername(username);
    //      if (user) {
    //         const matched = comparePassword(pass, user.password)
    //           if(matched){
    //             const { password, ...result } = user;
    //              return result;
    //           }
    //     }
    //    }

      async login(user: any) {
        const name = await this.usersService.findUserByUsername(user.username);
        const matched = await comparePassword(user.password, name.password);
         if(name && matched){ 
                const payload = { username: user.username, sub: user.id };
                return {
                   access_token: this.jwtService.sign(payload),
                 };  
         }
         else{
          return new HttpException('User Not Found', HttpStatus.NOT_FOUND);
         }
       
      }  
}
