import MainController from '@/infra/controller/MainController';
import ExpressAdapter from '@/infra/http/ExpressAdapter';
import Signup from '@/application/use-case/Signup';
import AccountRepositoryDatabase from '@/infra/repository/AccountRepositoryDatabase';

// Composition Root - Entry point
const port = Number(process.env.PORT) || 3001;

// Framework and Driver
const httpServer = new ExpressAdapter();

// Interface Adapter
const accountRepository = new AccountRepositoryDatabase();

// Use Case
const signup = new Signup(accountRepository);

// Interface Adapter
new MainController(httpServer, signup);

httpServer.listen(port);
