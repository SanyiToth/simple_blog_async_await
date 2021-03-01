let posts = document.getElementById("grid-container")


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


/*let getPosts = (resource) => {
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




getPostsPromise.then(data => {
       data.forEach((post, index) => {
           logPosts(index, post);
       })
   }
)
   .catch(data => console.log("promise was rejected:", data));
*/






