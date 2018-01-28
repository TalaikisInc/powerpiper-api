/*---------------------- THIS IS TEST PURPOSESONLY ------------- */
// Seeds
import { UserController } from './controller/seed/User'
import { RoleController } from './controller/seed/Role'
import { CountryController } from './controller/seed/Country'
import { PostController } from './controller/seed/Post'

// Normal controllers
// Done
//import { GetUserByIdController } from './controller/user/GetUserById'
//import { GetUsersByRoleController } from './controller/user/GetUsersByRole'
//import { SaveUserController } from './controller/user/SaveUser'
// @TODO:
import { GetPostByIdController } from './controller/post/GetPostById'
import { GetPostsController } from './controller/post/GetPosts'
import { GetPostsByAuthorController } from './controller/post/GetPostsByAuthor'
import { GetPostsByCategoryController } from './controller/post/GetPostsByCategory'
import { SavePost } from './controller/post/SavePost'

// @TODO User, it's temporary
export const routes = [
  {
    path: '/seed/user',
    method: 'get',
    action: UserController
  },
  {
    path: '/seed/post',
    method: 'get',
    action: PostController
  },
  {
    path: '/seed/role',
    method: 'get',
    action: RoleController
  },
  {
    path: '/seed/country',
    method: 'get',
    action: CountryController
  },
  {
    path: '/posts/:page',
    method: 'get',
    action: GetPostsController
  },
  {
    path: '/posts/:author/:page',
    method: 'get',
    action: GetPostsByAuthorController
  },
  {
    path: '/posts/:category/:page',
    method: 'get',
    action: GetPostsByCategoryController
  },
  {
    path: '/posts',
    method: 'post',
    action: SavePost
  }
]
