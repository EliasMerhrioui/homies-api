import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, LoginInput } from "./user.schema";
import { createUser } from "./user.service";

export async function registerUserHandler(request: FastifyRequest<{
        Body: CreateUserInput;
    }>, 
    reply: FastifyReply
) {
    const body = request.body
    
    try {
        const user = await createUser(body);
        return reply.code(201).send(user)
    } catch(e) {
        console.log(e);
        return reply.code(500).send(e);

    }
}

export async function loginHandler(request: FastifyRequest<{
    Body: LoginInput,
}>, 
reply: FastifyReply) {
    const body = request.body

    //trouver l'email de l'utilisateur 

    // vérifier son mdp hasher 50

    //Générer un accessToken 40 
}