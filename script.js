if (!localStorage.getItem("adminToken")) {
    location.replace("login.html")
}
let w = document.getElementById("winners")
let ws = document.getElementById("winnersave")
fetch("https://employment-stripes-screening-compression.trycloudflare.com/fields/winners")
.then(r => r.json())
.then(data => {
    if ("text" in data){
        w.value = data.text;
    } else if ("message" in data) {
        alert(data.message)
    }
})
ws.addEventListener("click", () => {
    let value = w.value
    fetch("https://employment-stripes-screening-compression.trycloudflare.com/fields/winners", {
        method: "PUT",
        headers: { "Content-Type": "application/json",
            "x-admin-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({value: value})
    })
    .then(r => r.json())
    .then(m => alert(m.message))
})
let st = document.getElementById("stories")
let fan = document.getElementById("fanstories")
let soon = document.getElementById("soon")
st.addEventListener("click", () => {
    window.location.replace(`stories.html?name=${encodeURIComponent("orig")}`)
})
fan.addEventListener("click", () => {
    window.location.replace(`stories.html?name=${encodeURIComponent("fan")}`)
})
soon.addEventListener("click", () => {
    window.location.replace(`soon.html`)
})