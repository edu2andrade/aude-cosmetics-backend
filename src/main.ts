import MainController from '@/infra/controller/MainController';
import ExpressAdapter from '@/infra/http/ExpressAdapter';
import Signup from '@/application/use-case/Signup';
import AccountRepositoryDatabase from '@/infra/repository/AccountRepositoryDatabase';
import PgPromiseAdapter from '@/infra/database/PgPromiseAdapter';

// Composition Root - Entry point
const port = Number(process.env.PORT) || 3001;

// Framework and Driver
const httpServer = new ExpressAdapter();
const databaseConnection = new PgPromiseAdapter();

// Interface Adapter
const accountRepository = new AccountRepositoryDatabase(databaseConnection);

// Use Case
const signup = new Signup(accountRepository);

// Interface Adapter
new MainController(httpServer, signup);

httpServer.listen(port);
