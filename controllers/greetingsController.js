let greetings = [
    { id: 1, reciepent: "Jane" , message: "Kauneid jõule!", sender: "Liisa"},
    { id: 2, reciepent: "Mirjam Tõniste", message: "Head uut aastat!", sender: "Madis" },
    { id: 3, reciepent: "Kuno", message: "Palju õnne sünnipäevaks!", sender: "Alar Karis" },
]

const getGreetingById = function (id) {
    return greetings.find(x => x.id ==id)
}
exports.getAllgreetings = (req, res) => {
    res.send(greetings)
}
exports.getGreetingById = (req, res) => {
    const result = getGreetingById(req.params.id)
    if (typeof result === 'undefined') {
        return res.status(404).send({ error: "Greeting not found" })
    }
    res.send(result)
}
exports.createGreeting = (req, res) => {
    if (!req.body.id || !req.body.reciepent || !req.body.message || !req.body.sender) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newGreeting = {
        id: greetings [greetings.length -1].id +1,
        reciepent: req.body.reciepent,
        message: req.body.message,
        sender: req.body.sender     
    }
    greetings.push(newGreeting)
    res.status(201)
    .location('http://localhost:8080/greetings/' + newGreeting.id)
    .send(newGreeting
    )
}
exports.updateGreeting = (req,res)=>{
    const result = getGreetingById(req.params.id)
    if (typeof result === 'undefined') {
        return res.status(404).send({ error: "Greeting not found" })
    }
    if (!req.body.id || !req.body.reciepent || !req.body.message || !req.body.sender) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    result.reciepent = req.body.reciepent
    result.message = req.body.message
    result.sender = req.body.sender
    res.status(200)
        .location('http://localhost:8080/greetings/' + result.id)
        .send(result)
}
exports.deleteGreeting = (req,res)=>{
    const greetingToDelete = getGreetingById(req.params.id)
    if (typeof greetingToDelete === 'undefined'){
        return res.status(404).send({ error: 'Greeting not found'})
    }
    greetings = greetings.filter(w => w.id !== greetingToDelete.id)
    res.status(204).send()
}