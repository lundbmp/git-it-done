var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            document.location.replace("./index.html");
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

var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
  
    // append to warning container
    limitWarningEl.appendChild(linkEl);  
};

var getRepoName = function() {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    
    if(repoName) {
        repoNameEl.textContent = repoName;

        getRepoIssues(repoName);
    } else {
        document.location.replace("./index.html");
    }
}

getRepoName();