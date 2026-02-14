import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidatesService } from './candidates.service';
import { CandidateDto } from '@candidates/dto/create-candidate.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() partialCandidateData: Partial<CandidateDto>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.candidatesService.createFromExcel(partialCandidateData, file);
  }

  @Get()
  getAllCandidates(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.candidatesService.findPaginated(Number(page), Number(limit));
  }

  @Get(':id')
  getCandidateById(@Param('id', ParseIntPipe) id: number) {
    return this.candidatesService.findOne(id);
  }

  @Delete(':id')
  deleteCandidate(@Param('id', ParseIntPipe) id: number) {
    return this.candidatesService.remove(id);
  }
}
