function Soru(SoruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = SoruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
};

Soru.prototype.cevabiKontrolEt = function (cevap) {
    return cevap === this.dogruCevap;
};

const soruListesi = [
    new Soru("1-Hangisi Javascript paket yönetim uygulamasıdır?", { a: "Node.js", b: "Typescript", c: "Nuget", d: "Npm" }, "d"),
    new Soru("2-Hangisi frontend kapsamında değerlendirilmez?", { a: "Css", b: "Html", c: "Javascript", d: "Sql" }, "d"),
    new Soru("3- Hangisi backend kapsamında değerlendirilir?", { a: "Node.js", b: "Typescript", c: "Angular", d: "React" }, "a"),
    new Soru("1-Hangisi javascript programlama dilini kullanmaz?", { a: "React", b: "Angular", c: "Vue.js", d: "Asp.net" }, "d")
];


