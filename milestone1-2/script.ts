const ToggleButton = document.getElementById("toggleSkillButton") as HTMLButtonElement
const SkillsList = document.getElementById("skillsList") as HTMLElement

ToggleButton.addEventListener("click", ()=>{
    if(SkillsList.style.display === "block"){
        SkillsList.style.display = "none"
        ToggleButton.textContent = 'Click to Show Skills'
    }else{
        SkillsList.style.display = "block"
        ToggleButton.textContent = "Click to Hide Skills"
    }
})