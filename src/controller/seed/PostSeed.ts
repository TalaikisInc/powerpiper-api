import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import { Post } from '../../entity/post'
import { slugify } from '../../services'

export async function PostSeed(request: Request, response: Response) {

    const postRepository = await getManager().getRepository(Post)

    const post1 = new Post()
    post1.title = 'test title d no 1'
    post1.slug = slugify(post1.title)
    post1.image = 'uploads/testz.png'
    post1.content = 'Lorem impusm textum'

    const post2 = new Post()
    post2.title = 'test title no 2'
    post2.slug = slugify(post2.title)
    post2.content = 'Lorem impusm textum'
    post2.image = 'uploads/test33.png'

    await postRepository.save([post1, post2])

    const posts = await postRepository.find()

    response.send(posts)

}
