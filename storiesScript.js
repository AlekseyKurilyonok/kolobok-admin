let names = []
const ad = document.getElementById("add")
const main = document.getElementById("main")
const params = new URLSearchParams(window.location.search)
const nam = params.get("name")
const back = document.getElementById("back")
fetch(`https://voluminous-nerte-sofaknight-5a685afe.koyeb.app/kolobok-serverAPI/stories/${nam}`)
.then(r => r.json())
.then(data => {
    if ('message' in data){
        alert(data.message)
    }
    else if ("names" in data){
        names = data.names
    }
    const cop = document.getElementById("copy")
    names.forEach(element => {
        const but = cop.content.cloneNode(true)
        const button = but.querySelector(".story")
        const text = button.querySelector(".text")
        const close = button.querySelector(".x")
        text.textContent = element
        button.addEventListener("click", () => {
            const params = new URLSearchParams({
            origi: nam,
            name: element
            })

            window.location.replace(`story.html?${params.toString()}`)
        })
        close.addEventListener("click", (e) => {
            e.stopPropagation()

            if (!confirm(`Удалить "${element}"?`)) return

            fetch(`https://voluminous-nerte-sofaknight-5a685afe.koyeb.app/kolobok-serverAPI/stories/${nam}/${encodeURIComponent(element)}`, {
            headers: {"x-admin-token": localStorage.getItem("adminToken")},
            method: "DELETE"
            })
            .then(location.reload())
        })
        main.prepend(but)
    });
})

ad.addEventListener("click", () => {
    const params = new URLSearchParams({
    origi: nam,
    name: ""
    })

    window.location.replace(`story.html?${params.toString()}`)
})

back.addEventListener("click", () => {
    window.location.replace(`index.html`);
})
