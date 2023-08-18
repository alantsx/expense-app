import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuidv4 } from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';

interface ReportData {
  amount: number;
  source: string;
}

interface UpdateReportData {
  amount?: number;
  source?: string;
}

@Injectable()
export class AppService {
  getAllReports(validatedTransactionType: ReportType): ReportResponseDto[] {
    const reports = data.report.filter(
      (report) => report.type === validatedTransactionType,
    );

    return reports.map((report) => new ReportResponseDto(report));
  }

  getReportById(
    validatedTransactionType: ReportType,
    reportId: string,
  ): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === validatedTransactionType)
      .find((report) => report.id === reportId);

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(
    validatedTransactionType: ReportType,
    { source, amount }: ReportData,
  ): ReportResponseDto {
    const newReport = {
      id: uuidv4(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: validatedTransactionType,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    validatedTransactionType: ReportType,
    reportId: string,
    body: UpdateReportData,
  ): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === validatedTransactionType)
      .find((report) => report.id === reportId);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...reportToUpdate,
      ...body,
      updated_at: new Date(),
    };
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(reportId: string) {
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportId,
    );

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);
    return;
  }
}
