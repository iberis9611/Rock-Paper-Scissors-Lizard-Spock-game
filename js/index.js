const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const circleButtons = document.querySelectorAll(".circle__button");
const resultScore = document.querySelector(".header__h2");
const gameResult = document.querySelector(".result__h1")
const ruleButton = document.querySelector(".footer__button");
const rulePanel = document.querySelector(".footer__container");
const crossButton = document.querySelector(".footer__svg");
const resultPanel = document.querySelector(".result__playAgain");
const playerCircle = document.querySelector(".playerCircle");
const playerInnerCircle = document.querySelector(".playerInnerCircle");
const houseCircle = document.querySelector(".houseCircle");
const houseInnerCircle = document.querySelector(".houseInnerCircle");
const loadingCircle = document.getElementsByClassName("loading");
const playerLoopingCircles = [...loadingCircle[0].getElementsByTagName("span")];
const houseLoopingCircles = [...loadingCircle[1].getElementsByTagName("span")];
const innerBoxShadow = window.getComputedStyle(playerInnerCircle, null).getPropertyValue("box-shadow");
let resultStr = '';
let score = 0;  
// If there is no active class, findIndex will return -1.
let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active")
})

// If there is no active class, add the class to the firstStep.
if (currentStep < 0) {
    currentStep = 0
    formSteps[currentStep].classList.add("active")
}
// Add click event listener to the form buttons so we can toggle between pages.
multiStepForm.addEventListener("click", e => {
    if (e.target.matches("[data-previous]")) {
        currentStep -= 1;
        clearStyle();
    } else {
        currentStep += 1;
    }
    showCurrentStep()
})
// Toggle active class to the current step
const showCurrentStep = () => {
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep)
    })
};

// Show rules panel upon clicking RULES button
ruleButton.addEventListener("click", e => {
    rulePanel.classList.add("showRule")
});

// Close rules panel upon clicking the cross button
crossButton.addEventListener("click", e => {
    rulePanel.classList.remove("showRule")
});

if(sessionStorage.getItem("myScore") && sessionStorage.getItem("myScore") !== resultScore.textContent) {
    resultScore.textContent = sessionStorage.getItem("myScore")
}

circleButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        const playerChoice = e.currentTarget.id;
        const houseChoice = housePick();
        const result = getGameResult(playerChoice, houseChoice);
        resultStr = getResultStr(result);
        score += result;
        sessionStorage.setItem("myScore", score);

        showPlaysChoice(e); 
        setTimeout(() => {
            showHousesChoice(houseChoice);
        }, 1500)
        setTimeout(() => {
            resultScore.textContent = sessionStorage.getItem("myScore");
            gameResult.textContent = resultStr;
            resultPanel.style.display ="flex";
            resultPanel.style.opacity = "1";

            setTimeout(() => {
                showDeepLoopingCircles(result);
            }, 1000)
        }, 3000)
    })
});

const clearStyle = () => {
    houseCircle.style.backgroundColor = "transparent";
    houseInnerCircle.style.backgroundColor = "hsla(0, 0%, 0%, 0.1)";
    houseInnerCircle.style.borderColor = "transparent";
    houseInnerCircle.style.backgroundImage = "none";
    houseInnerCircle.style.boxShadow = "none";
    playerLoopingCircles.forEach(circle => {
        circle.style.animationPlayState = "paused";
    })
    houseLoopingCircles.forEach(circle => {
        circle.style.animationPlayState = "paused";
    })
    resultPanel.style.opacity = "0";
    if (window.innerWidth >= 1024) {
        resultPanel.style.display = "none";
    }
};

const showDeepLoopingCircles = (result) => {
    if (result === 1) {
        playerLoopingCircles.forEach(circle => {
            circle.style.animationPlayState = "running";
        })
    }
    if (result === -1) {
        houseLoopingCircles.forEach(circle => {
            circle.style.animationPlayState = "running";
        })
    }
};

const housePick = () => {
    let housePick;
    const house = Math.floor(Math.random() * 5 + 1)
    if (house === 1) {
        housePick = 'rock'
    }
    if (house === 2) {
        housePick = 'paper'
    }
    if (house === 3) {
        housePick = 'scissors'
    }
    if (house === 4) {
        housePick = 'lizard'
    }
    if (house === 5) {
        housePick = 'spock'
    }
    return housePick;
};

const getGameResult = (you, house) => {
    let result = 0;
    if (you === 'rock') {
        if (house === 'lizard' || house === 'scissors') {
            result = 1;
        } else if (house === 'spock' || house === 'paper') {
            result = -1;
        } else {
            result = 0;
        }
    }
    if (you === 'paper') {
        if (house === 'rock' || house === 'spock') {
            result = 1;
        } else if (house === 'lizard' || house === 'scissors') {
            result = -1;
        } else {
            result = 0;
        }
    }
    if (you === 'scissors') {
        if (house === 'paper' || house === 'lizard') {
            result = 1;
        } else if (house === 'spock' || house === 'rock') {
            result = -1;
        } else {
            result = 0;
        }
    }
    if (you === 'lizard') {
        if (house === 'spock' || house === 'paper') {
            result = 1;
        } else if (house === 'rock' || house === 'scissors') {
            result = -1;
        } else {
            result = 0;
        }
    }
    if (you === 'spock') {
        if (house === 'rock' || house === 'scissors') {
            result = 1;
        } else if (house === 'lizard' || house === 'paper') {
            result = -1;
        } else {
            result = 0;
        }
    }
    return result;
};

const getResultStr = (result) => {
    let str = '';
    if (result === 1) {
        str = 'YOU WIN';
    } else if (result === 0) {
        str = 'TIE GAME';
    } else {
        str = 'YOU LOSE';
    }
    return str;
};

const showPlaysChoice = (e) => {
    const backgroundColor = window.getComputedStyle(e.currentTarget ,null).getPropertyValue('background-color');
    const borderColor = window.getComputedStyle(e.target ,null).getPropertyValue('border-color');
    const bgImage = window.getComputedStyle(e.target ,null).getPropertyValue('background-image');
    playerCircle.style.backgroundColor = backgroundColor;
    playerInnerCircle.style.backgroundColor = "#fff";
    playerInnerCircle.style.borderColor = borderColor;
    playerInnerCircle.style.backgroundImage = bgImage;
};

const showHousesChoice = (houseChoice) => {
    const houseButton = document.getElementById(houseChoice);
    const houseButtonFront = houseButton.childNodes[0];
    const backgroundColor2 = window.getComputedStyle(houseButton,null).getPropertyValue('background-color');
    const borderColor2 = window.getComputedStyle(houseButtonFront ,null).getPropertyValue('border-color');
    const bgImage2 = window.getComputedStyle(houseButtonFront ,null).getPropertyValue('background-image');
    houseCircle.style.backgroundColor = backgroundColor2;
    houseInnerCircle.style.backgroundColor = "#fff";
    houseInnerCircle.style.borderColor = borderColor2;
    houseInnerCircle.style.backgroundImage = bgImage2;
    houseInnerCircle.style.boxShadow = innerBoxShadow;
};