const params = new URLSearchParams(window.location.search)
const origi = params.get("origi")
const nam = params.get("name")
const title = document.getElementById("name")
const story = document.getElementById("story")
let isaved = true;
let dontSavedTitle = title.value
let dontSavedStory = story.value
const main = document.querySelector("main")
const saveb = document.getElementById("save")
const back = document.getElementById("back")
function isSaved(){
    if (isaved){
        main.style = "background-color: white;"
        story.style = "background-color: white;"
        title.style = "background-color: white;"
        saveb.style = "background-color: greenyellow;"
    }
    else{
        main.style = "background-color: rgb(230, 230, 230);"
        story.style = "background-color: rgb(230, 230, 230);"
        title.style = "background-color: rgb(230, 230, 230);"
        saveb.style = "background-color: red;"
    }
}


function autoResize() {
    story.style.height = "auto"
    story.style.height = story.scrollHeight + "px"
    if (isaved){
        isaved = false;
        isSaved()
    }
}

story.addEventListener("input", autoResize)

title.addEventListener("input", () => {
    if (isaved){
        isaved = false;
        isSaved()
    }
})

saveb.addEventListener("click", () => {
    if (!isaved){
        isaved = true
        if (nam){
            fetch(`https://employment-stripes-screening-compression.trycloudflare.com/stories/${origi}/${nam}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json; charset=utf-8",
                    "x-admin-token": localStorage.getItem("adminToken")
                },
                body: JSON.stringify({name: title.value, story: story.value})
            })
            .then(r => r.json())
            .then(data => {
                alert(data.message)

                if(data.message === "Сохранено"){
                    const params = new URLSearchParams({
                    origi: origi,
                    name: title.value
                    })

                    window.location.replace(`story.html?${params.toString()}`)
                }
            })
        }
        else{
            fetch(`https://employment-stripes-screening-compression.trycloudflare.com/stories/${origi}`, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8",
                    "x-admin-token": localStorage.getItem("adminToken")
                 },
                body: JSON.stringify({name: title.value, story: story.value})
            })
            .then(r => r.json())
            .then(data => {
                alert(data.message)

                if(data.message === "История добавлена!"){
                    const params = new URLSearchParams({
                    origi: origi,
                    name: title.value
                    })

                    window.location.replace(`story.html?${params.toString()}`)
                }
            })
        }
    }
})
back.addEventListener("click", () => {
    window.location.replace(`stories.html?name=${encodeURIComponent(origi)}`);
})


if (nam){
    fetch(`https://employment-stripes-screening-compression.trycloudflare.com/stories/${origi}/${nam}`)
    .then(r => r.json())
    .then(data => {
        if ("message" in data){
            alert(data.message)
        }
        else{
            title.value = data.name
            story.value = data.story
        }
    })
}
else{
    title.value = "НАПИШИ название"
    story.value = "НАПИШИ историю"
}
