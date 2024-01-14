// //Exercise 1
// async function handler(req: Request) {
// 	const url = new URL(req.url);

// 	if (url.pathname === '/hello') {
// 		return new Response('Hello!');
// 	} else if (url.pathname === '/bye') {
// 		return new Response('Bye!');
// 	} else {
// 		return new Response('Not found');
// 	}
// }
// //------------------------------------------------------
// //Exercise 2
// async function handler(req: Request) {
// 	const url = new URL(req.url);
// 	const registerPattern = new URLPattern({ pathname: '/register' });
// 	const loginPattern = new URLPattern({ pathname: '/login' });
// 	const logoutPattern = new URLPattern({ pathname: '/logout' });
//using if/else
// if (registerPattern.test(url)) {
// 	return new Response('Registered!');
// } else if (loginPattern.test(url)) {
// 	return new Response('Logged in!');
// } else if (logoutPattern.test(url)) {
// 	return new Response('Logged out!');
// } else {
// 	return new Response('Not Found');
// }
//using switch statement
// 	switch (true) {
// 		case registerPattern.test(url):
// 			return new Response('Registered!');
// 		case loginPattern.test(url):
// 			return new Response('Logged in!');
// 		case logoutPattern.test(url):
// 			return new Response('Logged out!');
// 		default:
// 			return new Response('Not Found');
// 	}
// }
// //------------------------------------------------------
// //Exercise 3
// async function handler(req: Request) {
// 	const url = new URL(req.url);
// 	const profilePattern = new URLPattern({ pathname: '/profile/:username' });
// 	const postsPattern = new URLPattern({ pathname: '/posts/:postsId/:userId' });

// 	// console.log(profileMatches?.pathname.groups.username);

// 	switch (true) {
// 		case profilePattern.test(url): {
// 			const profileMatches = profilePattern.exec(url);
// 			const username = profileMatches?.pathname.groups.username;
// 			return new Response(`Hello, ${username}!`);
// 		}
// 		case postsPattern.test(url): {
// 			const postsMatches = postsPattern.exec(url);
// 			console.log(postsMatches);
// 			const postId = postsMatches?.pathname.groups.postsId;
// 			const userId = postsMatches?.pathname.groups.userId;
// 			return new Response(`All Posts for: ${userId} and ${postId}`);
// 		}
// 		default:
// 			return new Response('Not Found', { status: 404 });
// 	}
// }
// //------------------------------------------------------
// //Exercise 4
async function handler(req: Request) {
	const url = new URL(req.url);
	//To serve static files such as images, you need to create a route that handles requests for those files. You can use the URLPattern API to match the URL against a pattern that includes a filename, and then use Deno.open() to open the file and return it in the response.
	//The Deno.open() function is used to open a file and return a file object. It's part of Deno's standard library and provides functionality similar to Node.js's fs module.
	const imgPattern = new URLPattern({ pathname: '/:imgName' });

	if (imgPattern.test(url)) {
		const matches = imgPattern.exec(url);
		const imgName = matches?.pathname.groups.imgName;

		const file = await Deno.open(`./${imgName}`);
		const fileStream = file.readable;

		//determine content type
		const contentType = imgName?.endsWith('.jpg')
			? 'image/jpeg'
			: imgName?.endsWith('.html')
			? 'text/html'
			: imgName?.endsWith('.png')
			? 'image/png'
			: 'application/octet-stream';

		const htmlHeaders = new Headers();
		htmlHeaders.append('content-type', contentType);

		return new Response(fileStream, {
			headers: htmlHeaders,
		});
	} else {
		const file = await Deno.open('./index.html');
		const fileStream = file.readable;

		return new Response(fileStream, {
			headers: {
				'content-type': 'text/html',
			},
		});
	}
}
// //------------------------------------------------------

Deno.serve(handler);

//The .exec method  attempts to match a given URL against the pattern. If the URL matches the pattern, the method returns a result object with details about the match; otherwise, it returns null.
// const pattern = new URLPattern({ pathname: '/:username' });
// const result = pattern.exec(new URL('https://example.com/johndoe'));
// In this case, if the URL's pathname matches the pattern (i.e., it's in the form "/username"), the .exec method returns an object like this:
// {
//   input: 'https://example.com/johndoe',
//   groups: { username: 'johndoe' },
//   // ...other properties...
// }

// In your code, .exec is used to extract the image name from the URL:
//const matches = imgPattern.exec(url);
//const imgName = matches?.pathname.groups.imgName

// Here, imgPattern is a URLPattern object, and url is the URL to match against the pattern. If the URL matches the pattern, matches is an object with details about the match, and imgName is the extracted image name.
