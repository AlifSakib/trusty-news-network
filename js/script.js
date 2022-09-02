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
    <button onclick="getCategoryId('${id}')">${name}</button>
    `;
    catagoriesContainer.appendChild(catagorieList);
  });
};

loadCatagories();

// function getCategoryId(id) {
//   console.log(id);
// }

const getCategoryId = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

  const loadNews = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      displayNews(data.data);
    } catch (erroe) {
      console.log(erroe);
    }
  };
  const displayNews = (news) => {
    const articleContainer = document.getElementById("articles-container");
    articleContainer.innerHTML = "";
    news.forEach((data) => {
      console.log(data);

      const {
        title,
        details,
        thumbnail_url: image,

        total_view: views,
        author: { name, img, published_date },
      } = data;
      const newsDiv = document.createElement("div");

      newsDiv.innerHTML = `
      <div class="card card-side bg-base-100 shadow-xl my-10">
            <figure class="px-6 py-6">
              <img
                class="rounded-lg"
                src="${image}"
                alt="newsThumb"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${title}</h2>
              <p>${details.slice(0, 200)}</p>
              <p>${details.slice(200, 300)}</p>
              <!-- Article Detils -->
              <div class="flex justify-between">
                <!-- Author  -->
                <div class="flex items-center gap-4">
                  <img class="h-10 rounded-full" src="${img}" alt="" />
                  <div>
                  <p>${name ? name : "Author Not Found"}</p>
                  <p>${published_date ? published_date : "No Date Found"}</p>
                  </div>
                </div>
                <!-- Article Views -->

                <div class="flex items-center gap-2">
                  <i class="fa-regular fa-eye"></i>
                  <p>${views ? views : "Not Found"}</p>
                </div>
                <div class="card-actions">
                  <button class="btn btn-primary">Details</button>
                </div>
                <!-- Author  End-->
              </div>
              <!-- Article end -->
            </div>
          </div>
      `;
      articleContainer.appendChild(newsDiv);
    });
  };

  loadNews();
};
