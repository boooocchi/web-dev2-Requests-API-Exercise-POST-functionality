const listElement = document.querySelector(".posts");
const fetchButton = document.querySelector("#available-posts button");
const postTemplate = document.querySelector("template");
const addButton = document.querySelector(".add-btn");
const title = document.querySelector("#title");
const content = document.querySelector("#content");

async function sendHttpRequest(method, url) {
  //with XHR
  // const promise = new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest()
  //     xhr.open(method, url)
  //     xhr.onload = function(){
  //         if(xhr.status >= 200 && xhr.status < 300){
  //             //return the data back
  //             resolve(xhr.response)
  //         }else{
  //             reject("Something went wrong..... :<")
  //         }
  //     }
  //     xhr.send();
  // })

  // return promise

  //with fetch() function
  // const response = await fetch(url, {method})
  // const result = await response.json()
  // return result

  // return await fetch(url, {method}).then(r => r.json())

  //with axios
  const { data } = await axios(url, { method });
  return data;
  // return axios.get(url)
}

async function fetchPosts() {
  const responseData = await sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );

  console.log(responseData);
  if (responseData.length > 0) {
    for (const post of responseData) {
      const postElClone = document.importNode(postTemplate.content, true);
      postElClone.querySelector("h2").textContent = post.title;
      postElClone.querySelector("p").textContent = post.body;
      postElClone.querySelector("li").id = post.id;
      listElement.appendChild(postElClone);
    }
  }
}

// READ/GET
fetchButton.addEventListener("click", fetchPosts);

//////////////////////exercise////////////////////////

const form = document.querySelector(".info");
form.addEventListener("submit", submitFormData);

function submitFormData(e) {
  e.preventDefault();

  const data = {
    title: document.querySelector("#title").value,

    body: document.querySelector("#content").value,
  };

  axios
    .post("https://jsonplaceholder.typicode.com/posts", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) =>
      console.log(
        `Title:${response.data.title}, Body:${response.data.body}`,
        response
      )
    )
    .catch((error) => console.log(error));

  document.querySelector("#title").value = "";
  document.querySelector("#content").value = "";
}
