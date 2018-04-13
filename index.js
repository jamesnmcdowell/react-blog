const root = document.querySelector('.react-route');
const h = React.createElement;

const logo = 'http://paperbackdesign.com/wp-content/uploads/2015/04/generic-logo_150ppi-600x300px.png';

    // let blogs = await (await fetch('http://localhost:3000/posts')).json();\
const blogs = [
    {
        "userId": 4,
        "id": 31,
        "title": "ullam ut quidem id aut vel consequuntur",
        "body": "debitis eius sed quibusdam non quis consectetur vitae\nimpedit ut qui consequatur sed aut in\nquidem sit nostrum et maiores adipisci atque\nquaerat voluptatem adipisci repudiandae"
    },
    {
        "userId": 4,
        "id": 32,
        "title": "doloremque illum aliquid sunt",
        "body": "deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime"
    },
    {
        "userId": 4,
        "id": 33,
        "title": "qui explicabo molestiae dolorem",
        "body": "rerum ut et numquam laborum odit est sit\nid qui sint in\nquasi tenetur tempore aperiam et quaerat qui in\nrerum officiis sequi cumque quod"
    },
    {
        "userId": 4,
        "id": 34,
        "title": "magnam ut rerum iure",
        "body": "ea velit perferendis earum ut voluptatem voluptate itaque iusto\ntotam pariatur in\nnemo voluptatem voluptatem autem magni tempora minima in\nest distinctio qui assumenda accusamus dignissimos officia nesciunt nobis"
    }
];

let removeContact = (contact, row) => {};


let editBlog = (blogToEdit) => {
  blogBeingEdited = Object.assign({}, blogToEdit);
};

let EditBlogForm = ({ blog, blogBeingEdited}) =>
  h("form", null, [
    h("input", {
      value: blogBeingEdited.title,
      onChange: event => updateTitle(blogBeingEdited, event.target.value)
    }),
    h("input", {
      value: blogBeingEdited.body,
      onChange: event => updateBody(blogBeingEdited, event.target.value)
    }),
    h("button",
      {
        onClick: event => {
          event.preventDefault();
          saveBlog(blog);
        }
      }, "Save")
  ]);

  //  class EditBlogFormState extends React.Component {
  //     constructor(props) {
  //       super(props);
  //       this.state = { blogBeingEdited: null };
  //     }
  //     render() {
  //       return h(EditBlogForm, Object.assign({}, this.props, this.state ))
  //     }
  //   }

let updateBody = (blogToEdit, body) => {
  blogToEdit.body = body;
};
let updateTitle = (blogToEdit, title) => {
  blogToEdit.title = title;
};

let DeleteBlogButton = ({ blog, removeBlog }) =>
  h("button", { onClick: () => removeBlog(blog) }, "Delete");

let EditBlogButton = blog =>
  h("button", { onClick: () => editBlog(blog) }, "Edit");

let BlogPost = ({ blog, blogBeingEdited, removeBlog}) =>
  h("div", null, [
    h("h1", null, blog.title),
    h("p", null, blog.body),
    h(EditBlogButton, blog),
    h(DeleteBlogButton, {blog, removeBlog}),
    blogBeingEdited && blog.id === blogBeingEdited.id && h(EditBlogForm, { blog, blogBeingEdited})
  ]);

class BlogPostState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogBeingEdited: null };
  }
  render() {
    let test = h(BlogPost, Object.assign({}, this.props, this.state));
    return test;
  }
}

let saveBlog = (blogToEdit) => {
    console.log(blogBeingEdited.body);
    let blog = blogs.find(blog => blogBeingEdited.id === blogToEdit.id);
    console.log(blog);
    Object.assign(blog, blogBeingEdited);
    blogBeingEdited = null;
};


let BlogPostList = ({ blogs, removeBlog }) => {
  let vdoms = blogs.map(blog => {
    // console.log('yo'); 
    // console.log(blog);
    return h(BlogPostState, {blog, removeBlog})
  });

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


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { blogs };
    }
  

render() {
  let removeBlog =(blogToDelete) => {
    console.log(`I would like to delete ${blogToDelete.title}`);
    let { id } = blogToDelete;
    let filteredBlogs = blogs.filter(blog => id !== blog.id);
    console.log(filteredBlogs);
    this.setState({ blogs: filteredBlogs })
  }
    return h("div", null, [
      h(Header, null, []),
      h(BlogPostList, { blogs: this.state.blogs, removeBlog: removeBlog }, []),
      h(Footer, null, [])
    ]);
 }

}

ReactDOM.render(h(Page, { blogs}, []), root);


