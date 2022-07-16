import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcrypt'
import { DeleteResult, Repository } from 'typeorm'
import { User } from './user.entity'
import { AuthenticateUserDTO, CreateUserDTO } from './userDTO'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    if (
      await this.userRepository.findOneBy({ username: createUserDTO.username })
    ) {
      throw new BadRequestException('Existing username')
    }
    const salt = await genSalt(10)
    createUserDTO.password = await hash(createUserDTO.password, salt)
    const user = this.userRepository.create(createUserDTO)
    await this.userRepository.save(user)
    return user
  }

  delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }

  async login(
    authenticateUserDTO: AuthenticateUserDTO,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneBy({
      username: authenticateUserDTO.username,
    })

    if (user && (await compare(authenticateUserDTO.password, user.password))) {
      const payload = { id: user.id }
      const accessToken = this.jwtService.sign(payload)
      return { accessToken }
    } else {
      throw new UnauthorizedException('Login Failed')
    }
  }
}
