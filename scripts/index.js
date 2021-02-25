let posts = document.getElementById("grid-container")

 let getPosts = (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);
            } else if (request.readyState === 4 && request.status === 404) {
                reject("error:data fetch failed");
            }

        })
        request.open('GET', resource);
        request.send();
    })
}

let getPostsPromise = getPosts("https://jsonplaceholder.typicode.com/posts");


function logPosts(index, post) {
    if (index < 30) {
        let newPost = `<div class="grid-item">
                        <h3>${post.title}</h3> 
                        <p>${post.body}</p>  
                        <a href="post.html#${post.id}" target="_blank" >Learn more >></a>      
                       </div>`
        posts.innerHTML += newPost;
    }
}

getPostsPromise.then(data => {
        data.forEach((post, index) => {
            logPosts(index, post);
        })
    }
)
    .catch(data => console.log("promise was rejected:", data));







