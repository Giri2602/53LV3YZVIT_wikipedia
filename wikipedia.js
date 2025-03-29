let searchInputEl = document.getElementById("searchInput");
let searchresultEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    let {
        description,
        link,
        title
    } = result;
    //Div Container --  results Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchresultEl.appendChild(resultItemEl);
    //Anchor title--result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blanck";
    resultItemEl.appendChild(resultTitleEl);
    //Title break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
    //Anchor url --result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl)
    //Line break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);
    //para description-- line-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

}

function displayResult(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        searchresultEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"

        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);