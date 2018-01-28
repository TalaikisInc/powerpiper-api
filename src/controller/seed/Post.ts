import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Post } from '../../entity/post'
import { Category } from '../../entity/category'
import { User } from '../../entity/user'
import slugify from '../../slugify'

export async function PostController(request: Request, response: Response) {

    const postRepository = await getManager().getRepository(Post)
    const categoryRepository = await getManager().getRepository(Category)
    //const authorRepository = await getManager().getRepository(User)

    const author1 = authorRepository
      .createQueryBuilder()
      .where('user.id = :id', { id: 1 })
      .getOne()

    const post1 = new Post()
    post1.title = 'test title no 1'
    post1.slug = slugify('test title no 1')
    post1.content = 'Lorem impusm textum'
    const category1 = new Category()
    category1.title = 'category title'
    category1.slug = slugify('category title')

    const category2 = new Category()
    category2.title = 'category 222 title'
    category2.slug = slugify('category 222 title')

    await categoryRepository.save([category1, category2])

    post1.categories.push(category1)
    post1.categories.push(category2)
    //post1.author.push(author1)

    const post2 = new Post()
    post2.title = 'test title no 1'
    post2.slug = slugify('test title no 1')
    post2.content = 'Lorem impusm textum'
    const category3 = new Category()
    category3.title = 'category title'
    category3.slug = slugify('category title')

    post2.categories.push(category1)
    post2.categories.push(category2)
    post2.categories.push(category3)
    //post2.author.push(author1)

    await postRepository.save([post1, post2])

    const roles = await postRepository.find()

    response.send(roles)
}
