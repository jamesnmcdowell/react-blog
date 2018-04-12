const root = document.querySelector('.react-route');
const h = React.createElement;

const logo = 'http://paperbackdesign.com/wp-content/uploads/2015/04/generic-logo_150ppi-600x300px.png';



(async () => {
    let blogs = await (await fetch('http://localhost:3000/posts')).json();
    console.log(blogs);

let blogBeingEdited = null;

let removeContact = async (contact, row) => {};

let removeBlog = async blogToDelete => {
  console.log(`I would like to delete ${blogToDelete.title}`);
  let { id } = blogToDelete;
  console.log(id);
  await fetch(`http://localhost:3000/posts/${id}`, { method: "DELETE" });
  blogs = blogs.filter ( blog => id !== blog.id);
  update();

};
let editBlog = (blogToEdit) => {
  blogBeingEdited = Object.assign({}, blogToEdit);
  console.log(blogBeingEdited);
  // // console.log(blogToEdit);
  update();
};

let updateBody = (blogToEdit, body) => {
  blogToEdit.body = body;
  update();
};

let DeleteBlogButton = blog =>
  h("button", { onClick: () => removeBlog(blog) }, "Delete");

let EditBlogButton = blog =>
  h("button", { onClick: () => editBlog(blog) }, "Edit");

let BlogPost = blog =>
  h("div", null, [
    h("h1", null, blog.title),
    h("p", null, blog.body),
    h(EditBlogButton, blog),
    h(DeleteBlogButton, blog),
    blogBeingEdited && blog.id === blogBeingEdited.id && h(EditBlogForm, blog)
  ]);

let saveBlog = async (blogToEdit) => {
    // let { id } = blogToEdit;
    console.log(blogBeingEdited.body);
    await fetch(`http://localhost:3000/posts/${blogToEdit.id}`, {
      method: "PUT",
      body: JSON.stringify({
        // title: "foo",
        body: blogBeingEdited.body
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    let blog = blogs.find(blog => blogBeingEdited.id === blogToEdit.id); 
    Object.assign(blog, blogToEdit);
    blogBeingEdited = null;
    update();

};

let EditBlogForm = blog =>
  h("form", null, [
    h("input", {
      value: blogBeingEdited.body,
      onChange: event => updateBody(blogBeingEdited, event.target.value)
    }),
    h("button", { onClick: (event) => {
        event.preventDefault();
        saveBlog(blog) }}, "Save")
  ]);

let BlogPostList = ({ blogs }) => {
  let vdoms = blogs.map(blog => h(BlogPost, blog));
  return h("div", { className: "blog-list" }, vdoms);
};

let Header = () => {
  return h("div", { className: "nav-bar" }, [
    h("img", { src: logo, className: "logo" })
  ]);
};
let Footer = () => {
  return h("footer", {}, [h("h1", null, "footer")]);
};

let Page = ({ blogs }) =>
  h("div", null, [
    h(Header, null, []),
    h(BlogPostList, { blogs }, []),
    h(Footer, null, [])
  ]);

let update = () => {
  ReactDOM.render(h(Page, { blogs }, []), root);
};

update();

})()


