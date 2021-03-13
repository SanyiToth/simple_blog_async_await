const posts = document.getElementById("grid-container");
const selectorPostsOrder = document.getElementById("selector-post-order");
const selectorPostsPerPage = document.getElementById("selector-post-per-page");
const postsPaginate = document.getElementById("paginate");
const postPerPage = document.getElementById("selector-post-per-page");
const postLength = document.getElementById("selector-posts-length");
const selectorSection = document.getElementById("selector")


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
    postsPaginate.firstElementChild.classList.add("active")
}


function addActiveToClassList(event) {
    event.target.classList.add("active");
    Array.from(postsPaginate.children).forEach(item => {
        if (item !== event.target) {
            item.classList.remove("active");
        }
    })
}


async function getPosts() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
}

function logPerPostsLength(data) {
    postLength.innerText = `/ ${data.length}`;
}

getPosts().then(data => {
    logPerPostsLength(data);
    const numberOfPages = Math.ceil(data.length / postPerPage.value)
    logPaginate(numberOfPages);
})

async function getPartOfPosts() {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${postPerPage.value}`);
    return await response.json();
}

getPartOfPosts().then(data => {
    data.forEach((post) => {
        logPosts(post);

    })

})

postsPaginate.addEventListener("click", (event) => {
    if (event.target.localName === "span") {
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${event.target.innerText}&_limit=${postPerPage.value}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                posts.innerHTML = "";
                document.body.scrollTop = 0;
                data.forEach((post) => {
                    logPosts(post);
                })
                addActiveToClassList(event);
            })
    }
})

function getActiveSite() {
    let result = null;
    Array.from(postsPaginate.children).forEach(item => {
        if (item.classList.contains("active")) {
            result = item.innerText;
        }
    })
    return result;
}


selectorPostsOrder.addEventListener("change", (event) => {
    //ascend
    if (event.target.value === "oldest first") {
        fetch(`https://jsonplaceholder.typicode.com/posts?_sort=id&_order=asc&_page=${getActiveSite()}&_limit=${postPerPage.value}`)
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
        fetch(`https://jsonplaceholder.typicode.com/posts?_sort=id&_order=desc&_page=${getActiveSite()}&_limit=${postPerPage.value}`)
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

selectorPostsPerPage.addEventListener("change", () => {
    getPosts().then(data => {
        logPerPostsLength(data);
        const numberOfPages = Math.ceil(data.length / postPerPage.value)
        postsPaginate.innerHTML = "";
        logPaginate(numberOfPages);
    })
    getPartOfPosts().then(data => {
        posts.innerHTML = "";
        data.forEach((post) => {
            logPosts(post);
        })
    })
})






