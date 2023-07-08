let isDOBopen = false;
let dateOfBirth;
const settingsGearElement = document.getElementById("settingsIcon");
const settingsContentElement = document.getElementById("settingsContent");
const initialTextElement = document.getElementById("initialText");
const afterDOBBtnTxtElement = document.getElementById("afterDOBBtnTxt");
const dobButtonElement = document.getElementById("dob-btn");
const dobInputElement = document.getElementById("dob-input");
const timeInputElement = document.getElementById("time-input");

const yearElement = document.getElementById("year");
const monthElement = document.getElementById("month");
const dayElement = document.getElementById("day");
const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");

const makeTwoDigitNumber = (number) => {
    return number > 9 ? number : `0${number}`;
};

const toggleDateOfBirthSelector = () => {
    if (isDOBopen) {
        settingsContentElement.classList.add("hide");
    } else {
        settingsContentElement.classList.remove("hide");
    };
    isDOBopen = !isDOBopen;
};

const updateAge = () => {
    const currentDate = new Date();
    const dateString = dobInputElement.value;
    const timeString = timeInputElement.value;

    if (dateString && timeString) {
        const dateTimeString = `${dateString} ${timeString}`;
        dateOfBirth = new Date(dateTimeString);
        const dateDiff = currentDate - dateOfBirth;

        const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
        const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 30.436875)) % 12);
        const day = Math.floor((dateDiff / (1000 * 60 * 60 * 24)) % 30.436875);
        const hour = Math.floor((dateDiff / (1000 * 60 * 60)) % 24);
        const minute = Math.floor((dateDiff / (1000 * 60)) % 60);
        const second = Math.floor((dateDiff / 1000) % 60);

        yearElement.innerHTML = makeTwoDigitNumber(year);
        monthElement.innerHTML = makeTwoDigitNumber(month);
        dayElement.innerHTML = makeTwoDigitNumber(day);
        hourElement.innerHTML = makeTwoDigitNumber(hour);
        minuteElement.innerHTML = makeTwoDigitNumber(minute);
        secondElement.innerHTML = makeTwoDigitNumber(second);
    } else {
        yearElement.innerHTML = "00";
        monthElement.innerHTML = "00";
        dayElement.innerHTML = "00";
        hourElement.innerHTML = "00";
        minuteElement.innerHTML = "00";
        secondElement.innerHTML = "00";
    }
};

const setDobHandler = () => {
    const dateString = dobInputElement.value;

    dateOfBirth = dateString ? new Date(dateString) : null;

    if (dateOfBirth) {
        initialTextElement.classList.add("hide");
        afterDOBBtnTxtElement.classList.remove("hide");
        setInterval(() => updateAge(), 1000);
    } else {
        afterDOBBtnTxtElement.classList.add("hide");
        initialTextElement.classList.remove("hide");
        updateAge();
    };
};

window.onload = function () {
    dobInputElement.value = "";
    timeInputElement.value = "";
    setDobHandler();
};


settingsGearElement.addEventListener("click", toggleDateOfBirthSelector);
dobButtonElement.addEventListener("click", setDobHandler);