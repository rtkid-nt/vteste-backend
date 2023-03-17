import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { TestResultEntity } from './entities/test-result.entity';
import { TestResultService } from './services/test-result.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestResultEntity]), UsersModule],
  providers: [TestResultService],
  exports: [TestResultService],
})
export class TestResultsModule {}
