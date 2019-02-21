# Your Personal Blog

The purpose of this lab is to make a your own personal blog .. _full stack_! You'll use everything you've learned from the Database lectures to make a schema, connect it to your Express server, write REST API Endpoints to get your data, and display it all using React. Let's crush it!

## Steps

### Database

1. Create a new database named `blogs`.
2. Create the following tables:

```
Blogs (
   id
   title
   content
   _created
)

Authors (
   id
   name
   email
   _created
)

Tags (
   id
   name
   _created
)

BlogTags (
   blogid
   tagid
   _created
)
```

3. Create a stored procedure named `spBlogTags` to pull back the tag of a blog.
   - Must have one parameter: `blogid`
   - **Hint:** You only need to join `BlogTags` and `Tags`
4. Create a new user with privileges for your `Blogs` database

## Express API

1. Install mysql and its typings into your project
2. Make sure your project runs via `npm run dev` and going to `localhost:3000/`
3. Set up your database config, and don't forget to include it in your `.gitignore`!
4. Use your config object to connect to your mysql database.
5. Write your DB queries and REST API Endpoints to:
   - GET all Blogs
   - GET one Blog
   - POST a new Blog
   - PUT to edit a Blog
   - DELETE to delete a blog

## React Frontend

1. Create a component to display all Blogs.
2. Create a component to show one Blog.
3. Create a component to add a new Blog post.

The all Blogs component should display previews of the blog posts that a user can click on, which would navigate to the single Blog component that would display all the information of the Blog post. Don't forget to use your blog tags at least on the single Blog component!