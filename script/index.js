const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="bg-white rounded-lg shadow-sm text-center py-10 px-5 space-y-6">
            <h2 class="text-3xl font-bold">${word.word}</h2>
            <p class="text-xl font-medium">Meaning /Pronounciation</p>
            <div class="font-bn text-3xl font-semibold">${word.meaning} / ${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-blue-100 h-8 w-8 rounded-sm hover:bg-primary hover:text-white"><i
                        class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-blue-100 h-8 w-8 rounded-sm hover:bg-primary hover:text-white"><i
                        class="fas fa-volume-up"></i></button>
            </div>
        </div>
    `;
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  //   1. get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  //   2. get into every lessons
  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
      <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>
    `;
    levelContainer.append(btnDiv);
  }
  //     3.create Element
  //     4.append into container
};

loadLessons();
