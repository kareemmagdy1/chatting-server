const bcrypt=require("bcrypt")


async function  temp(){
    bcrypt.hash("123",12).then(hashedpass=>console.log(hashedpass))
    bcrypt.hash("123",12).then(hashedpass=>console.log(hashedpass))

}

temp()
