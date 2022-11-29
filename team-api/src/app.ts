import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import * as routes from './routes'

const app = express();
app.use(express.json())
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.register(app)

export {app};
