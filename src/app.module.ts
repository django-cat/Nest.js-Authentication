import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.entity'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 0,
      database: process.env.DB,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
