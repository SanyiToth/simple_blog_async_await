const form = document.getElementById("form-add-comment");
const name = document.getElementById("name");
const email = document.getElementById("email");
const textArea = document.getElementById("comment");


async function postComments(newComment) {
    let response = fetch("http://localhost:3000/comments", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })
    return await response.json();
}

async function getComments() {
    let response = await fetch("http://localhost:3000/comments");
    return await response.json();
}

getComments().then(comment=>{
    const newCommentId = (comment[comment.length - 1].id) + 1;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let newComment = {
            postId: locationHash,
            id: newCommentId,
            name: name.value,
            email: email.value,
            body: textArea.value
        };
        postComments(newComment).then();
        location.reload();
    })
})