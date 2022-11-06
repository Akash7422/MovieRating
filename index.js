const autoCompleteConfig={
	renderOption:(el) =>{
		const imgsrc=el.Poster==="N/A"? '': el.Poster;
		return `<img src="${imgsrc}"/> ${el.Title} (${el.Year})`;
		
	},
	inputValue(el){
		return el.Title;
	},
	async fetchData(serachTerm){
	const response =await axios.get("http://www.omdbapi.com/", {
		
		params:{
			apikey:"8ee4dadb",
			s: serachTerm	
		}
			
	});
	if(response.data.Error){
		return [];
	}
	
	return response.data.Search;
}
	
	
}



createAutoComplete({
	...autoCompleteConfig,
	root:document.querySelector('#left-autocomplete'),
	onOptionSelect(el){
		 document.querySelector(".tutorial").classList.add('is-hidden');
	onMovieSelect(el,document.querySelector("#left-summary"),'left');
	}
	
	
});
createAutoComplete({
	...autoCompleteConfig,
	root:document.querySelector('#right-autocomplete'),
	onOptionSelect(el){
		 document.querySelector(".tutorial").classList.add('is-hidden');
	onMovieSelect(el,document.querySelector("#right-summary"),'right');
	}
	
	
});
