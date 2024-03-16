const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/loginAuthWithJWt";

async function main() {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("Connected to MongoDB");

  
}

main().catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
