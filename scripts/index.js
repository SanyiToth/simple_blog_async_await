const posts = document.getElementById("grid-container");
const postsPaginate = document.getElementById("paginate");
const postPerPage = document.getElementById("selector-post-per-page");
const postLength = document.getElementById("selector-posts-length");
const selectorSection = document.getElementById("selector");
const orderSelector = document.getElementById("selector-post-order");
let order = "asc";

function logPosts(post) {
    let newPost = `<div class="grid-item">
                        ${post.id}
                        <h2>${post.title}</h2> 
                        <p id="blog-content__paragraph">${post.body}</p>  
                        <a href="post.html#${post.id}" target="_blank" >Learn more >></a>      
                       </div>`
    posts.innerHTML += newPost;
}
function logPaginate(numberOfPages) {
    for (let page = 1; page <= numberOfPages; page++) {
        let newPageLink = `<span>${page}</span>`
        postsPaginate.innerHTML += newPageLink;
    }
    postsPaginate.firstElementChild.classList.add("active");
}
function getActivePage() {
    let result = null;
    Array.from(postsPaginate.children).forEach(item => {
        if (item.classList.contains("active")) {
            result = item.innerText;
        }
    })
    return result;
}
function setActivePage(event) {
    event.target.classList.add("active");
    Array.from(postsPaginate.children).forEach(item => {
        if (item !== event.target) {
            item.classList.remove("active");
        }
    })
}
function logPerPostsLength(data) {
    postLength.innerText = `/ ${data.length}`;
}
async function getPosts() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
}
getPosts().then(data => {
    logPerPostsLength(data);
    const numberOfPages = Math.ceil(data.length / postPerPage.value)
    logPaginate(numberOfPages);
})
async function getPartOfPosts(order, page = 1, limit = 10) {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_sort=id&_order=${order}&_page=${page}&_limit=${limit}`);
    return await response.json();
}
getPartOfPosts().then(data => {
    data.forEach((post) => {
        logPosts(post);
    })
})
postsPaginate.addEventListener("click", (event) => {
    if (event.target.localName === "span") {
        getPartOfPosts(order, event.target.innerText, postPerPage.value)
            .then(data => {
                posts.innerHTML = "";
                document.body.scrollTop = 0;
                data.forEach((post) => {
                    logPosts(post);
                })
                setActivePage(event);
            })
    }
})
selectorSection.addEventListener("change", (event) => {
    if (event.target.value === "oldest first") {
        order = "asc";
        getPartOfPosts(order, getActivePage(), postPerPage.value).then(data => {
            posts.innerHTML = "";
            data.forEach((post) => {
                logPosts(post);
            })
        })
    } else if (event.target.value === "latest first") {
        order = "desc";
        getPartOfPosts(order, getActivePage(), postPerPage.value).then(data => {
            posts.innerHTML = "";
            data.forEach((post) => {
                logPosts(post);
            })
        })
    } else {
        orderSelector.value = "";
        getPosts().then(data => {
            logPerPostsLength(data);
            postsPaginate.innerHTML = "";
            const numberOfPages = Math.ceil(data.length / postPerPage.value);
            logPaginate(numberOfPages);
        })
        getPartOfPosts("asc", "1", postPerPage.value).then(data => {
                posts.innerHTML = "";
                data.forEach((post) => {
                    logPosts(post);
                })
            }
        )
    }
})






