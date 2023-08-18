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
import { ReportType } from './data';
import { AppService } from './app.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) transactionType: string,
  ): ReportResponseDto[] {
    const validatedTransactionType =
      transactionType === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getAllReports(validatedTransactionType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) transactionType: string,
    @Param('id', ParseUUIDPipe) reportId: string,
  ): ReportResponseDto {
    const validatedTransactionType =
      transactionType === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getReportById(validatedTransactionType, reportId);
  }

  @Post()
  createReport(
    @Body() { source, amount }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) transactionType: string,
  ): ReportResponseDto {
    const validatedTransactionType =
      transactionType === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(validatedTransactionType, {
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

    return this.appService.updateReport(
      validatedTransactionType,
      reportId,
      body,
    );
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) reportId: string) {
    return this.appService.deleteReport(reportId);
  }
}
