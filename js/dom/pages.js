let hidden = false
let transitioning = false

export const isHidden = () => {
    return hidden
}

export const showProjects = () => {
    if (!transitioning) {
        transitioning = true
        if (!hidden) {
            applyMargin()
        }
        document.getElementById("projectspage").style.display = "grid"

        setTimeout(() => {
            document.getElementById("projectspage").style.visibility = "visible"
            document.getElementById("projectspage").style.opacity = "100"
        }, 10)

        if (document.getElementById("aboutpage").style.display !== "none") {
            document.getElementById("aboutpage").style.visibility = "hidden"
            document.getElementById("aboutpage").style.opacity = "0"
            setTimeout(() => {
                document.getElementById("aboutpage").style.display = "none"
                transitioning = false
            }, 1000)
        } else {
            transitioning = false
        }
    }
}

export const showAbout = () => {
    if (!transitioning) {
        transitioning = true
        if (!hidden) {
            applyMargin()
        }
        document.getElementById("aboutpage").style.display = "grid"

        setTimeout(() => {
            document.getElementById("aboutpage").style.visibility = "visible"
            document.getElementById("aboutpage").style.opacity = "100"
        }, 10)

        if (document.getElementById("projectspage").style.display !== "none") {
            document.getElementById("projectspage").style.visibility = "hidden"
            document.getElementById("projectspage").style.opacity = "0"
            setTimeout(() => {
                document.getElementById("projectspage").style.display = "none"
                transitioning = false
            }, 1000)
        } else {
            transitioning = false
        }
    }
}

export const removeMargin = () => {
    document.getElementById("title").style.marginTop = "100px"
    document.getElementById("title").style.opacity = "100"
    document.getElementById("subtitle").style.opacity = "100"
    hidden = false

    document.getElementById("projectspage").style.opacity = "0"
    document.getElementById("projectspage").style.visibility = "hidden"
    setTimeout(() => {
        document.getElementById("projectspage").style.display = "none"
    }, 1100)

    document.getElementById("aboutpage").style.opacity = "0"
    document.getElementById("aboutpage").style.visibility = "hidden"
    setTimeout(() => {
        document.getElementById("aboutpage").style.display = "none"
    }, 1100)

    document.getElementById("arrow").style.visibility = "hidden"
    document.getElementById("arrow").style.opacity = "0"
}

const applyMargin = () => {
    document.getElementById("title").style.marginTop = "-21vmax"
    document.getElementById("title").style.opacity = "0"
    document.getElementById("subtitle").style.opacity = "0"
    hidden = true

    setTimeout(() => {
        document.getElementById("arrow").style.visibility = "visible"
        document.getElementById("arrow").style.opacity = "100"
    }, 1100)
}
