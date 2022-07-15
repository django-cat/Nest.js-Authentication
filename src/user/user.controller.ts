import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { DeleteResult } from 'typeorm'
import { User } from './user.entity'
import { UserService } from './user.service'
import { AuthenticateUserDTO, CreateUserDTO } from './userDTO'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  find(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id)
  }

  @Post('')
  createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.userService.delete(id)
  }

  @Post('login')
  login(
    @Body() authenticateUserDTO: AuthenticateUserDTO,
  ): Promise<{ accessToken: string }> {
    return this.userService.authenticate(authenticateUserDTO)
  }
}