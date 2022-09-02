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
  const catagoriesContainer = document.getElementById("catagories-container");

  categories.forEach((category) => {
    const { category_id: id, category_name: name } = category;
    const catagorieList = document.createElement("li");
    catagorieList.innerHTML = `
    <button class="category-btn" onclick="getCategoryId('${id}')">${name}</button>
    `;
    catagoriesContainer.appendChild(catagorieList);
  });
};

loadCatagories();

// function getCategoryId(id) {
// console.log(id);
// }

const getCategoryId = (category_id) => {
  spinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

  const categoriesNames = document.getElementsByClassName("category-btn");
  for (const categoriesName of categoriesNames) {
    categoriesName.addEventListener("click", function () {
      const name = document.getElementById("category-name");
      name.innerText = categoriesName.innerText;
    });
  }

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
    const countNews = document.getElementById("numbers-of-news");
    if (news.length === 0) {
      countNews.innerText = 0;
    }

    articleContainer.innerHTML = "";
    let count = 0;

    news.forEach((data) => {
      count += 1;
      countNews.innerText = count;

      const {
        title,
        details,
        thumbnail_url: image,

        total_view: views,
        _id,
        author: { name, img, published_date },
        rating: { number, badge },
      } = data;
      const newsDiv = document.createElement("div");

      newsDiv.innerHTML = `
      <div class="card card-side bg-base-100 shadow-xl my-10 flex flex-col md:flex-row">
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
              <div class="flex justify-between items-center flex-col md:flex-row space-y-6 md:space-y-0 mt-6 md:mt-0">
                <!-- Author  -->
                <div class="flex items-center gap-4">
                  <img class="h-10 rounded-full" src="${img}" alt="" />
                  <div>
                  <p>${name ? name : "Author Not Found"}</p>
                  <p>${(published_date
                    ? published_date
                    : "No Date Found"
                  ).slice(0, 10)}</p>
                  </div>
                </div>
                <!-- Article Views -->

                <div class="flex items-center gap-2">
                  <i class="fa-regular fa-eye"></i>
                  <p>${views ? views : "Not Found"}</p>
                </div>

                <!-- Ratings -->
                
                <div class="flex items-center">
                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">${number}</p>
                    <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">${badge}</a>
                </div>

                <!-- Button -->
                <div class="card-actions">
                  <button onclick="showMore('${_id}')" class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                data-modal-toggle="extralarge-modal"
                >
                Extra large modal</button>
                </div>
                <!-- Author  End-->
              </div>
              <!-- Article end -->
            </div>
          </div>
      `;
      articleContainer.appendChild(newsDiv);
    });
    spinner(false);
  };

  loadNews();
};

function spinner(isLoading) {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
}

const showMore = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;

  const newsDetails = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      displayDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const displayDetails = (details) => {
    details.forEach((detail) => {
      console.log(detail);

      const { title, image_url: thumb, details } = detail;
      const modalContainer = document.getElementById("modal");

      modalContainer.innerHTML = `
      
      <div
          id="extralarge-modal"
          tabindex="-1"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full flex justify-center items-center"
        >
          <div class="relative p-4 w-full max-w-7xl h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div
                class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600"
              >
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                  ${title}
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="extralarge-modal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->

              <div class="p-6 space-y-6">
                <div class="">
                <img class="w-full h-96 object-cover" src="${thumb}">
                </div>
                <p
                  class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                >
                  ${details.slice(0, 200)}
                </p>
                <p
                  class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                >
                ${details.slice(200, 400)}
                </p>
                <p
                  class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                >
                ${details.slice(400)}
                </p>
              </div>
              <!-- Modal footer -->
              <div
                class="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
              >
                <button
                  onclick="closeModal()"
                  data-modal-toggle="extralarge-modal"
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Close
                </button>
                
              </div>
            </div>
          </div>
        </div>
      
      `;
    });
    showModal();
  };
  newsDetails();
};

function showModal() {
  const showModal = document.getElementById("extralarge-modal");
  showModal.classList.remove("hidden");
}

function closeModal() {
  const closeModal = document.getElementById("extralarge-modal");
  closeModal.classList.add("hidden");
}
