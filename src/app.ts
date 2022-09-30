import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from './modules/user/user.schema';
import fjwt from '@fastify/jwt'

const server = Fastify();

server.register(fjwt, {
    secret: 'fnjefn25jesnfjks156ejkfesnjk'
});

server.decorate(
    "authenticate", 
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (e) {
            return reply.send(e);
        }
    }
    
);

server.get('/healthcheck', async function() {
    return { status: "OK" };
})


async function main() {
    for(const schema of userSchemas){
        server.addSchema(schema)
    }
    
    server.register(userRoutes, {prefix: "/users"})
    
    
    
    try {
        await server.listen(3000, "0.0.0.0");

        console.log('Serveur prêt : http://localhost:3000');
    } catch(e){
        console.error(e);
        process.exit(1);
    }
}    
   
main();