import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { log } from 'console';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    //injecting
    private readonly userService: UsersService,
  ) {}

  @Get('/:id?')
  @ApiResponse({
    status: 200,
    description: 'User Fetched successfully',
  })
  @ApiOperation({
    summary: 'Fetches a list of regustered users on the application ',
  })
  @ApiQuery({
    name: 'limit',
    type: 'Number',
    required: false,
    description: 'A description',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'Number',
    required: false,
    description: 'A description',
    example: 1,
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(getUsersParamDto, limit, page);
    //return this.userService.findOnebyId(2);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return 'You sent a post request';
  }

  @Patch()
  public patchUser(@Body() pathcUserDto: PatchUserDto) {
    return pathcUserDto;
  }
}
