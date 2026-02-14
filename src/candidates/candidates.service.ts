import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Candidate,
  CandidateProfessionalData,
  candidateExcelColumns,
  isSeniority,
} from '@candidates/model/candidate.entity';
import { CandidateDto } from '@candidates/dto/create-candidate.dto';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}

  createFromExcel(body: Partial<CandidateDto>, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const workbook = xlsx.read(file.buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows: CandidateProfessionalData[] = xlsx.utils.sheet_to_json(sheet);

    if (rows.length !== 1) {
      throw new BadRequestException('Excel must contain exactly one row');
    }

    const excelData: CandidateProfessionalData = rows[0];

    this.validateExcelData(excelData);

    const candidateData: CandidateDto = {
      name: body.name!,
      surname: body.surname!,
      seniority: excelData[candidateExcelColumns.SENIORITY],
      years: Number(excelData[candidateExcelColumns.YEARS_OF_EXPERIENCE]),
      availability: Boolean(excelData[candidateExcelColumns.AVAILABILITY]),
    };

    const candidate = this.candidateRepository.create(candidateData);

    return this.candidateRepository.save(candidate);
  }

  validateExcelData(cadidateProfessionalData: CandidateProfessionalData) {
    // Validación de columnas obligatorias
    const requiredColumns = Object.values(candidateExcelColumns);

    for (const column of requiredColumns) {
      if (!(column in cadidateProfessionalData)) {
        throw new BadRequestException(`Missing column: ${column}`);
      }
    }

    const seniority = cadidateProfessionalData[candidateExcelColumns.SENIORITY];
    const years =
      cadidateProfessionalData[candidateExcelColumns.YEARS_OF_EXPERIENCE];
    const availability =
      cadidateProfessionalData[candidateExcelColumns.AVAILABILITY];

    if (isSeniority(seniority)) {
      throw new BadRequestException('Seniority must be junior or senior');
    }

    if (isNaN(years) || years < 0) {
      throw new BadRequestException(
        'Years of experience must be a valid number',
      );
    }

    if (typeof availability !== 'boolean') {
      throw new BadRequestException('Availability must be boolean');
    }
  }

  async findPaginated(page: number = 1, limit: number = 1) {
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if (limit > 100) limit = 100;

    const [data, total] = await this.candidateRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.candidateRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.candidateRepository.delete({ id });
    return { deleted: true };
  }
}
