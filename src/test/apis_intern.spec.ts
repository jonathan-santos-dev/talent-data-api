import request from "supertest";
import server from "../main";


describe("Running Apis test for intern user", () => {
    let token: string;
    it("Login", (done) => {
        request(server)
            .post("/login")
            .send({
                email: "intern.salesrep@stit.talent",
                password: "Or63inluKBLPs006vw9diRmzdCjYLB9H"
            })
            .expect(200, (err, res) => {
                if (err) return done(err);
                token = res.body.token;
                done();
            })
    });

    it("get products that is not permitted", (done) => {
        if (!token) return done(new Error("No token"))
        request(server).get("/products/Games")
            .set({ 'Authorization': `Bearer ${token}` })
            .expect(401, (err, res) => {
                if (err) return done(err);
                // console.log(res.body);

                done();
            })
    });

    it("get products", (done) => {
        if (!token) return done(new Error("No token"))
        request(server).get("/products/STUFF A")
            .set({ 'Authorization': `Bearer ${token}` })
            .expect(200, (err, res) => {
                if (err) return done(err);
                // console.log(res.body);

                done();
            })
    });

    it("get products with tag", (done) => {
        if (!token) return done(new Error("No token"))
        request(server).get("/products/STUFF A?tags=Ergonomic,Generic")
            .set({ 'Authorization': `Bearer ${token}` })
            .expect(200, (err, res) => {
                if (err) return done(err);
                console.log(`Total: ${res.body.total}`);

                done();
            })
    });
});
