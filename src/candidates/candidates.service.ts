import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './model/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}

  create(createCandidateDto: CreateCandidateDto) {
    const candidate = this.candidateRepository.create(createCandidateDto);
    return this.candidateRepository.save(candidate);
  }

  findAll() {
    return this.candidateRepository.find();
  }

  findOne(id: number) {
    return this.candidateRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.candidateRepository.delete({ id });
    return { deleted: true };
  }
}
