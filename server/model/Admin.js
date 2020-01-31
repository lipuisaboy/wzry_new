const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username:{
    type:String
  },
  password:{
    type:String,
    select:false,
    set(userWrite){
      return require('bcryptjs').hashSync(userWrite,10)
    }
  }
})

module.exports = mongoose.model("Admin",schema)