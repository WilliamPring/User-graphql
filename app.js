import {configure} from './src/configuration'

export default function() {
    const server = configure();
    server.listen(process.env.PORT ||3003).then(({ url }) => {
        console.log(`GraphQL API ready at ${url}`);
    });
}
