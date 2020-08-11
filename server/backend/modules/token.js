let jwt = require("jsonwebtoken")
const secretObj = require("../config/jwt")

module.exports = {
    createToken : async(email)=>{
        var token = jwt.sign({email : email},secretObj.secret,{expiresIn : '5m'  })
        return token
    },

    checktoken: (token)=>{
        return new Promise(
            (resolve, reject)=>{
                jwt.verify(token,secretObj.secret,(err,decoded)=>{
                    if(err) reject(err)
                    console.log(">>> ",decoded)
                    resolve(decoded);
                })
            }
        )
        // jwt.verify(token,secretObj.secret,(err,decoded)=>{
        //     if(err){
        //         console.log("1")
        //         return true
        //     }else if(decoded){
        //         console.log("2")
        //         return false
        //     }
        // })
    }
}