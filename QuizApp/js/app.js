const quiz = new Quiz(soruListesi);
const ui = new UI();


document.getElementById("btnSoruGetir").addEventListener("click", function () {
    if (quiz.sorular.length != quiz.soruIndex) {
        ui.soruGoster(quiz.soruGetir());
        quiz.soruIndex += 1;
        console.log(quiz);
    }
    else {
        console.log("quiz bitti");
    }
});
