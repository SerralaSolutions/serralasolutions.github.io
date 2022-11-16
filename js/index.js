//Fill index on load
$.get(`/documents/index.directory`, function (data) {
    for (let line of data.split("\n")) {
        if (line === "" || line.startsWith("#")) continue;
        let keyvalue = line.split(":");
        $("#documentIndex").append(`
            <li>
                <a href="javascript:void(0);" id="d_${keyvalue[0]}" class="nav-link text-white">
                    ${keyvalue[1]}
                </a>
            </li>
        `);
    }
    //Add click event to items in the index
    $("#documentIndex").children().each(function() {
        $(this).on("click", function () {
            //On click, remove all highlighting, highlight new page and retrieve the document to show
            $("#documentIndex").children().each(function() {
                $(this).children().first().removeClass("active");
            });
            $(this).children().first().addClass("active");
            getDocument($(this).children().first().attr("id").substring(2), this);
            //Set the document in the url parameters
            window.history.pushState("", "", `?document=${$(this).children().first().attr("id").substring(2)}`);
        });
    });
    //Highlight the document in the index
    let url = new URL(window.location.href);
    let docu = url.searchParams.get("document");
    if (docu !== null) {
        //Clear all highlighting
        $("#documentIndex").children().each(function () {
            $(this).children().first().removeClass("active");
        });
        //Add highlighting to the current document
        $(`#d_${docu}`).addClass("active");
    } else {
        //Highlight introduction if no document is specified
        $(`#d_introduction`).addClass("active");
    }
});

//Retrieve a document on navigation (or first load)
function getDocument(name, afterListElement) {
    if (name === undefined) return;
    //Load the document
    $.get(`/documents/${name}.md`, function (data) {
        //Parse content for markdown
        let converter = new showdown.Converter();
        converter.setFlavor('github');
        let html = converter.makeHtml(data);
        //Show document
        $("#content").html(html);
        //Highlight code
        hljs.highlightAll();
        //Add copy link icons to the headers
        $("#content").children().each(function () {
            if ($(this).is("h1") || $(this).is("h2") || $(this).is("h3")) {
                $(this).append(`
                    <a href="javascript:void(0);" class="copyLink" onclick="copyLink(this)">
                        <img src="/images/link-solid.svg" alt="Copy link" class="copyLinkIcon" height="16" width="16">
                    </a>
                `);
            }
        });
        //Scroll to the top of the document
        $(window).scrollTop(0);
        //Remove headers with nav-sublink from the index
        $("#documentIndex").children().each(function () {
            if ($(this).children().first().hasClass("nav-sublink")) {
                $(this).remove();
            }
        });
        //Append headers to the index
        $($("#content").children().get().reverse()).each(function () {
            if ($(this).is("h2") || $(this).is("h3")) {
                $(afterListElement).after(`
                    <li>
                        <a href="javascript:void(0);" id="h_${$(this).attr("id")}" class="nav-link nav-sublink text-white">
                            - ${$(this).text()}
                        </a>
                    </li>
                `);
                $(`#h_${$(this).attr("id")}`).on("click", function () {
                    $(window).scrollTop($(`#${$(this).attr("id").substring(2)}`).offset().top);
                });
            }
        });
        //Scroll to header if specified in url parameters
        let url = new URL(window.location.href);
        let header = url.searchParams.get("header");
        if (header !== null) {
            console.log('header', header);
            if ($(`#${header}`).get(0) != null) {
                $(`#${header}`).get(0).scrollIntoView();
            }
        }
    });
}

//On load, retrieve the document specified in the url or the introduction otherwise
$(document).ready(function () {
    let url = new URL(window.location.href);
    let name = url.searchParams.get("document");
    if (name === null) {
        name = "introduction";
    }
    getDocument(name);
});

//Catch back and forward navigation
window.onpopstate = async (event) => {
    let url = new URL(window.location.href);
    let name = url.searchParams.get("document");
    if (name === null) {
        name = "introduction";
    }
    getDocument(name);
}

function copyLink(element) {
    let url = new URL(window.location.href);
    let header = url.searchParams.get("header");
    if (header !== null) {
        url.searchParams.delete("header");
    }
    navigator.clipboard.writeText(url.href + "&header=" + $(element).parent().attr("id"));
}

//Search
let documentCache = {};
let loadingCache = false;
function search(query) {
    console.log('search', query);
    $("#searchResults").html("");
    if (query === "") {
        $("#searchResults").html("");
        return;
    }
    //If the cache is still empty, load all documents
    if (Object.keys(documentCache).length === 0 && !loadingCache) {
        loadingCache = true;
        $.get(`/documents/index.directory`, function (data) {
            for (let line of data.split("\n")) {
                if (line === "" || line.startsWith("#")) continue;
                let keyvalue = line.split(":");
                //TODO: Consider not spamming the server with requests and combining them into one document using a workflow or something
                $.ajax({
                    url: `/documents/${keyvalue[0]}.md`,
                    success: function (data) {
                        documentCache[keyvalue[0]] = data;
                    },
                    cache: true
                });
            }
        });
    }
    //Search all documents in the cache if they contain the query, store the key and some context
    let results = [];
    for (let key in documentCache) {
        let document = documentCache[key];
        let index = document.toLowerCase().indexOf(query.toLowerCase());
        if (index !== -1) {
            let context = document.substring(index - 50, index + 50);
            results.push({
                key: key,
                context: context
            });
        }
    }
    //Append the results to the search results
    for (let result of results) {
        let title = documentCache[result.key].split("\n")[0].substring(2);
        $("#searchResults").append(`
        <a href="?document=${result.key}" class="list-group-item list-group-item-action search-item">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">${title}</h6>
                        </div>
                        <small class="mb-1">...${result.context.replaceAll("#", "")}...</small>
                    </a>
        `);
    }
}
