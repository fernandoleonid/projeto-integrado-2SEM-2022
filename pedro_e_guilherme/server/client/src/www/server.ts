import Server from "../v1/Server";

const server = Server.Instance.server;

server.listen({ port: 3334 });
