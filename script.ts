import { PrismaClient, Prisma } from '@prisma/client'
import md5 from 'js-md5';
const prisma = new PrismaClient()
prisma.$connect()
import express from 'express'

const app = express();
app.use(express.json())


app.post("/", async (req, res) => {
  const body: {
    username: string,
    email: string,
  } = req.body
  console.log(body)
  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      avatar_url: `https://www.gravatar.com/avatar/${md5.hex(body.email)}?s=25&d=https%3A%2F%2Favatars.dicebear.com%2Fapi%2Fbig-smile%2F${md5.hex(body.email)}.svg&r=g`,
      posts: {
        //@ts-ignore
        create: {
          title: 'Welcome!',
          body: `@${body.username} Has Joined Plasmatic`
        }
      }
    }
  })
  console.log(user)
})

app.get("/", async (req, res) => {
  res.send("Hello World")
})

app.put("/", (req, res) => {

})

app.delete("/:id", (req, res) => {

})

app.listen(3000, console.log.bind(this, "running"))