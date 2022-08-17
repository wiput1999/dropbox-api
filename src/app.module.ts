import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PrismaService } from './db/prisma.service'
import { FirebaseModule } from './firebase/firebase.module'
import { ContextModule } from './context/context.module'
import { ContextService } from './context/context.service'
import { EventModule } from './event/event.module'
import firebaseConfig from './config/firebase.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [firebaseConfig],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule, ContextModule],
      inject: [ConfigService, ContextService],
      useFactory: (
        configService: ConfigService,
        contextService: ContextService,
      ) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production'

        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          introspection: !isProduction,
          playground: !isProduction,
          debug: !isProduction,
          context: ({ req }) => contextService.createContext(req),
        }
      },
    }),
    FirebaseModule,
    AuthModule,
    ContextModule,
    UserModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
