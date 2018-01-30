import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { IPost } from './post.interface'
import { Post } from './post.model'

@Service()
export class PostService {
  @OrmRepository(Post) private repository: Repository<Post>

  public create(props: IPost) {
    return this.repository.save(props)
  }

  public getAll(perPage: number = 10, page: number = 0) {
    const skip: number = perPage * (page)

    return this.repository.findAndCount({
      skip,
      take: page
    })
  }

  public getAllAuthor(author: string, perPage: number = 10, page: number = 0) {
    const skip: number = perPage * (page)

    return this.repository.createQueryBuilder('post')
      .where('author.id = :id', { id: author })
      .skip(skip)
      .take(perPage)
  }

  public getAllCategory(category: string, perPage: number = 10, page: number = 0) {
    const skip: number = perPage * (page)

    return this.repository.createQueryBuilder('post')
      .where('category.id = :id', { id: category })
      .skip(skip)
      .take(perPage)
  }

  public getOne(id: string) {
    return this.repository.findOneById(id)
  }

  public update(id: string, props: IPost): Promise<void> {
    return this.repository.updateById(id, props)
  }

  public delete(id: string): Promise<void> {
    return this.repository.removeById(id)
  }
}
