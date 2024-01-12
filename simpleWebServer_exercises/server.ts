// // Exercise 1:
// async function handler(req: Request) {
// 	return new Response('Hello!');
// }

// Deno.serve({ port: 9000 }, handler);
//--------------------------------------------------------
// // Exercise 2:
// async function handler(req: Request) {
// 	const method = req.method;
// 	const url = req.url;

// 	const urlObject = new URL(url);
// 	const pathname = urlObject.pathname;

// 	console.log(`${method} ${pathname}`);

// 	const responseString = `${method} ${url}`;
// 	return new Response(responseString);
// }

// Deno.serve({ port: 9000 }, handler);
//--------------------------------------------------------
// // Exercise 3:
// async function handler(req: Request) {
// 	const method = req.method;
// 	const url = req.url;
// 	const htmlHeaders = new Headers();
// 	const json = JSON.stringify({ url, method });
// 	//needs to be converted to a string as Response() constructor does not accept object
// 	htmlHeaders.append('content-type', 'application/json');

// 	return new Response(json, {
// 		headers: htmlHeaders,
// 	});
// }

// Deno.serve({ port: 9000 }, handler);
//--------------------------------------------------------
// Exercise 4:
async function handler(req: Request) {
	//The Deno.open() function opens a file and returns a Deno.File object, which is a readable stream. To read the contents of the stream, you need to use a function like Deno.readAll().
	const file = await Deno.open('./index.html', { read: true });
	const fileData = await Deno.readAll(file);
	Deno.close(file.rid); // === shorthand --> file.close()

	const decoder = new TextDecoder('utf-8');
	const text = decoder.decode(fileData);
	return new Response(text, {
		headers: {
			'content-type': 'text/html',
		},
	});
}
Deno.serve({ port: 9000 }, handler);

//The readable property of a Deno.File object is a ReadableStream, which can be used with the Response constructor to send the file contents as a response. However, this is not recommended because the Deno.File object is a low-level resource that should be closed after use, and using the readable property directly doesn't provide a way to close the file after the response is sent. {const fileStream = file.readable;} *check firstDenoServer.ts example

// Instead, you should read the file contents into memory using Deno.readAll(), send the contents as the response, and then close the file. This ensures that the file is properly closed after use.
//The Deno.readFile function reads the contents of a file and returns a Promise that resolves to a Uint8Array. The Response constructor can accept a Uint8Array as the body, so you can return the file contents directly without using a TextDecoder.

// However, using a TextDecoder can be useful if you need to manipulate the file contents as a string before returning it. If you're just returning the file contents directly, you can omit the TextDecoder
// // example:
// // HTML

// <p>Encoded value: <span id="encoded-value"></span></p>
// <p>Decoded value: <span id="decoded-value"></span></p>

// // JS

// const encoder = new TextEncoder();
// const array = encoder.encode("€"); // encode the string "€" into Uint8Array(3) [226, 130, 172]
// document.getElementById("encoded-value").textContent = array;

// const decoder = new TextDecoder();
// const str = decoder.decode(array); // decode the Uint8Array back into a string back into String "€"
// document.getElementById("decoded-value").textContent = str;
// RESULT Encoded
// value: 226,130,172

// Decoded value: €
