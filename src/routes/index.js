const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const helmet = require('helmet');// midleware muy util que ayuda  a brindar seguridad las brechas que tengamos
const compression = require('compression');// ayuda a comprimir las peticionas HTTP para que sean mas rapidas
require('express-async-errors');//ayuda a capturar las excepsiones asincronas
const { NotFoundMiddleware,ErrorMiddleware } = require('../middlewares')

module.exports = function ( {
    HomeRoutes,
    UserRoutes,
    IdeaRoutes,
    CommentRoutes,
    AuthRoutes
} ) {
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(morgan('combined'))
        .use(express.json())// convierte las propiedades de tipo body en un json
        .use(cors())
        .use(helmet())
        .use(compression());
        

        apiRoutes.use("/home",HomeRoutes);
        apiRoutes.use("/user",UserRoutes);
        apiRoutes.use("/idea",IdeaRoutes);
        apiRoutes.use("/comment",CommentRoutes);
        apiRoutes.use("/auth",  AuthRoutes);
    
        router.use("/v1/api",apiRoutes);

        router.use(NotFoundMiddleware);
        router.use(ErrorMiddleware);

        return router;
}