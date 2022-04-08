import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth Login')
@Controller('auth')
export class AuthController {
       constructor(private authService: AuthService) {}
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.body);
    }
}
