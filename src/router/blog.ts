import { Router, Request, Response, NextFunction } from 'express'
import * as passport from 'passport'
require('./passport')(passport)
import { Validator } from 'class-validator'
const validator = new Validator()

import { Post } from '../entity/post'
import { SavePost } from '../controller/post/SavePost'
import { GetPostById } from '../controller/post/GetPostById'
import { UpdatePost } from '../controller/post/UpdatePost'
import { GetPosts } from '../controller/post/GetPosts'
import { DeletePost } from '../controller/post/DeletePost'

// @ TODO:
// get posts by author
// get posts by category
// get by author
// get by cat
// any leaks check

export class BlogRouter {

  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  // create
  public create(req: Request, res: Response, next: NextFunction): void {

    const title = req.body.title
    const content = req.body.content
    const image = req.body.image
    const authors = req.body.authors
    const categories = req.body.categories
    const errors: object[] = []

    // Check title
    if(!title) {
      errors.push({
        title: 'Attribute is missing',
        details: 'No title specified'
      })
    } else {
      if (title.length < 10) {
        errors.push({
          title: 'Invalid attribute',
          details: 'Title must contain at least 10 characters'
        })
      }
      if (title.length > 200) {
        errors.push({
          title: 'Invalid attribute',
          details: 'Title must not contain less than 200 characters'
        })
      }
    }

    // Check content
    if (!content) {
      errors.push({
        title: 'Attribute is missing',
        details: 'No content specified'
      })
    } else {
      if (content.length < 10) {
        errors.push({
          title: 'Invalid attribute',
          details: 'The content length must be at least 10 characters long'
        })
      }
    }

    // Check image
    if (!image) {
        errors.push({
          title: 'Attribute is missing',
          details: 'No image specified'
        })
      } else {
        if (image.length < 5) {
          errors.push({
            title: 'Invalid attribute',
            details: 'The image length must be at least 5 characters long'
          })
        }
      }

    // If a least one error
    if (errors.length > 0) {
      res.status(403).send({
        err: errors
      })
    } else {
      SavePost(title, content, image, authors, categories)
      .then((post) => {
        res.status(201).send({
          data: {
            type: 'posts',
            id: post.id,
            attributes: {
              title: post.title,
              slug: post.slug,
              content: post.content,
              image: post.image,
              authors: post.authors,
              categories: post.categories,
              createdAt: post.createdAt,
              updatedAt: post.updatedAt
            }
          }
        })
      })
      .catch((err: object) => {
        res.status(400).send({
          errors: [{
            title: 'Cannot create the post',
            details: err
          }]
        })
      })
    }
  }

  // update post
  public update(req: Request, res: Response, next: NextFunction): void {

    // The params and attributes
    const id = req.params.id
    const updates = req.body.updates
    const errors: object[] = []

    if (!id) {
      errors.push({
        title: 'Parameter is missing',
        detail: 'No id specified'
      });
    }

    if (!updates) {
      errors.push({
        title: 'Attribute is missing',
        details: 'No id specified'
      })
    }

    if (errors.length > 0) {
      res.status(400).send({
        err: errors
      })
    } else {
      GetPostById(id)
      .then((post) => {
        if (post) {
          // Update or leave as-is
          post.id = post.id
          post.title = updates.title || post.title
          post.content = updates.content || post.content
          post.image = updates.image || post.image
          post.categories = updates.categories || post.categories
          post.authors = updates.authors || post.authors

          UpdatePost(post)
          .then(() => {
            res.status(200).send({
              data: {
                type: 'posts',
                id: post.id,
                attributes: {
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    image: post.image,
                    authors: post.authors,
                    categories: post.categories,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt
                }
              }
            })
          })
        }
      })
      .catch((err: object) => {
        res.status(400).send({
          errors: [{
            title: 'Cannot find this post',
            details: err
          }]
        })
      })
    }
  }

  // get posts
  public find(req: Request, res: Response, next: NextFunction): void {

    const page = req.params.page
    const errors: object[] = []

    if (!(validator.isInt(page) && validator.isPositive(page))) {
      errors.push({
        title: 'Invalid attribute',
        details: 'Wrong page number'
      })
    }

    if (errors.length > 0) {
        res.status(404)
    } else {
      GetPosts(page)
      .then((posts) => {
        res.status(200).send({
          data: posts
        })
      })
      .catch((err: object) => {
        res.status(400).send({
          errors: [{
            title: 'Cannot find posts',
            details: err
          }]
        })
      })
    }
  }

  // delete
  public delete(req: Request, res: Response, next: NextFunction): void {

    const id = req.params.id
    const errors: object[] = []

    if (!id) {
      errors.push({
        title: 'Parameter is missing',
        details: 'No id specified'
      })
    }

    if (errors.length > 0) {
      res.status(404)
    } else {
      DeletePost(id)
      .then(() => {
        res.status(204).send({
        })
      })
      .catch((err: object) => {
        res.status(404).send({
          errors: [{
            title: 'Cannott delete this post',
            details: err
          }]
        })
      })
    }
  }

  public init() {
    this.router.post('/create', passport.authenticate('jwt', {session: false}), this.create)
    this.router.patch('/update/:id', passport.authenticate('jwt', {session: false}), this.update)
    this.router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), this.delete)
    this.router.get('/posts/:page', this.find)
    // @ TODO:
    // this.router.get('/byAuthor', this.findByAuthor)
    // this.router.get('/byCategory', this.findByCategory)
    // this.router.get('/categories', this.findCategories)
    // this.router.get('/authors', this.findAuthors)
  }

}

const blogRoutes = new BlogRouter()
blogRoutes.init()

export default blogRoutes.router
