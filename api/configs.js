if(process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("must provide JWT_SECRET environment variable")
}

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "Whoa there cowboy, why you peeking up my secrets?!"
}