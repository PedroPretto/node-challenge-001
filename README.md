# Jungle Devs - Node Challenge #001

## Documentation
### Running
First, install all the dependencies by running in the root of the repository:
```shell
yarn
```
Then, you will need to start the database provided, run in the root of the repository:
```shell
docker-compose up
```
Following you need to build the project database tables, to do this you will need to run the migrations. Run in the root of the repository:
```shell
npx knex migrate:latest
```
You may want to populate the database in order to do some tests, the project has some seeds for this. Just run in the root of the repository:
```shell
npx knex seed:run
```

### Endpoints
The /admin/* endpoins depends on wether the user is logged or not, and if he is an admin user. For this the project uses JWT, and the is_admin status on the requisitions headers, both the JWT token and the is_admin info are present in the login endpoint response.

This repository also contains a Postman file with examples for all the endpoints below:

**Authors endpoint:**
- /api/sign-up:
  - Type: Post;
  - Body: name, email, password, picture, is_admin;
  - Response: message;

- /api/login:
  - Type: Post;
  - Body: email, password;
  - Response: token, is_admin;

- /api/admin/authors/:id:
  - Type: Delete;
  - Headers: token, is_admin;
  - Params: id;
  - Response: message;

- /api/admin/authors/:id:
  - Type: Put;
  - Body: name, email, password, picture, is_admin;
  - Headers: token, is_admin;
  - Params: id;
  - Response: message;

- /api/admin/authors/:
  - Type: Get;
  - Headers: token, is_admin;
  - Response: authors;

**Articles endpoint:**
- /api/admin/articles:
  - Type: Post;
  - Body: author_id, category, title, summary, first_paragraph, body;
  - Headers: token, is_admin;
  - Response: message;

- /api/admin/articles/:id:
  - Type: Delete;
  - Headers: token, is_admin;
  - Params: id;
  - Response: message;

- /api/admin/articles/:id:
  - Type: Put;
  - Headers: token, is_admin;
  - Params: id;
  - Body: author_id, category, title, summary, first_paragraph, body;

- /api/articles:
  - Type: Get;
  - Query: category;
  - Response: articles;

- /api/articles/:id:
  - Type: Get;
  - Params: id;
  - Headers?: token;
  - Response: articles;

## Future Improvements
- Working with middlewares for authorization;
- Implement unit tests;
- Work with Object.js models;
- Add lint and prettier to the project;
- Refactoring response patterns;
- Work with environment variables for project configuration (ports, database info and JWT)
## Description

**Challenge goal**: The purpose of this challenge is to give an overall understanding of a backend application. You’ll be implementing a simplified version of news provider API. The concepts that you’re going to apply are:

- REST architecture;
- Authentication and permissions;
- Data modeling and migrations;
- SQL database;
- Query optimization;
- Serialization;
- Production builds.

**Target level**: This is an all around challenge that cover both juniors and experience devs based on the depth of how the concepts were applied.

**Final accomplishment**: By the end of this challenge you’ll have a production ready API.

## Acceptance criteria

- Clear instructions on how to run the application in development mode
- Clear instructions on how to create production builds
- A good API documentation or collection
- Models created using [Objection.js](https://vincit.github.io/objection.js/)
- Login API: `/api/login`
- Sign-up API: `/api/sign-up`
- Administrator restricted APIs:
  - CRUD `/api/admin/authors`
  - CRUD `/api/admin/articles`
- List article endpoint `/api/articles?category=:slug` with the following response:
```json
[
  {
    "author": {
      "name": "Author Name",
      "picture": "https://picture.url"
    },
    "category": "Category",
    "title": "Article title",
    "summary": "This is a summary of the article"
  },
  ...
]
```
- Article detail endpoint `/api/articles/:id` with different responses for anonymous and logged users:

    **Anonymous**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>"
    }
    ```

    **Logged user**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>",
      "body": "<div><p>Second paragraph</p><p>Third paragraph</p></div>"
    }
    ```


## Instructions to Run

- Database: `docker-compose up` will start the PostgreSQL DB
- `yarn dev` is configured to start the app.js using nodemon

