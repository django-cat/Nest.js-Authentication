import { PartialType, PickType } from '@nestjs/mapped-types'
import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Password only accepts english and number',
  })
  password: string
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export class AuthenticateUserDTO extends PickType(CreateUserDTO, [
  'username',
  'password',
] as const) {}
