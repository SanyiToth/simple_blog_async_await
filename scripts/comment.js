const form = document.getElementById("form-add-comment");
const name = document.getElementById("name");
const email = document.getElementById("email");
const textArea = document.getElementById("comment");
const submit = document.getElementById("submit");
const errorMessage = document.getElementById("error")
const INPUT_MIN_LENGTH = 6;
const TEXTAREA_MIN_LENGTH = 30;
const commentHost = "http://localhost:3000/comments"


async function postComments(newComment) {
    let response = await fetch("http://localhost:3000/comments", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })
    if (!(await response).ok) throw Error(response.statusText)
    else return await response.json();
}

async function getComments() {
    let response = await fetch(commentHost);
    return await response.json();
}

getComments()
    .then(comment => {
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
            postComments(newComment)
                .then(() => {
                    location.reload()
                })

                .catch(() => errorMessage.innerText = "Error 404: Could not send your comment!")
        })
    })


//Validation

function isInputValid(input) {
    return input.value.length >= INPUT_MIN_LENGTH;
}

function isTextAreaValid(textarea) {
    return textarea.value.length >= TEXTAREA_MIN_LENGTH;
}

function addClassToInput(input) {
    if (isInputValid(input)) {
        input.classList.add("valid");
        input.classList.remove("invalid");
    } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
    }
}

function addClassToTextarea(textarea) {
    if (isTextAreaValid(textarea)) {
        textarea.classList.add("valid");
        textarea.classList.remove("invalid");
    } else {
        textarea.classList.add("invalid");
        textarea.classList.remove("valid");
    }
}

form.addEventListener("keyup", (event) => {
    event.stopPropagation();
    addClassToInput(name);
    addClassToInput(email);
    addClassToTextarea(textArea);
    submit.disabled = !(isInputValid(name) && isInputValid(email) && isTextAreaValid(textArea));
})


