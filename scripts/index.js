const posts = document.getElementById("grid-container")
const selector = document.getElementById("selector-post-order")

function logPosts(index, post) {
    if (index < 30) {
        let newPost = `<div class="grid-item">
                        <h2>${post.title}</h2> 
                        <p id="blog-content__paragraph">${post.body}</p>  
                        <a href="post.html#${post.id}" target="_blank" >Learn more >></a>      
                       </div>`
        posts.innerHTML += newPost;
    }
}

async function getPosts() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
}

getPosts().then(data => {
    data.forEach((post, index) => {
        logPosts(index, post);
    })
})


selector.addEventListener("change", (event) => {
    if (event.target.value === "oldest first") {//ascend
        fetch("https://jsonplaceholder.typicode.com/posts?_sort=id&_order=asc")
            .then(response => {
                return response.json()
            })
            .then(data => {
                posts.innerHTML="";
                data.forEach((post, index) => {
                    logPosts(index, post);
                })
            })
    } else {
        fetch("https://jsonplaceholder.typicode.com/posts?_sort=id&_order=desc")
            .then(response => {
                return response.json()
            })
            .then(data => {
                posts.innerHTML="";
                data.forEach((post, index) => {
                    logPosts(index, post);
                })
            })
    }
})








