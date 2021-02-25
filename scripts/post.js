let blogDetails = document.getElementById("blog");
let locationHash = Number.parseInt(location.hash.slice(1))

let getPost = (resource) => {
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

let getPostPromise = getPost("https://jsonplaceholder.typicode.com/posts")

getPostPromise.then(data => {
        data.forEach((post) => {
            if (locationHash === post.id) {
                blogDetails.innerHTML = `<h1>${post.title}</h1>
                                           <p>${post.body}</p>`
            }
        })
    }
)
    .catch(data => console.log("promise was rejected:", data));

