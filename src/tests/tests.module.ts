import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TestResultsModule } from 'src/test-results/test-results.module';
import { UsersModule } from 'src/users/users.module';
import { TestController } from './controllers/test.controller';
import { TestEntity } from './entities/test.entity';
import { TestService } from './services/test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestEntity]),
    AuthModule,
    UsersModule,
    TestResultsModule,
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestsModule {}
