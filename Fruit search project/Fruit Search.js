const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const searchCont = document.querySelector(".search-container");
const fruit = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	if (str !== '') {
	  results = fruit.filter(n => n.toLowerCase().includes(str.toLowerCase()));
	}
	if (results.length > 0) {
	  results = results.sort((a, b) => {
		const startsWithInputA = a.toLowerCase().startsWith(str.toLowerCase());
		const startsWithInputB = b.toLowerCase().startsWith(str.toLowerCase());
		if (startsWithInputA && !startsWithInputB) {
		  return -1;
		} else if (!startsWithInputA && startsWithInputB) {
		  return 1;
		} else {
		  return a.localeCompare(b);
		}
	  });
	}
	return results.slice(0, 9);
  }
  
function searchHandler(e) {
	let fruitInput = input.value;
	let matchedFruit = search(fruitInput);
	if (matchedFruit.length === 0) {
	  searchCont.classList.remove("search-background");
	} else {
	  searchCont.classList.add("search-background");
	}
	let sortedFruit = matchedFruit.sort((a, b) => {
	  if (a.length !== b.length) {
		return a.length > b.length;
	  } else {
		return a > b;
	  }
	});
	showSuggestions(sortedFruit, fruitInput);
  }

function showSuggestions(results, inputVal) {
	suggestions.innerHTML = '';
	if (results.length === 0) {
	  return;
	}
	const limitedResults = results.slice(0, 9);
	  limitedResults.forEach(n => {
	  let suggElmt = document.createElement("li");
	  suggElmt.innerText = n;
	  suggElmt.addEventListener("mouseover", toggleHighlightSuggestion);
	  suggElmt.addEventListener("mouseout", toggleHighlightSuggestion);
	  suggestions.appendChild(suggElmt);
	});
  }
  
function useSuggestion(e) {
	document.querySelector("input#fruit").value = e.target.innerText;
	searchCont.classList.remove("search-background");
	showSuggestions([], ''); 
  }

function toggleHighlightSuggestion(e) {
	e.target.classList.toggle("highlighted");
}
input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);

document.addEventListener('click', function(e) {
	const isClickInsideSearchContainer = searchCont.contains(e.target);
	const isClickInsideInput = input.contains(e.target);
	if (!isClickInsideSearchContainer && !isClickInsideInput) {
	  searchCont.classList.remove("search-background");
	  suggestions.innerHTML = '';
	}
  });















  