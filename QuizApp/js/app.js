const quiz = new Quiz(soruListesi);
const ui = new UI();


ui.soruGoster(quiz.soruGetir());
ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);

ui.btnNext.addEventListener("click", function () {
    quiz.soruIndex++;
    if (quiz.soruIndex < quiz.sorular.length) {
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    } else {
        console.log("quiz bitti");
        ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
    }
});

function optionSelected(e) {
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
}

ui.btnQuit.addEventListener("click", function () {
    window.location.reload();
});

ui.btnReplay.addEventListener("click", function () {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    // start button
    ui.btnNext.click();
    ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
});
