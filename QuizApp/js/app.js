const quiz = new Quiz(soruListesi);
const ui = new UI();

ui.btnStart.addEventListener("click", function () {
    startTimer(10);
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btnNext.classList.remove("show");
});

ui.soruGoster(quiz.soruGetir());
ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);

ui.btnNext.addEventListener("click", function () {
    quiz.soruIndex++;
    if (quiz.soruIndex < quiz.sorular.length) {
        startTimer(10);
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btnNext.classList.remove("show");
    } else {
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");
        ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
    }
});

function optionSelected(e) {
    clearInterval(counter);
    let selectedElement = e.target;

    if (selectedElement.nodeName === "SPAN") {
        selectedElement = selectedElement.parentElement;
    }

    const cevap = e.target.textContent[0];
    const soru = quiz.soruGetir();

    if (soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi += 1;
        selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
    }

    ui.disableAllOption();
    ui.btnNext.classList.add("show");
}

quiz.soruIndex += 1;
ui.disableAllOption();
ui.btnNext.classList.add("show");

ui.disableAllOption();

ui.btnQuit.addEventListener("click", function () {
    window.location.reload();
});

ui.btnReplay.addEventListener("click", function () {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;

    // start button
    ui.btnStart.click();
    ui.scoreBox.classList.remove("active");
});

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        ui.timeSecond.textContent = time;
        time--;

        if (time < 0) {
            clearInterval(counter);
            ui.timeText.textContent = "Süre Bitti";

            ui.disableAllOption();

            ui.btnNext.classList.add("show");
        }
    }
}
