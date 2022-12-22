const greetings = require("../controllers/greetingsController")

module.exports = (app) => {
    app.route('/greetings')
                .get(greetings.getAllgreetings)
                .post(greetings.createGreeting)
    app.route('/greetings/:id')
                .get(greetings.getGreetingById)
                .put(greetings.updateGreeting)
                .delete(greetings.deleteGreeting)
}