const posts = document.getElementById("grid-container");
const pageNumbers = document.getElementById("paginate-page");
const paginateSection = document.getElementById("paginate")
const postPerPage = document.getElementById("selector-post-per-page");
const postLength = document.getElementById("selector-posts-length");
const selectorSection = document.getElementById("selector");
const orderSelector = document.getElementById("selector-post-order");
let linkHeaders;
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
    for (let numberOfPage = 1; numberOfPage <= numberOfPages; numberOfPage++) {
        let newPageLink = `<span>${numberOfPage}</span>`
        pageNumbers.innerHTML += newPageLink;
    }
    pageNumbers.firstElementChild.classList.add("active");
}

function getActivePage() {
    let result = null;
    Array.from(pageNumbers.children).forEach(item => {
        if (item.classList.contains("active")) {
            result = item.innerText;
        }
    })
    return result;
}

function setActivePage(activePageNumber) {
    Array.from(pageNumbers.children).forEach(item => {
        if (item.innerText === activePageNumber) {
            item.classList.add("active");
        } else {
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

/*function getLinkHeaders(response){
    return response.headers.get('Link');
}*/

async function getPartOfPosts(order, page = 1, limit = 10) {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_sort=id&_order=${order}&_page=${page}&_limit=${limit}`);
    linkHeaders = response.headers.get('Link');
    return await response.json();
}

getPartOfPosts().then(data => {
    data.forEach((post) => {
        logPosts(post);
    })
})
paginateSection.addEventListener("click", (event) => {
    if (event.target.localName === "span") {
        getPartOfPosts(order, event.target.innerText, postPerPage.value)
            .then(data => {
                posts.innerHTML = "";
                document.body.scrollTop = 0;
                data.forEach((post) => {
                    logPosts(post);
                })
                const activePageNumber = event.target.innerText;
                setActivePage(activePageNumber);
            })
    }
    if (event.target.innerText === "<") {
        console.log('getActivePage', Number.parseInt(getActivePage()))
        // if (Number.parseInt(getActivePage()) > 1) {
        linkHeaders.split(',').forEach(item => {
            if (item.split(';')[1].includes("prev")) {
                let request = item.split(';')[0]
                request = request.slice(2, request.length - 1)
                fetch(request)
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        posts.innerHTML = "";
                        // document.body.scrollTop = 0;
                        data.forEach((post) => {
                            logPosts(post);
                        })
                        /* const newActivePage = (Number.parseInt(getActivePage()) - 1).toString();
                         console.log("newActivePage",newActivePage)
                         setActivePage(newActivePage);*/
                    })
            }
        })
        //}

    }
    if (event.target.innerText === ">") {
        console.log('>')
        linkHeaders.split(',').forEach(item => {
            if (item.split(';')[1].includes("next")) {
                let request = item.split(';')[0]
                request = request.slice(2, request.length - 1)
                console.log("request", request);
                fetch(request)
                    .then(response => {
                        console.log(response)
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
    }
    if (event.target.innerText === ">>") {
        console.log('>>')
        linkHeaders.split(',').forEach(item => {
            if (item.split(';')[1].includes("last")) {
                let request = item.split(';')[0]
                request = request.slice(2, request.length - 1)
                console.log(request);
                fetch(request)
                    .then(response => {
                        console.log(response)
                        return response.json()
                    })
                    .then(data => {
                        posts.innerHTML = "";
                        document.body.scrollTop = 0;
                        data.forEach((post) => {
                            logPosts(post);
                        })
                        const newActivePage = pageNumbers.lastChild.textContent;
                        setActivePage(newActivePage);
                    })
            }
        })
    }
    if (event.target.innerText === "<<") {
        console.log('<<')
        linkHeaders.split(',').forEach(item => {
            if (item.split(';')[1].includes("first")) {
                let request = item.split(';')[0]
                request = request.slice(1, request.length - 1)
                console.log(request);
                fetch(request)
                    .then(response => {
                        console.log(response)
                        return response.json()
                    })
                    .then(data => {
                        posts.innerHTML = "";
                        // document.body.scrollTop = 0;
                        data.forEach((post) => {
                            logPosts(post);
                        })
                        setActivePage("1");
                    })
            }
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
            pageNumbers.innerHTML = "";
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






