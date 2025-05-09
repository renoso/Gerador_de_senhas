import { fastify } from 'fastify'
import { prisma} from './lib/prisma'


const app = fastify()

type Post = {
    id: string
    name: string
    email: string

}

let data: Post[] = []


app.post('/posts', async (req, res) => {
    const { name, email } = req.body as Post

    await prisma.posts.create({
        data: {
            name,
            email
            
        }
    })

    return res.status(201).send("Enviado com sucesso")
})

app.get('/posts', async () => {

    const posts = await prisma.posts.findMany()

    return posts
})

// esse metodo não é recomendado em produção, foi só pra ter um norte N
app.put('/posts/:postId', async (req, res) => {
    const { postId } = req.params as { postId: string }
    // Pra buscar as propriedade do body, usando o generic (<>), ai as propriedade do post passa ser opcional
    const { name, email} = req.body as Partial<Post>

    await prisma.posts.findUniqueOrThrow({where: {id: postId}})
    await prisma.posts.update({
        where: { id: postId },
        data: {
            name,
            email
        }
    })
    return res.send()

})


//ele delata quando o id for igual postid
app.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params as { postId: string }

    // se ele chegar nessa linha deu erro
    await prisma.posts.findUniqueOrThrow({ where: { id: postId}})
    // se chegar nessa é porq foi bem sucedido 
    await  prisma.posts.delete({ where: { id: postId}})


    return res.send()
})


app.listen({
    port: 4000
})