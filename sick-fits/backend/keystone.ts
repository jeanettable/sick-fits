import { createAuth } from '@keystone-next/auth';
import "dotenv/config"; // is gonna make all our environmental variables aailable to us
import { config, createSchema } from "@keystone-next/keystone/schema";
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';

const databaseURL =
    process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
    // will set a cookie that uses jwt, determining how long a user session can last with that token
    maxAge: 60 * 60 * 24 * 360, // how long they should signed in
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: add in initial roles here
    },
});

export default withAuth(config({
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
        User,
        Product,
        ProductImage,
    }),
    ui: {
        // Show the UI only for people who pass the following test
        isAccessAllowed: ({ session }) => {
            // console.log('session>>>', session);
            return !!session?.data;
        },
    },
    session: withItemData(statelessSessions(sessionConfig), {
        // next line runs a GraphQL query
        User: `id name email`
    })
    })
);
