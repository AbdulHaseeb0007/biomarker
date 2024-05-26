import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTestSchema } from './schema/users.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/biomarker'),
    MongooseModule.forFeature([{ name: 'userTestResults', schema: UserTestSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
