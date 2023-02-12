const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const circleButtons = document.querySelectorAll(".circle__button");
const resultScore = document.querySelector(".header__h2");
const gameResult = document.querySelector(".result__lower__h1")
const youCircle = document.querySelector(".picked__item__you");
const youCircleFront = document.querySelector(".front__you");
const houseCircle = document.querySelector(".picked__item__house");
const houseCircleFront = document.querySelector(".front__house");
const ruleButton = document.querySelector(".footer__button");
const rulePanel = document.querySelector(".rule");
const crossButton = document.querySelector(".footer__svg");
const resultPanel = document.querySelector(".result__lower");
console.log(resultPanel)

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
        currentStep -= 1
    } else {
        currentStep += 1
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

let score = 0;
let resultStr = '';
let intervalId;
let opacity = 0;
circleButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        const playerChoice = e.currentTarget.id;
        const houseChoice = housePick();
        const result = getGameResult(playerChoice, houseChoice);
        resultStr = getResultStr(result);
        gameResult.textContent = resultStr;

        showPlaysChoice(e);
        showHousesChoice(houseChoice);
        fadeIn();
        
        setTimeout(() => {
            score += result;
            resultScore.textContent = score;
        }, 2000);
    })
});

const fadeIn = () => {
    intervalId = setInterval(display, 128);
};

const display = () => {
    opacity = Number(window.getComputedStyle(houseCircle, null).getPropertyValue("opacity"));
    if (opacity < 1) {
        opacity += 0.1
        houseCircle.style.opacity = opacity;
    } else {
        opacity = 0;
        clearInterval(intervalId);
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
        str = 'THE HOUSE WINS';
    }
    return str;
};

const showPlaysChoice = (e) => {
    const backgroundColor = window.getComputedStyle(e.currentTarget ,null).getPropertyValue('background-color');
    const borderColor = window.getComputedStyle(e.target ,null).getPropertyValue('border-color');
    const bgImage = window.getComputedStyle(e.target ,null).getPropertyValue('background-image');
    youCircle.style.backgroundColor = backgroundColor;
    youCircleFront.style.backgroundColor = "#fff";
    youCircleFront.style.borderColor = borderColor;
    youCircleFront.style.backgroundImage = bgImage;
};

const showHousesChoice = (houseChoice) => {
    const houseButton = document.getElementById(houseChoice);
    const houseButtonFront = houseButton.childNodes[0];
    const backgroundColor2 = window.getComputedStyle(houseButton,null).getPropertyValue('background-color');
    const borderColor2 = window.getComputedStyle(houseButtonFront ,null).getPropertyValue('border-color');
    const bgImage2 = window.getComputedStyle(houseButtonFront ,null).getPropertyValue('background-image');
    houseCircle.style.backgroundColor = backgroundColor2;
    houseCircleFront.style.backgroundColor = "#fff";
    houseCircleFront.style.borderColor = borderColor2;
    houseCircleFront.style.backgroundImage = bgImage2;
    houseCircle.style.opacity = 0;
};