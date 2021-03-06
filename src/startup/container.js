// crearemos un contenedro de inyeccion de depencencias gracias a awilix
const { createContainer , asClass, asValue, asFunction } = require('awilix');

//config
const config = require('../config');
const app  = require('.');

//services
const { HomeService,
        UserService,
        IdeaService,
        CommentService,
        AuthService
         } = require('../services');

//Controllers
const { HomeController,
        UserController,
        IdeaController,
        CommentController,
        AuthController
      } = require('../controllers');

//Routes
const { HomeRoutes, 
        UserRoutes, 
        CommentRoutes, 
        IdeaRoutes,
        AuthRoutes 
        } = require('../routes/index.routes');
const Routes = require('../routes');

//models
const { User,Idea,Comment} = require('../models');

//Repositories

const {UserRepository,
       CommentRepository,
       IdeaRepository
   } = require('../repositories');


const container = createContainer();


container //crear nuevos tipos de iyeccion 
.register({
    app : asClass(app).singleton(),
    router : asFunction(Routes).singleton(),
    config : asValue(config)
})
.register({
    HomeService: asClass(HomeService).singleton(),// singleton significa que sera la misma insancia de la clase
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    AuthService: asClass(AuthService).singleton()
})
.register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(), /*.bind se hace oara que express a la hora de llamar 
    el controlar el scope cambia se hace esto para que el scope se mantenga  */
    UserController: asClass(UserController.bind(UserController)).singleton(),
    CommentController: asClass(CommentController.bind(CommentController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton()
})
.register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton()
}).register({
    User:asValue(User),
    Idea:asValue(Idea),
    Comment:asValue(Comment),

}).register(
    {
        UserRepository: asClass(UserRepository).singleton(),
        IdeaRepository: asClass(IdeaRepository).singleton(),
        CommentRepository: asClass(CommentRepository).singleton()
    }
)


module.exports  = container;