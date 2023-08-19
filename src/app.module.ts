import { Module } from '@nestjs/common';
import { ReportModule } from './report/report.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [ReportModule, SummaryModule],
})
export class AppModule {}
