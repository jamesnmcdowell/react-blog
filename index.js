const root = document.querySelector('.react-route');
const h = React.createElement;

const logo = 'http://paperbackdesign.com/wp-content/uploads/2015/04/generic-logo_150ppi-600x300px.png';

let removeContact = async (contact, row) => {
};


let removeBlog = async (blogToDelete) => {
    console.log(`I would like to delete ${blogToDelete.title}`);
    let { id } = blogToDelete;
    console.log(id);
    await fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' });
    let blogs = await (await fetch('http://localhost:3000/posts')).json();
    update(blogs);
}
let editBlog = async blogToEdit => {
    // console.log(blogToEdit);
    // console.log(`I would like to edit ${blogToEdit.title}`);
    let { id } = blogToEdit;
    // console.log(id);
    let blog = await (await fetch(`http://localhost:3000/posts/${id}`)).json();
    console.log("sup");
    console.log(blog);
    console.log(blog.isBeingEdited);
    blog.isBeingEdited = !blog.isBeingEdited;
};

let updateBody = async (blogToEdit, body) => {
    // let blog = await (await fetch(`http://localhost:3000/posts/${id}`)).json();
    // blog.body = body;
}

let DeleteBlogButton = (blog) => 
    h('button', { onClick: () => removeBlog(blog) }, 'Delete');

let EditBlogButton = (blog) => 
    h('button', { onClick: () => editBlog(blog) }, 'Edit');

let BlogPost = (blog) =>
    h('div', null, [
        h('h1', null, blog.title), 
        h('p', null, blog.body),
        h(EditBlogButton, blog),
        h(DeleteBlogButton, blog),
        blog.isBeingEdited && h(EditBlogForm, blog)
     ]);

let EditBlogForm = (blog) =>
     h('form', null [
         h('input',{value: blog.title} ),
         h('input',{value: blog.body, onChange: (event) => updateBody(blog,event.target.value) })
     ])
    
let BlogPostList = ({blogs}) => {
    let vdoms = blogs.map( blog => h(BlogPost, blog));
    return h('div', { className: "blog-list" }, vdoms);
}

let Header = () => {
    return h('div', { className: "nav-bar" }, [h('img', { src:logo, className:"logo" }) ]);
}
let Footer = () => {
    return h('footer', {}, [h('h1', null, "footer")]);
}

let Page = ({blogs}) => h('div', null, [
    h(Header, null, []),
    h(BlogPostList, { blogs}, []),
    h(Footer, null, []),
]);

let update = (blogs) => {
    ReactDOM.render(h(Page, { blogs }, []), root);
};

(async () => {
    let blogs = await (await fetch('http://localhost:3000/posts')).json();
    console.log(blogs);
    update(blogs);
})()


