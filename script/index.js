const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.add("bg-primary", "text-white");

      displayLevelWord(data.data);
    });
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) =>
    btn.classList.remove("bg-primary", "text-white"),
  );
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length < 1) {
    wordContainer.innerHTML = `
    <div class="text-center flex flex-col col-span-full space-y-3 justify-center items-center">
            <img src="./assets/alert-error.png" alt="No words found">
            <p class="text-sm font-bn opacity-50">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-3xl font-bn">নেক্সট Lesson এ যান</h2>
    </div>`;
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
            <div class="bg-white rounded-lg shadow-sm text-center py-10 px-5 space-y-6">
            <h2 class="text-3xl font-bold">${word.word ? word.word : "No Word found"}</h2>
            <p class="text-xl font-medium">Meaning /Pronounciation</p>
            <div class="font-bn text-3xl font-semibold">${word.meaning ? word.meaning : "No meaning found"} / ${word.pronunciation ? word.pronunciation : "No pronounciation found"}</div>
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
    <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
      <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button> 
    `;
    levelContainer.append(btnDiv);
  }
  //     3.create Element
  //     4.append into container
};

loadLessons();
