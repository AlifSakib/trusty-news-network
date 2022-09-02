//Loading Catagories

const loadCatagories = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/categories`
    );
    const data = await res.json();
    displayCatagories(data.data.news_category);
  } catch (erroe) {
    console.log(erroe);
  }
};

const displayCatagories = (categories) => {
  console.log(categories[0]);
  const catagoriesContainer = document.getElementById("catagories-container");

  categories.forEach((category) => {
    const { category_id: id, category_name: name } = category;
    const catagorieList = document.createElement("li");
    catagorieList.innerHTML = `
    <button>${name}</button>
    `;
    catagoriesContainer.appendChild(catagorieList);
  });
};

loadCatagories();
