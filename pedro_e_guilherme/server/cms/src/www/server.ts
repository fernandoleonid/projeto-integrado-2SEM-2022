import Server from "../v1/Server";

const port = 3333;

const server = Server.Instance.server;

async function init() {
  await server.listen({ port });
}

init();
