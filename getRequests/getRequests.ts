interface User {
	id: string; //check array, the id are all number strings
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	city: string;
}
//able to use top-level await outside async function as Deno treats the entire module as implicit async function.
const file = await Deno.readTextFile('./users.json'); //file is a string
const users: User[] = JSON.parse(file); //parse JSON string to JS obj

// //Example 1: GET all users
// async function handler(req: Request) {
// 	const url = new URL(req.url);
// 	const usersRoute = new URLPattern({ pathname: '/users' }); //API endpoint

// 	if (usersRoute.test(url)) {
// 		// '/users' route matches
// 		return new Response(JSON.stringify(users), { //res cannot use JS object
// 			headers: { 'content-type': 'application/json' },
// 		});
// 	}

// 	return new Response(null, { status: 404 });
// }
// // ------------------------------------------------------------------------------
// //Example 2: GET single user
// async function handler(req: Request) {
// 	const url = new URL(req.url);
// 	const userPattern = new URLPattern({ pathname: '/user/:id' });

// 	if (userPattern.test(url)) {
// 		const match = userPattern.exec(url);
// 		console.log(match);
// 		const id = match?.pathname.groups.id;
// 		const matchingUser = users.find((user) => user.id === id); //didn't change to # as id in the users array are stored as number strings
// 		return new Response(JSON.stringify(matchingUser), {
// 			headers: { 'content-type': 'application/json' },
// 		});
// 	}

// 	return new Response(null, { status: 404 });
// }
// // ------------------------------------------------------------------------------
// //Example 3: GET request query/search parameters
// //use URLSearchParams API
// async function handler(req: Request) {
// 	const url = new URL(req.url);
// 	const usersRoute = new URLPattern({ pathname: '/users' });
// 	//the url object has a search key with value of the search params console.log(url.search);
// 	if (usersRoute.test(url)) {
// 		const countryParam = url.searchParams.get('country');
// 		const userString = JSON.stringify(users);

// 		if (countryParam !== null) {
// 			const filteredUsers = [];
// 			for (const user of users) {
// 				if (user.country === countryParam) {
// 					filteredUsers.push(user);
// 				}
// 			}

// 			return new Response(JSON.stringify(filteredUsers), {
// 				headers: { 'content-type': 'application/json' },
// 			});
// 		}

// 		return new Response(userString, {
// 			headers: { 'content-type': 'application/json' },
// 		});
// 	}
// }
// // ------------------------------------------------------------------------------

async function handler(req: Request) {}
Deno.serve(handler);
