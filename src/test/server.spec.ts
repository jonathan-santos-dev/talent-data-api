import request from "supertest";
import server from "../main";

describe("express", function () {
	it("/ responds with 404", function (done) {
		request(server).get("/").expect(404, done);
	});
});
