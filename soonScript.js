const save = document.getElementById("save")
const soon = document.getElementById("text")
const back = document.getElementById("back")
let isaved = true

function isSaved(){
    if (isaved){
        save.style = "background-color: greenyellow;"
    }
    else{
        save.style = "background-color: red;"
    }
}

save.addEventListener("click", () => {
    if(!isaved){
        isaved = true
        fetch("http://localhost:2000/fields/soon", {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                "x-admin-token": localStorage.getItem("adminToken")
            },
            body: JSON.stringify({value: soon.value})
        })
        .then(r => r.json())
        .then(data => {
            alert(data.message)

            if(data.message === "Сохранено"){
                isSaved()
            }
            else{
                isaved = false
            }
        })
    }
})

back.addEventListener("click", () => {
    window.location.replace("index.html")
})

text.addEventListener("input", () => {
    isaved = false
    isSaved()
})

fetch("http://localhost:2000/fields/soon")
.then(r => r.json())
.then(data => {
    if("message" in data){
        alert(data.message)
    } else{
        soon.value = data.text
    }
})
