window.onload = () => {
  const colors = [
    "red",
    "orange",
    "green",
    "blue",
    "indigo",
    "violet",
    "white",
  ];

  let increment = 0;

  const timeParagraph = document.getElementById("time-paragraph");

  const changeColorButton = document.getElementById("change-color-button");

  const changeTimeFormatButton = document.getElementById(
    "change-time-format-button"
  );
  let isMilitary = true;
  changeTimeFormatButton.innerText = "AM/PM";
  changeTimeFormatButton.addEventListener("click", () => {
    if (isMilitary) {
      isMilitary = false;
      changeTimeFormatButton.innerText = "24:00";
    } else {
      isMilitary = true;
      changeTimeFormatButton.innerText = "AM/PM";
    }
  });

  changeColorButton.addEventListener("click", () => {
    timeParagraph.style = `color:${colors[increment]}`;
    increment++;
    if (increment == colors.length) {
      increment = 0;
    }
    changeColorButton.style = `color:${colors[increment]}`;
  });

  setInterval(() => {
    const date = new Date();
    let time = "";
    if (!isMilitary && date.getHours() > 12 && date.getHours < 24) {
      time = `${
        date.getHours() - 12
      } : ${date.getMinutes()} : ${date.getSeconds()} PM`;
      timeParagraph.innerText = time;
    } else if (!isMilitary && date.getHours() <= 12) {
      time = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} AM`;
      timeParagraph.innerText = time;
    } else {
      time = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
      console.log(time);
      timeParagraph.innerText = time;
    }
  }, 1000);
};
