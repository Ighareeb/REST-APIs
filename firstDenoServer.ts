// Creating a Server
// Client sends req to server that has specific IP:port (URL)
// Server is listening at that specific URL endpoint
// Server has handler function to deal with and send response back to Client

//Deno is very strict with permission, because of its security model
//since the file is using the network we need to manually allow it (by default it is disallowed from everything)
//terminal --> deno run --allow-net firstDenoServer.ts

// deno has built in 'watch' mode (similar to nodemon) that automatically check for file changes and restart the server (--watch flag starts 'Watcher Process')
//terminal --> deno run --allow-net --watch firstDenoServer.ts

//handler function uses req and res objects from web API
async function handler(req: Request) {
	console.log(req.method);
	console.log(req.headers);

	const file = await Deno.open('./firstDenoServer.html');
	//turn file into readable to send to client (using streaming web API) where
	//transfer-econding === 'chunked'
	const fileStream = file.readable;
	//relevant if it is a large file, so if we were to open it synchronously it would be very slow on the server (especially if many ppl are using the server at once)
	// ⚠️  Deno requests read access to "./firstDenoServer.html".
	// ├ Requested by `Deno.open()` API.
	// ├ Run again with {deno run --allow-net --allow-read (--watch) filename.ts} to bypass this prompt.

	//change response headers with 2nd arg (can be done directly by adding a headers: {obj} or using variable as shown)
	const htmlHeaders = new Headers();
	htmlHeaders.append('content-type', 'text/html'); //same as default

	return new Response(fileStream, {
		headers: htmlHeaders,
	});
}

// create instance of server using Deno.serve() that listens on specific port and uses handler function to deal with request/send response [Deno specific non-standard API (vs web API)]
// default is 127.0.0.1:8000 so do not need to specify in the function
//(127.0.0.1 === localhost alias so can use http://localhost:8000 interchangeably)
Deno.serve({ port: 8000, hostname: '127.0.0.1' }, handler);
