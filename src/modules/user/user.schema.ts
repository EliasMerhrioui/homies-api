import {z} from 'zod';
import { buildJsonSchemas } from 'fastify-zod';
import { createUser } from './user.service';


//Création user
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

//LOGIN 
const loginSchema = z.object({
    email: z.string({
        required_error: 'Votre email est obligatoire',
        invalid_type_error: 'Votre email doit etre en string'
    }).email(),
    password: z.string({
        required_error: 'Votre mdp est obligatoire',
        invalid_type_error: 'Votre mdp doit etre en string'
    }),

});

const loginResponseSchema = z.object({
    accessTocken: z.string(),
})



export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserResponseSchema,
    createUserSchema,
    loginSchema,
    loginResponseSchema,
    
})