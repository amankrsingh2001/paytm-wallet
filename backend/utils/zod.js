const zod = require('zod')

const signUpSchema = zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()    
})

const signInSchema = zod.object({
    username:zod.string(),
    password:zod.string()
})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastname:zod.string().optional()
})

module.exports ={
    signUpSchema,
    signInSchema,
    updateBody
}