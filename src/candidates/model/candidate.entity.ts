import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  seniority: 'junior' | 'senior';

  @Column('int')
  years: number;

  @Column()
  availability: boolean;
}

export interface CandidateProfessionalData {
  [candidateExcelColumns.SENIORITY]: Seniority;
  [candidateExcelColumns.YEARS_OF_EXPERIENCE]: number;
  [candidateExcelColumns.AVAILABILITY]: boolean;
}

export enum candidateExcelColumns {
  SENIORITY = 'Seniority',
  YEARS_OF_EXPERIENCE = 'Years of Experience',
  AVAILABILITY = 'Avaliability',
}

export type Seniority = 'junior' | 'senior';

export const seniorities = ['junior', 'senior'];

export function isSeniority(
  candidateSeniority: string,
): candidateSeniority is Seniority {
  return seniorities.includes(candidateSeniority);
}
