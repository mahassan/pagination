const container = document.querySelector(".container");
const pagination = document.querySelector(".pagination");
let base_url;
let poster_sizes;
let movies;

function createButton(item) {
  const makeEven = item + 1;
  for (let i = 1; i <= makeEven; i++) {
    if (item % 2 !== 0) {
      buttonHTML(i);
    } else {
      buttonHTML(i);
    }
  }
}
function buttonHTML(index) {
  const button = document.createElement("button");
  button.innerText = index;
  button.addEventListener("click", (e) => {
    //when click happens, depending on the click the items of displayed movies will show
    //next the set
    for (let i = 0; i <= 10; i++) {
      container.innerHTML += `
                    <div class="movie-box">
                     <img src=${
                       base_url + poster_sizes[3] + movies[i].poster_path
                     } />
                     <h3>${movies[i].title}</h3>
                    </div>
            `;
            i+=10;
    }

    const element = e.target;
    if (element.classList.contains("selected")) {
      element.classList.remove("selected");
    } else {
      element.classList.add("selected");
    }
  });
  pagination.appendChild(button);
}
async function config() {
  const url = await "https://api.themoviedb.org/3/configuration";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGMyNTUyZjIxYTNjMzM5YjRiYzhjZDUxNjA2NjI0YyIsIm5iZiI6MTU4ODkzMjg1MC4yOCwic3ViIjoiNWViNTMwZjJlMzc1YzAwMDIyZmJkMWFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6F6pJqw4wr1ofovqE3eeQyL62PJEwuCyXNnohs1dcWk",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      const { images } = json;
      base_url = images.base_url;
      poster_sizes = images.poster_sizes;
    })
    .then(() => {
      const url =
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGMyNTUyZjIxYTNjMzM5YjRiYzhjZDUxNjA2NjI0YyIsIm5iZiI6MTU4ODkzMjg1MC4yOCwic3ViIjoiNWViNTMwZjJlMzc1YzAwMDIyZmJkMWFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6F6pJqw4wr1ofovqE3eeQyL62PJEwuCyXNnohs1dcWk",
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          const { results } = json;
          const resultsCount = results.length / 10;
          movies = results;
          createButton(resultsCount);
          moviesHTML(results);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

config();
function moviesHTML(results) {
  for (let i = 0; i <= 10; i++) {
    container.innerHTML += `
                    <div class="movie-box">
                     <img src=${
                       base_url + poster_sizes[3] + results[i].poster_path
                     } />
                     <h3>${results[i].title}</h3>
                    </div>
            `;
  }
}
