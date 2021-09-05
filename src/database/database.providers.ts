import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './../config/service/config.service';
import { ConfigModule } from './../config/config.module';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.getMongoURI(),
      useNewUrlParser: true,
    }),
  }),
];
