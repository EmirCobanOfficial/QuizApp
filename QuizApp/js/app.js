const quiz = new Quiz(soruListesi);
const ui = new UI();

// Quiz başlatıldığında yapılacaklar
ui.btnStart.addEventListener("click", function () {
    startTimer(10);
    startTimerLine();
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");

    // 1. soruyu göster
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btnNext.classList.remove("show");
});

// "Sonraki" butonuna tıklanırsa
ui.btnNext.addEventListener("click", function () {
    quiz.soruIndex++;

    if (quiz.soruIndex < quiz.sorular.length) {
        startTimer(10);
        startTimerLine();
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btnNext.classList.remove("show");
    } else {
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");
        ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
    }
});

// Cevap seçildiğinde yapılacaklar
function optionSelected(e) {
    clearInterval(counter);
    clearInterval(counterLine);
    let selectedElement = e.target;

    if (selectedElement.nodeName === "SPAN") {
        selectedElement = selectedElement.parentElement;
    }

    const cevap = selectedElement.textContent[0];
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

// "Çık" butonu
ui.btnQuit.addEventListener("click", function () {
    window.location.reload();
});

// "Tekrar Oyna" butonu
ui.btnReplay.addEventListener("click", function () {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.scoreBox.classList.remove("active");
    ui.btnStart.click();
});

// Zamanlayıcı
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

// Zaman çizgisi
let counterLine;
function startTimerLine() {
    let line_width = 0;
    counterLine = setInterval(timer, 20);

    function timer() {
        line_width += 1;
        ui.timeLine.style.width = line_width + "px";

        if (line_width > 549) {
            clearInterval(counterLine);
        }
    }
}
