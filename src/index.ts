import "reflect-metadata";
import "dotenv-safe/config";
import path from "path";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { createConnection } from "typeorm";
import { AppResolvers } from './resolvers/index';
import AppEntities from './entities/index';

const app = express();

(async () => {
    await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        // synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: AppEntities
    });
    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: AppResolvers,
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            // userLoader: createUserLoader(),
            // updootLoader: createUpdootLoader(),
        }),
    });

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.listen(parseInt(process.env.PORT), () => {
        console.log("server started on localhost:4000");
    });
})().catch((e) => console.log({ ...e }))
