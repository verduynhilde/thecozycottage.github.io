import data from './content.js'
	
const title = data.title.text
const footer = data.footer.text

const BODY = document.body
const MAIN = document.getElementById('main')
const HEADER = document.getElementById('header')
const TITLE = document.getElementById('title')
const CATEGORIES = document.getElementById('categories')
const CONTENT = document.getElementById('content')
const FOOTER = document.getElementById('footer')

const ALT = 'airbnb and bed and breakfast in eeklo. Belgium'

//set the syyling of the html tag, so there is a black/white version
let colorscheme_value = 0
function colorscheme(){
	if(colorscheme_value % 2 === 0){
		BODY.style.color = 'white';
		BODY.style.backgroundColor = 'black';
	} else  {
		BODY.style.color = 'black';
		BODY.style.backgroundColor = 'white';
	}
	colorscheme_value++
	console.log('colorscheme changed')
}


const array_categories = Object.keys(data.categories)
const n_keys_categories = array_categories.length

let next_or_prev_id= ''
let current_category = ''

function prev_or_next_category(prev_or_next){
	let current_category_id =array_categories.indexOf(current_category)
	if(prev_or_next=='prev'){
		next_or_prev_id = array_categories[(current_category_id + (n_keys_categories-1)) % n_keys_categories]
	}
	
	if(prev_or_next=='next'){
		next_or_prev_id = array_categories[(current_category_id + 1) % n_keys_categories]
	}

	document.getElementById(next_or_prev_id).click();
	current_category = next_or_prev_id
}


function div_begin(){
	const begin = document.createElement('div')
	begin.id = 'begin'
	//begin.innerHTML = 'begin testing'
	return begin
}

function div_end(){
	const end = document.createElement('div')
	end.id = 'end'

	const button_next = document.createElement('span')
	button_next.innerHTML =  ' next →'
	const button_previous = document.createElement('span')
	button_previous.innerHTML =  '← prev |'
	button_previous.onclick = function(){prev_or_next_category('prev')}
	button_next.onclick = function(){prev_or_next_category('next')}
	end.appendChild(button_previous)
	end.appendChild(button_next)
	return end
}


function block(id, content, mode, images, order){
	const container = document.createElement('div')
	const text = document.createElement('div')
	const title_text = document.createElement('div')
	const content_text = document.createElement('div')
	const pics = document.createElement('div')
	const title_pics = document.createElement('div')
	const content_pics = document.createElement('div')

	container.classList.add('container' + '_' + mode)
	container.id = id
	text.classList.add('text' + '_' + mode)
	title_text.classList.add('title_text' + '_' + mode)
	content_text.classList.add('content_text' + '_' + mode)
	content_text.innerHTML = content
	pics.classList.add('pics' + '_' + mode)
	title_pics.classList.add('title_pics' + '_' + mode)
	content_pics.classList.add('content_pics' + '_' + mode)
	
	//select all butons and set underline to none 
//	const buttons = document.querySelectorAll('span');
//
//	buttons.forEach(button => {
//	  button.style.textDecoration = 'none';
//	});
//	document.getElementById(id).style.textDecoration='underline'


	for(const image of images){
		let pic = document.createElement('img')	
		pic.src = image
		pic.alt = ALT
		pic.classList.add('pic' + '_' + mode)
		if(mode == 'vertical'){pic.style.width = '100%'}
		if(mode == 'horizontal'){pic.style.width = '50%'}
		content_pics.appendChild(pic)
	}
	
	//vertical split
	if(mode == 'vertical'){
		container.style.width = '100%';
		container.style.margin = '0 auto';
		container.style.display = 'flex';
		container.style.justifyContent = 'space-between';

		text.style.width = '30%';
		text.style.order = order;
		pics.style.width = '65%';
	}
		
	//horizontal split
	if(mode == 'horizontal'){
		container.style.width = '100%';
		container.style.margin = '0 auto';

		pics.style.width = '100%';
		pics.style.marginBottom = '20px';
		
		text.style.width = '100%';
		text.style.marginBottom = '20px';
		text.style.order = order;
	}
	
	text.appendChild(title_text)
	text.appendChild(content_text)
	pics.appendChild(title_pics)
	pics.appendChild(content_pics)
	container.appendChild(text)
	container.appendChild(pics)

	CONTENT.innerHTML = ''
	CONTENT.appendChild(div_begin())
	CONTENT.appendChild(container)
	CONTENT.appendChild(div_end())

	current_category=id
}




export function initial_content(){
	// initial content 
	TITLE.innerHTML = title
	FOOTER.innerHTML = footer + '-' + new Date().getFullYear()
	
	//constuct the categories
	//append a colorscheme button
	const button_colorscheme = document.createElement('span')
	button_colorscheme.id = 'colorscheme'
	button_colorscheme.innerHTML = '&bull;'
	button_colorscheme.onclick = function(){colorscheme()}
	CATEGORIES.appendChild(button_colorscheme)


	for(const category in data.categories){
	
		//content divs
		const id = data.categories[category].id
		const content = data.categories[category].content
		const mode = data.categories[category].mode
		const images  = data.categories[category].images
		const order  = data.categories[category].order
	
		//categories
		const button_category = document.createElement('span')
		button_category.innerHTML =data.categories[category].text 
		button_category.onclick = function(){block( id, content , mode , images, order)}
		button_category.className = 'category' 
		button_category.id = id
		CATEGORIES.appendChild(button_category)
	}
	
	

	// initial styling
	//set initial frontage
	const frontpage = 'over'
	document.getElementById(frontpage).click();
}

export function adjusted_content() {

	let width = window.innerWidth
	let begin = document.getElementById('begin')
	let end = document.getElementById('end')

	console.log(width)

	if(width < 500){
		TITLE.style.fontSize = "1em";
		TITLE.style.position = "fixed";
		TITLE.style.top = "0px";
		TITLE.style.left = "50%";	
		MAIN.style.padding = '10%'

		HEADER.style.height = '10px'

		//FOOTER.style.padding = '10px'

		CONTENT.style.margin = '0 auto'
		CONTENT.style.width = '100%'
		CONTENT.style.fontSize = '0.5em'
			
		CATEGORIES.style.top = '0px'
		CATEGORIES.style.right = '0px'
		CATEGORIES.style.position = 'fixed'

		//begin.style.display = 'none'
		//begin.style.height = '10px'
		//end.style.height = '200px'


	} else {

	//	TITLE.style.fontSize = "2em";
	//	TITLE.style.position = "fixed";
	//	TITLE.style.top = "0px";
	//	TITLE.style.left = "0px";	
	//	MAIN.style.padding = '10%'

	//	HEADER.style.height = '10px'

	//	FOOTER.style.position = 'fixed'
	//	FOOTER.style.bottom = '0'
	//	FOOTER.style.right = '0'
	//	FOOTER.style.padding = '10px'

	//	CONTENT.style.margin = '0 auto'
	//	CONTENT.style.width = '60%'
	//	CONTENT.style.fontSize = '0.8em'
	//			
	//	CATEGORIES.style.top = '0px'
	//	CATEGORIES.style.right = '0px'
	//	CATEGORIES.style.position = 'fixed'

	//	begin.style.display = 'block'
	//	begin.style.height = '10px'


		//previous and next page 
		//end.style.height = '200px'
		//end.style.position = 'fixed'
		//end.style.float = 'right'
		//end.style.fontSize = '4em'
		//end.style.right = '20px'
		//end.style.bottom = '20px'
		//end.style.margin = '20px'
		//end.style.border = '2px solid red'
		
	}	
}

//https://en.99designs.be/profiles/dsky/designs/445966
