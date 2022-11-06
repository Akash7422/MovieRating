const createAutoComplete=({root,renderOption,onOptionSelect, inputValue,fetchData})=>{
	
root.innerHTML=`<label><b>Search for Your Favourite</b></label>
<input class="input" />
<div class="dropdown">
<div class="dropdown-menu">
	<div class="dropdown-content results">
	</div>
	</div>
	</div>
`;
const input = root.querySelector('.input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

const onInput=async(event)=>{
	
	const items=await fetchData(event.target.value);
	if (!items.length){
		dropdown.classList.remove('is-active');
		return;
	}
	//resultsWrapper.innerHTML=''; //to clear out the pre search
	dropdown.classList.add('is-active');
	
	const mainDiv=root.querySelector('.results');
	var child = mainDiv.lastElementChild; 
        while (child) {
          mainDiv.removeChild(child);
            child = mainDiv.lastElementChild;
        }
	items.map(el=>{
		//console.log(el.Title);
	const option=	document.createElement('a');
	
	option.classList.add('dropdown-item');
	option.innerHTML=renderOption(el);
	option.addEventListener('click', ()=>{
		dropdown.classList.remove('is-active');
		input.value= inputValue(el);
		onOptionSelect(el);
	});
	resultsWrapper.appendChild(option);
	})
	
};

input.addEventListener('input',debounce(onInput));

document.addEventListener('click',event=>{
	if(!root.contains(event.target)){
		dropdown.classList.remove('is-active');
	}
});
	
}