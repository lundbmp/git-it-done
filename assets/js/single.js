var issuesContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        } else {
            alert("There was a problem with the request!");
        }
    });
};

var displayIssues = function (issues) {
    for(var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on GitHub
        var issueEl = document.createElement("a");
        
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create type element
        var typeEl = document.createElement("span");

        // check if issue or pull request
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl);

        issuesContainerEl.appendChild(issueEl);
    }
}


getRepoIssues("lundbmp/git-it-done");