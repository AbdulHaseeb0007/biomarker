import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all-test-count')
  async getAllTestCount() {
    const data = await this.appService.allTestCount();
    return { status: true, data };
  }

  @Get('/test-count/:type')
  async getTestCountByType(@Param('type') type) {
    const data = await this.appService.getTestCountByTestType(type);
    return { status: true, data };
  }

  @Get('/get-user-monthly-test-count/:name/:type')
  async getUserMonthlyTestCount(@Param('name') name, @Param('type') type) {
    const data = await this.appService.userMonthlyTestCount(name, type);
    return { status: true, data };
  }

  @Get('/get-user-monthly-test-data/:name/:type/:month')
  async getUserMonthlyTestData(@Param('name') name, @Param('type') type, @Param('month') month) {
    const data = await this.appService.userMonthlyTestData(name, type, Number(month));
    return { status: true, data };
  }

  @Post('/save-result')
  async saveUserTestResult(@Body('result') result, @Body('date') date, @Body('name') name: string, @Body('test_type') test_type) {
    const data = await this.appService.saveResult({ name: name.toLowerCase(), date, result: Number(result), test_type });
    return { status: true, data };
  }
}
