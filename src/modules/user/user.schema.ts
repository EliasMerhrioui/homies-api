import {z} from 'zod';
import { buildJsonSchemas } from 'fastify-zod';
import { createUser } from './user.service';

const userCore = {
    email: z.string({
        required_error: 'Votre email est obligatoire',
        invalid_type_error: 'Votre email doit etre en string'
    }).email(),

    prenom: z.string(),
    nom: z.string(),
}


const createUserSchema = z.object({
    ...userCore,
    
    password: z.string({
        required_error: 'Votre mdp est obligatoire',
        invalid_type_error: 'Votre mdp doit etre en string'
    }),
});

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
})

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserResponseSchema,
    createUserSchema,
})