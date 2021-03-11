import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CaslModule } from './casl/casl.module';
import { PoliciesGuard } from './casl/policy.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ProjectsModule,
    AuthModule,
    ProjectsModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard
    }
  ],
})
export class AppModule {}
