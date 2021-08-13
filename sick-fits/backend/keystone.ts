import "dotenv/config"; // is gonna make all our environmental variables aailable to us
import { config, createSchema } from "@keystone-next/keystone/schema";

const databaseURL =
    process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
    // will set a cookie that uses jwt, determining how long a user session can last with that token
    maxAge: 60 * 60 * 24 * 360, // how long they should signed in
    secret: process.env.COOKIE_SECRET,
};

export default config({
    // @ts-ignore
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        // todo: add data seeding here
    },
    lists: createSchema({
        // TODO: schema items go in here
    }),
    ui: {
        // TODO: change this for roles
        isAccessAllowed: () => true,
    },
    // TODO: Add session values here
});
