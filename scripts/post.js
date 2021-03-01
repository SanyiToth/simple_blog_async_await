const locationHash = Number.parseInt(location.hash.slice(1));
const commentList = document.getElementById("comment-list");
const blogContent = document.getElementById("blog-content");
const header = document.querySelector("header");


function logBlog(data1) {
    data1.forEach((blog) => {
        if (locationHash === blog.id) {
            header.innerHTML = `<h1>${blog.title}</h1>
                                            <div id="box">
                                              <p>Author:<span>Leanne Graham</span></p>
                                              <p>website:<span>hildegard.org</span></p>
                                              <a href="index.html" > << All posts</a> 
                                            </div> `
            blogContent.innerHTML = `<p>${blog.body}</p>`
        }
    })
}

function logComments(data2) {
    data2.forEach((comment) => {
        let newComment = `<li class="comment-list__item"><h5>${comment.name}</h5>
                                   <p>${comment.body}</p> 
                              </li>`
        commentList.innerHTML += newComment;
    })
}

async function getBlogAndComments() {
    let response1 = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data1 = await response1.json();
    logBlog(data1);

    let response2 = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${locationHash}`);
    return await response2.json();
}

getBlogAndComments().then(data2 => {
    logComments(data2)
})


/*fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
        if (!response.ok) throw Error(response.statusText);
        else return response.json();
    })
    .then(data => {
            let POST_ID;
            data.forEach((post) => {
                if (locationHash === post.id) {
                    POST_ID = post.id;
                    header.innerHTML = `<h1>${post.title}</h1>
                                            <div id="box">
                                              <p>Author:<span>Leanne Graham</span></p>
                                              <p>website:<span>hildegard.org</span></p>
                                              <a href="index.html" > << All posts</a> 
                                            </div> `
                    blogContent.innerHTML = `<p>${post.body}</p>`
                }
            })
            return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${POST_ID}`);
        }
    )
    .then(data => {
        return data.json();
    })
    .then(response => {
        response.forEach((comment) => {
            console.log(comment)
            let newComment = `<li class="comment-list__item"><h5>${comment.name}</h5>
                                   <p>${comment.body}</p> 
                              </li>`
            commentList.innerHTML += newComment;
        })
    })
    .catch(data => console.log("promise was rejected:", data));*/

