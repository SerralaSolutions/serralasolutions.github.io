//Fill index
$.get(`/documents/index.directory`, function (data) {
    for (let line of data.split("\n")) {
        if (line === "" || line.startsWith("#")) continue;
        let keyvalue = line.split(":");
        $("#documentIndex").append(`
            <li>
                <a href="#${keyvalue[0]}" id="${keyvalue[0]}" class="nav-link text-white">
                    ${keyvalue[1]}
                </a>
            </li>
        `);
    }
    //Add click event to index
    $("#documentIndex").children().each(function() {
        $(this).on("click", function () {
            $("#documentIndex").children().each(function() {
                $(this).children().first().removeClass("active");
            });
            $(this).children().first().addClass("active");
            getDocument($(this).children().first().attr("id"), this);
        });
    });
});

//Retrieve a document on navigation (or first load)
function getDocument(name, afterListElement) {
    if (name === undefined) return;
    //Load the document
    $.get(`/documents/${name}.md`, function (data) {
        let converter = new showdown.Converter();
        converter.setFlavor('github');
        let html = converter.makeHtml(data);
        $("#content").html(html);
        hljs.highlightAll();
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
                        <a href="#${$(this).attr("id")}" class="nav-link nav-sublink text-white">
                            - ${$(this).text()}
                        </a>
                    </li>
                `);
            }
        });
    });
}

getDocument("introduction");
