import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { IPage } from './page.interface'
import { Page } from './page.model'

@Service()
export class PageService {

  @OrmRepository(Page) private repository: Repository<Page>

  public create(props: IPage) {
    return this.repository.save(props)
  }

  public getOne(slug: string): any {
    return this.repository.createQueryBuilder('page').where('page.slug = :s', { s: slug }).getOne()
  }

  public update(id: string, props: IPage): Promise<void> {
    return this.repository.updateById(id, props)
  }

  public delete(id: string): Promise<void> {
    return this.repository.removeById(id)
  }

}
