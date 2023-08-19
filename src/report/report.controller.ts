import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType } from '../data';
import { ReportService } from './report.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from '../dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) transactionType: string,
  ): ReportResponseDto[] {
    const validatedTransactionType =
      transactionType === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.getAllReports(validatedTransactionType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) transactionType: string,
    @Param('id', ParseUUIDPipe) reportId: string,
  ): ReportResponseDto {
    const validatedTransactionType =
      transactionType === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.getReportById(validatedTransactionType, reportId);
  }

  @Post()
  createReport(
    @Body() { source, amount }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) transactionType: string,
  ): ReportResponseDto {
    const validatedTransactionType =
      transactionType === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.createReport(validatedTransactionType, {
      source,
      amount,
    });
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('id', ParseUUIDPipe) reportId: string,
    @Param('type', new ParseEnumPipe(ReportType)) transactionType: string,
  ): ReportResponseDto {
    const validatedTransactionType =
      transactionType === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.updateReport(
      validatedTransactionType,
      reportId,
      body,
    );
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) reportId: string) {
    return this.reportService.deleteReport(reportId);
  }
}
