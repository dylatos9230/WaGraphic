import("./pkg/").then((m) => {
    console.log(m)
    m.say_hello_from_rust();
}).catch(console.error)


