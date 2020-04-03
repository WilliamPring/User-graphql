import {configure} from './src/configuration'

export default function() {
    const server = configure();
    server.listen(3003, '0.0.0.0').then(({ url }) => {
        console.log(`GraphQL API ready at ${url}`);
    });
}
