const quiz = new Quiz(soruListesi);
const ui = new UI();


document.getElementById("btnSoruGetir").addEventListener("click", function () {
    if (quiz.sorular.length != quiz.soruIndex) {
        ui.soruGoster(quiz.soruGetir());
        console.log(quiz);
    }
    else {
        console.log("quiz bitti");
    }
});

function optionSelected(e) {
    const cevap = e.target.textContent[0];
    const soru = quiz.soruGetir();

    if (soru.cevabiKontrolEt(cevap)) {
        e.target.classList.add("correct");
        e.target.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        e.target.classList.add("incorrect");
        e.target.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
    }
    quiz.soruIndex += 1;
    ui.disableAllOption();
}
