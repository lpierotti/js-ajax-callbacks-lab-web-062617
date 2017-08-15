$(document).ready(function (){

	// $('#search').on('click', function searchRepositories() {

	// }


});

function searchRepositories(){
 		$.ajax({
 			url: `https:\/\/api.github.com/search/repositories?q=${document.getElementById('searchTerms').value}`,
 			method: 'GET',
 			success: function(repos) {
 				console.log(repos)
 				const repoList = repos.items.map(r => `<li> ${r.name}, ${r.description}, ${r.html_url}, ${r.owner.login}, ${r.owner.avatar_url}, ${r.owner.url} <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a> </li>`).join("")
 				document.getElementById('results').innerHTML =  `
 					<ul>
 						${repoList}
 					</ul
 				`
 			}, 
 			error: displayError()
 		})
}

function showCommits(el){
	const repo = el.dataset.repository
	const owner = el.dataset.owner
	console.log(repo, owner)

	$.ajax({
		url: `https://api.github.com/repos/${owner}/${repo}/commits`,
		method: 'GET',
		success: function(commits) {
			console.log(commits)
			const commitList = commits.map(c => `<li> ${c.sha}, ${c.commit.author}, ${c.author.login}, ${c.author.avatar_url} </li>`).join("")
			document.getElementById('details').innerHTML = `
				<ul>
					${commitList}
				</ul>
			`
		},
		error: displayError()
	})
}

function displayError(error){
	document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again."
}