let row = document.querySelector("#row");

let userInput = document.getElementById("userInput");
let mealSelect = document.getElementById("mealSelect");
let searchBtn = document.getElementById("searchBtn");


async function callApi(meal) {
    let cartona = '';
    let result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    let data = await result.json();
    let meals = data.recipes;
    for (let i = 0; i < meals.length; i++) {
        cartona += `
        <div class="col-12 col-md-4 col-lg-4">
        <div class="card h-100">
        <img src="${meals[i].image_url}" class="card-img-top" alt="${meals[i].title}">
        <div class="card-body d-flex flex-column">
        <h5 class="card-title">${meals[i].title}</h5>
        <div class="recipe-details mt-2 mb-3">
        <p class="mb-1"><b>Recipe ID:</b> ${meals[i].recipes_id}</p>
        <p class="mb-1"><b>Publisher:</b> ${meals[i].publisher}</p>
        <p class="mb-1"><b>Social Rank:</b> ${Math.round(meals[i].social_rank)}</p>
        </div>
        <button class="btn btn-view mt-auto">
        View Recipe
        </button>
        </div>
        </div>
        </div>
        `;
    }
    row.innerHTML = cartona;

}

searchBtn.addEventListener("click", () => {
    let term = userInput.value.trim();
    if (term) callApi(term);
});


userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let term = userInput.value.trim();
        if (term) callApi(term);
    }
});

mealSelect.addEventListener("change", (e) => {
    let term = e.target.value;
    userInput.value = term;
    callApi(term);
});

callApi("pizza");