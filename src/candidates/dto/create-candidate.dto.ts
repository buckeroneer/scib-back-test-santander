import { IsString, IsIn, IsInt, IsBoolean } from 'class-validator';

export class CandidateDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsIn(['junior', 'senior'])
  seniority: 'junior' | 'senior';

  @IsInt()
  years: number;

  @IsBoolean()
  availability: boolean;
}
