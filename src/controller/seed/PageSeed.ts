import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import * as pug from 'pug'

import { Page } from '../../entity/page'
import slugify from '../../utils/slugify'

export async function PageSeed(request: Request, response: Response) {

    const pageRepository = await getManager().getRepository(Page)

    const page1 = new Page()
    page1.title = 'Privacy Policy'
    page1.slug = slugify(page1.title)
    page1.content = pug.renderFile('./src/controller/seed/templates/privacy_policy.pug')

    const page2 = new Page()
    page2.title = 'Cookie Policy'
    page2.slug = slugify(page2.title)
    page2.content = pug.renderFile('./src/controller/seed/templates/cookie_policy.pug')

    await pageRepository.save([page1, page2])

    const pages = await pageRepository.find()

    response.send(pages)

}
