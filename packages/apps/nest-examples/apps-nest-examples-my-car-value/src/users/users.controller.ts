import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersCreateOneDto } from './dtos/users.createOne.dto';
import { UsersService } from './users.service';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UsersUserDto } from './dtos/users.user.dto';
import { UsersEntity } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './users.decorators';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize<typeof UsersEntity, typeof UsersUserDto>(UsersUserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: UsersEntity | null) {
    return user;
  }

  @Post('/signup')
  async usersCreateOne(
    @Body() body: UsersCreateOneDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signup(body.email, body.password);

    session.userId = user.id;

    return user;
  }

  @Get('/signout')
  async usersSignout(@Session() session: any) {
    delete session.userId;
    // session.userId = null;
  }

  @Post('/signin')
  async usersSignin(@Body() body: UsersCreateOneDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);

    session.userId = user.id;

    return user;
  }

  @Get()
  usersFindMany(@Query('email') email: string) {
    return this.usersService.findMany(email);
  }

  @Get('/:id')
  usersFindOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Patch('/:id')
  usersUpdateOnePartial(
    @Param('id') id: string,
    @Body() partialUserEntity: UsersUpdateOnePartialDto,
  ) {
    return this.usersService.updateOnePartial(Number(id), partialUserEntity);
  }

  @Delete('/:id')
  usersRemoveOne(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
