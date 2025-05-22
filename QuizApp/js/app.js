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
    }
});

function optionSelected(e) {
    const cevap = e.target.textContent[0];

    let selectedElement = e.target;
    if (selectedElement.nodeName === "SPAN") {
        selectedElement = selectedElement.parentElement;
    }

    const soru = quiz.soruGetir();

    if (soru.cevabiKontrolEt(cevap)) {
        selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
    }

    ui.disableAllOption();
}
