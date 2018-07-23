const mainJs = () => {
  const fuckingWords = [
    "кортавый",
    "честный",
    "добрый",
    "хайповый",
    "нетрадиционный",
    "хип-хоп",
    "чудовищный",
    "слабо типизированный",
    "монолитный",
    "больной",
    "сиплый",
    "от души",
    "дерзкий по версии Вадима Макеева",
    "твой любимый",
    "флеймовый",
    "пьяный",
    "беспристрастный",
    "свежий",
    "непродажный",
    "радикальный",
    "вездесущий",
    "автономный",
    "прекрасный",
    "продажный",
    "}{yeвежливый",
    "сердитый",
    "зрелый",
    "радужный",
    "is not a function"
    // дальше з@ебался слушать и печатать
  ];

  const getFuckingWord = currentWord => {
    const newWord =
      fuckingWords[Math.floor(Math.random() * fuckingWords.length)];
    return newWord !== currentWord ? newWord : getFuckingWord(currentWord);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const fuckingWordDOM = document.querySelectorAll(".fucking-word");
    setInterval(() => {
      for (let elemDOM of fuckingWordDOM) {
        elemDOM.textContent = getFuckingWord(elemDOM.textContent);
      }
    }, 2000);
  });
};

mainJs();
