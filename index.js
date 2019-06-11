const baseURL = 'https://api.github.com';
const user = 'pkim050';

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return '';
}

function forkRepo() {
  const repo = 'learn-co-curriculum/js-ajax-fetch-lab';
  //use fetch to fork it!
  fetch(`${baseURL}/repos/${repo}/forks`, {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json())
  .then(json => showResults(json))
}

function showResults(json) {
  //use this function to display the results from forking via the API
  const results = document.getElementById("results");
  results.innerHTML = `<a href=${json.html_url}>${json.html_url} </a>`
}

function createIssue() {
  //use this function to create an issue based on the values input in index.html
  const repo = 'js-ajax-fetch-lab'
  const testTitle = document.getElementById('title');
  const testBody = document.getElementById('body');
  fetch(`${baseURL}/repos/${user}/${repo}/issues`,
  {
    method: 'POST',
    title: testTitle.value,
    body: testBody.value,
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json())
  .then(json => getIssues())
}

function getIssues() {
  //once an issue is submitted, fetch all open issues to see the issues you are creating
  const repo = 'js-ajax-fetch-lab';
  fetch(`${baseURL}/repos/${user}/${repo}/issues`)
  .then(res => res.json())
  .then(json => {
    const issues = document.querySelector("#issues")
    const content = json.map(issue =>{
      return `<p>${issue.title} - ${issue.body}</p>`
    }).join("")
    issues.innerHTML = content
  })
}
