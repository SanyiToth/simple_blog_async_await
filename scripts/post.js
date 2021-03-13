const locationHash = Number.parseInt(location.hash.slice(1));
const commentList = document.getElementById("comment-list");
const blogContent = document.getElementById("blog-content");
const header = document.querySelector("header");
const postHost = "http://localhost:3000/posts"


function logBlog(data1) {
    data1.forEach((blog) => {
        if (locationHash === blog.id) {
            header.innerHTML = `<h1>${blog.title}</h1>
                                <div id="box">
                                    <p>id:<span>${blog.id}</span></p>
                                    <p>Author:<span>Leanne Graham</span></p>
                                    <p>website:<span>hildegard.org</span></p>
                                    <a href="index.html" > << All posts</a> 
                                </div> `
            blogContent.innerHTML = `<p>${blog.body}</p>`
        }
    })
}

function logComments(data2) {
    for (let comment = data2.length - 1; comment >= 0; comment--) {
        const newComment = `<li class="comment-list__item">
                                <h5>${data2[comment].name}</h5>
                                <p>${data2[comment].body}</p>
                            </li>`
        commentList.innerHTML += newComment;
    }
}

async function getBlogAndComments() {
    let response1 = await fetch(`${postHost}`);
    let data1 = await response1.json();
    logBlog(data1);

    let response2 = await fetch(`${commentHost}?postId=${locationHash}`);
    return await response2.json();
}


getBlogAndComments().then(data2 => {
    logComments(data2);
})


