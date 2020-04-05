import {mockServer} from 'apollo-server'
import schema from '../src/schema'
jest.mock('../src/configuration/ConfigureDatabase.js')
describe('GRAPHQL schema Testing', () =>{
    test('Country', ()=> {
        expect(async () =>{
            const MockServer = mockServer(schema);
            await MockServer.query(
            `Country {
                name
                municipalities {
                  provienceState
                  cities {
                    name
                  }
                }
              }`).not.toThrow();
        })
    })
})