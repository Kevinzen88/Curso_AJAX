//XMLhttpRequest
(() => {
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("exito");
      let json = JSON.parse(xhr.responseText);

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });

      $xhr.appendChild($fragment);
    } else {
      console.log("error");
      let mesage = xhr.statusText || "Error de servidor";
      $xhr.innerHTML = `Error ${xhr.status}: ${mesage}`;
    }

    //console.log(xhr);
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
})();
//Fetch
(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      console.log(res);
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((json) => {
      console.log(json);
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });

      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      console.log(err);
      let mesage = err.statusText || "Error de servidor";
      $fetch.innerHTML = `Error ${err.status}: ${mesage}`;
    })
    .finally(() => {
      console.log("siempre en uso");
    });
})();
//API FETCH + ASYNC
(() => {
  const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users"),
        json = await res.json();

      console.log(res, json);

      if (!res.ok) {
        throw {
          status: res.status,
          statusText: res.statusText,
        };
      }

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });

      $fetchAsync.appendChild($fragment);
    } catch (err) {
      let mesage = err.statusText || "Error de servidor";
      $fetch.innerHTML = `Error ${err.status}: ${mesage}`;
    } finally {
    }
  }

  getData();
})();
//AXIOS
(() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

   axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then( res => {
            console.log(res);
            let json = res.data;

            json.forEach((el) => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
                $fragment.appendChild($li);
              });
        
              $axios.appendChild($fragment);
        })
        .catch(err =>{
            console.log(err.response);
            let mesage = err.response.statusText || "Error de servidor";
            $axios.innerHTML = `Error ${err.response.status}: ${mesage}`;

        })
        .finally(() =>{
            console.log("siempre visto");
        });
})();
