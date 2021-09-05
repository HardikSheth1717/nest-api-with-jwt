import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import SuccessResponse from '../common/responses/success.response';
import ErrorResponse from '../common/responses/error.response';
import User from '../dto/user.dto';
import SignIn from '../dto/signin.dto';
import RefreshToken from '../dto/refreshtoken.dto';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('/signup')
    async signup(@Body() user: User): Promise<SuccessResponse | ErrorResponse> {
        return this.authService.signup(user);
    };

    @Post('/signin')
    async signin(@Body() signin: SignIn): Promise<SuccessResponse | ErrorResponse> {
        return this.authService.signin(signin);
    };

    @Post('/renewAccessToken')
    async renewAccessToken(@Body() data: RefreshToken): Promise<SuccessResponse | ErrorResponse> {
        return this.authService.renewAccessToken(data.refreshToken);
    };
}