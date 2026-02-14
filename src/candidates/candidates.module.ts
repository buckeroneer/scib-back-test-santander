import { Module } from '@nestjs/common';
import { CandidatesService } from '@candidates/candidates.service';
import { CandidatesController } from '@candidates/candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from '@candidates/model/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate])],
  providers: [CandidatesService],
  controllers: [CandidatesController],
})
export class CandidatesModule {}
