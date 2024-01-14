// //Using if/else + (option to use regex)
// async function handler(req: Request) {
// 	const url = new URL(req.url);
// // URL() constructor takes a string and returns a URL object representing the URL defined by the parameters
// 	console.log(req.url);
// 	console.log(url);

// 	if (url.pathname === '/meow') {
// 		return new Response('😺');
// 	} else {
// 		return new Response('cat not found');
// 	}
// 	//need to have else statement as we have only defined return res in one case so other cases would return undefined. Every case needs to return a response object.

//using regex
// 	if (url.pathname.match('/meow')) {
// 		return new Response('😺');
// 	} else {
// 		return new Response('cat not found');
// 	}
// }
//--------------------------------------------------------
// //using switch statement
// async function handler(req: Request) {
// 	const url = new URL(req.url);

// 	switch (url.pathname) {
// 		case '/meow':
// 			return new Response('😺');
// 		case '/woof':
// 			return new Response('🐶');
// 		default:
// 			return new Response('No cats or dogs found');
// 	}
// }
//--------------------------------------------------------
//Using URLPattern API
async function handler(req: Request) {
	const url = new URL(req.url);
	//create pattern using URLPattern() constructor
	const animalPattern = new URLPattern({ pathname: '/:name' });
	//create capture group with variable 'name'
	const meowPattern = new URLPattern({ pathname: '/meow' });
	const woofPattern = new URLPattern({ pathname: '/woof' });

	if (animalPattern.test(url)) {
		const matches = animalPattern.exec(url); //executes pattern against the url and returns details about the match object with groups
		console.log(matches?.pathname); //{ input: "/quack", groups: { name: "quack" } }
		const animal = matches?.pathname.groups.name; //extracts from group and returns name
		return new Response(animal);
	}
	//test pattern using if/else
	else if (meowPattern.test(url)) {
		return new Response('😺');
	} else if (woofPattern.test(url)) {
		return new Response('🐶');
	} else {
		return new Response('Animal not found');
	}
}
Deno.serve(handler); //uses default port 8000 on hostname "127.0.0.1"

//URLPattern - https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/URLPattern
