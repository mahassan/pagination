const container = document.querySelector(".container");
const pagination = document.querySelector(".pagination");
function createButton(item){
  const makeEven = item + 1;
   for(let i = 1; i <= makeEven; i++){
     if(item % 2 !== 0){
      pagination.innerHTML += `<button>${i}</button>`
     }else{
      pagination.innerHTML += `<button>${i}</button>`
     }
   }
}
let base_url;
let poster_sizes;
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
          const resultsCount = results.length;
          createButton(resultsCount);
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
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

config();
