// get a reference to the search box
const searchBox = document.querySelector("#name");
const content = document.querySelector(".content");

let timerId;
searchBox.addEventListener("input", async event => {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    fetchData(event.target.value);
    content.innerHTML = "";
  }, 1000);
});

const fetchData = async searchTerm => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "thewdb",
      s: searchTerm
    }
  });
  response.data.Search.forEach(item => {
    createCard(item);
  });
};

createCard = movie => {
  const card = document.createElement("div");
  const image = document.createElement("img");
  const header = document.createElement("h3");

  if (movie.Poster === "N/A") {
    return;
  } else {
    image.src = movie.Poster;
  }

  header.textContent = movie.Title;

  card.classList.add("card");

  card.appendChild(image);
  card.appendChild(header);

  content.appendChild(card);
};
