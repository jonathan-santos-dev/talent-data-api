import request from "supertest";
import server from "../main";


describe("Running Apis test for middle user", () => {
    let token: string;
    it("Login", (done) => {
        request(server)
            .post("/login")
            .send({
                email: "middle.salesrep@stit.talent",
                password: "9fiD2NCGeLqjSSjhUP78kDS3ic2B93Wy"
            })
            .expect(200, (err, res) => {
                if (err) return done(err);
                token = res.body.token;
                done();
            })
    });

    it("get products", (done) => {
        if (!token) return done(new Error("No token"))
        request(server).get("/products/Games")
            .set({ 'Authorization': `Bearer ${token}` })
            .expect(200, (err, res) => {
                if (err) return done(err);
                // console.log(res.body);

                done();
            })
    });

    it("get products with tag", (done) => {
        if (!token) return done(new Error("No token"))
        request(server).get("/products/Baby?tags=Incredible,Generic")
            .set({ 'Authorization': `Bearer ${token}` })
            .expect(200, (err, res) => {
                if (err) return done(err);
                console.log(`Total: ${res.body.total}`);

                done();
            })
    });
});
