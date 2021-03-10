const posts = document.getElementById("grid-container")
const selector = document.getElementById("selector-post-order")
const postsPaginate = document.getElementById("paginate")
const POST_PER_PAGE = 30;


async function getPosts() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
}

getPosts().then(data => {
    const numberOfPages = Math.ceil(data.length / POST_PER_PAGE)
    logPaginate(numberOfPages);
})

async function getPartOfPosts() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=30");
    return await response.json();
}

getPartOfPosts().then(data => {
    data.forEach((post) => {
        logPosts(post);
    })
})

function logPosts(post) {
    let newPost = `<div class="grid-item">
                        <h2>${post.title}</h2> 
                        <p id="blog-content__paragraph">${post.body}</p>  
                        <a href="post.html#${post.id}" target="_blank" >Learn more >></a>      
                       </div>`
    posts.innerHTML += newPost;
}


function logPaginate(numberOfPages) {
    for (let page = 1; page <= numberOfPages; page++) {
        let newPageLink = `<a class="page" href="">${page}</a>`
        postsPaginate.innerHTML += newPageLink;
    }
}

postsPaginate.addEventListener("click", (event) => {
    event.preventDefault()
    if (event.target.classList.contains("page")) {
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${event.target.innerText}&_limit=${POST_PER_PAGE}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                posts.innerHTML = "";
                document.body.scrollTop = 0;
                data.forEach((post) => {
                    logPosts(post);
                })
            })
    }
})


selector.addEventListener("change", (event) => {
    //ascend
    if (event.target.value === "oldest first") {
        fetch("https://jsonplaceholder.typicode.com/posts?_sort=id&_order=asc")
            .then(response => {
                return response.json()
            })
            .then(data => {
                posts.innerHTML = "";
                data.forEach((post) => {
                    logPosts(post);
                })
            })
        //descend
    } else {
        fetch("https://jsonplaceholder.typicode.com/posts?_sort=id&_order=desc")
            .then(response => {
                return response.json()
            })
            .then(data => {
                posts.innerHTML = "";
                data.forEach((post) => {
                    logPosts(post);
                })
            })
    }
})








