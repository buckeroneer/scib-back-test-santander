import { seniorities } from '@candidates/model/candidate.entity';
import { IsString, IsIn, IsInt, IsBoolean } from 'class-validator';

export class CandidateDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsIn(seniorities)
  seniority: 'junior' | 'senior';

  @IsInt()
  years: number;

  @IsBoolean()
  availability: boolean;
}
