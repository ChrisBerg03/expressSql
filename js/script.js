// const contentBtn = document.getElementById("contentBtn");

// const contentInput = document.getElementById("contentInput");

// const contentContainer = document.getElementById("contentContainer");

// async function postTest() {
//     const res = await fetch("http://localhost:1313/test", {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//         },
//         body: JSON.stringify({ content: `${contentInput.value}` }),
//     });
//     const data = await res.text();
//     console.log(data);
// }

// contentBtn.addEventListener("click", () => {
//     postTest();
// });

// async function getTest() {
//     const res = await fetch("http://localhost:1313/test");
//     const data = await res.json();
//     console.log(data);
//     contentContainer.innerHTML = `<p>${data.id || "No ID"}</p>
//     <p>${data.content || "No Content"}</p>`;
// }

// getTest();

const blogContainer = document.getElementById("blogContainer");

async function getBlog() {
    const res = await fetch("http://localhost:1313/blog", {
        method: "GET",
    });
    const data = await res.json();
    console.log(data);

    data.forEach((post) => {
        blogContainer.innerHTML += `
            <div data-id="${post.id}" class="post"> 
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p>${post.comments}</p>
                <img src="${post.imageUrl}"/>
                <label for="commentInput">add a comment</label>
                <input id="commentInput"/>
                <button>Add comment</button>
                <button class="deleteBtn">Delete this post</button>
            </div>
        `;
    });
}

const createTitle = document.getElementById("createTitle");
const createContent = document.getElementById("createContent");
const createImageUrl = document.getElementById("createImageUrl");
const blogPostBtn = document.getElementById("blogPostBtn");

blogPostBtn.addEventListener("click", postBlog);

async function postBlog() {
    const res = await fetch("http://localhost:1313/blog", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            title: `${createTitle.value}`,
            content: `${createContent.value}`,
            imageUrl: `${createImageUrl.value}`,
        }),
    });
    const data = await res.json();
    console.log(data);
}

getBlog();
