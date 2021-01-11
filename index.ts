import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import CurrencyService from './src/services/currency.service';
import routes from './src/routes';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

// Set port
const PORT: number = parseInt(process.env.PORT as string, 10) || 4040;

// Create express app
const app: express.Application = express();

// Cors config
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

// Express config
app.use(helmet());
app.use(cors(options));
app.use(express.json());
app.use('/api', cors(options), routes);

// Listen express
app.listen(PORT, () => {
  CurrencyService.getCurrencyList()
    .then(() => {
      console.log(`http://localhost:${process.env.PORT}/api/items`);
    })
    .catch((error: any) => {
      console.log(error);
    });
});
