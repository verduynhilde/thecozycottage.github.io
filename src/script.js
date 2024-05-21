import { initial_content,adjusted_content } from './functions.js' 

//generate content with styling	
initial_content()
//ajust content on mobile or on resize 
adjusted_content()
//styling according to window resize
window.addEventListener('resize', adjusted_content);

