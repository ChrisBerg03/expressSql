const contentInput = document
    .getElementById("contentInput")
    .addEventListener("click", () => {
        postTest();
    });
const contentContainer = document.getElementById("contentContainer");

async function postTest() {
    const res = await fetch("http://localhost:1313/test", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ content: `${contentInput.value}` }),
    });
    const data = await res.text();
    console.log(data);
    contentContainer.innerText = ``;
}
