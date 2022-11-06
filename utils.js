const debounce=func=>{
	let timeoutId;
	return (...argv)=>{
		if(timeoutId){
		clearTimeout(timeoutId);
	}
	timeoutId=setTimeout(()=>{
		func.apply(null, argv)
		
	},500);	
	}
}
let leftMovie;
let rightMovie;
const onMovieSelect=async (movie,summaryElement,side)=>{
	console.log(movie);
	const res=await axios.get("http://www.omdbapi.com/", {
		
		params:{
			apikey:"8ee4dadb",
			i: movie.imdbID	
		}
});
summaryElement.innerHTML=movieTemplate(res.data);
if(side==='left'){
	leftMovie=res.data;
}
else{
	rightMovie=res.data;
}
console.log(res.data);
if(leftMovie && rightMovie){
	//console.log("Time for comapairison")
	runComparison();
}

};
const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );
 
  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
 
	const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);

 console.log(leftSideValue)
 console.log(rightSideValue)
    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    } else if(rightSideValue < leftSideValue){
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }else{
		return ;
	}
  });
};

const movieTemplate=(movieDetail)=>{
	const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  );

  const metascore=parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
	let count=0;
	const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
		console.log(count);
  }, 0);

	return `
	<article class="media">
	<figure class="media-left">
	<p class="image">
	<img src="${movieDetail.Poster}" /></p>
	
	</figure>
	<div class="media-content">
	<div class="content">
	<h1>${movieDetail.Title}
	</h1><h4>${movieDetail.Genre}
	</h4>
	<p>${movieDetail.Plot}</p>
	</div>
	</div>
	</article>
	
	<article data-value=${awards} class="notification is-primary">
	<p class="title"> ${movieDetail.Awards} </p>
	<p class="subtitle">Awards</p>
	</article>
	<article data-value=${dollars} class="notification is-primary">
	<p class="title"> ${movieDetail.BoxOffice} </p>
	<p class="subtitle">BoxOffice</p>
	</article>
	<article data-value=${metascore} class="notification is-primary">
	<p class="title"> ${movieDetail.Metascore} </p>
	<p class="subtitle">Metascore</p>
	</article>
	<article data-value=${imdbRating} class="notification is-primary">
	<p class="title"> ${movieDetail.imdbRating} </p>
	<p class="subtitle">IMDB Rating</p>
	</article>
	<article data-value=${imdbVotes} class="notification is-primary">
	<p class="title"> ${movieDetail.imdbVotes} </p>
	<p class="subtitle">IMDB Votes</p>
	</article>
	`
};