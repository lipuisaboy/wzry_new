module.exports = () => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const Admin = require('../model/Admin')
  return async(req,res,next) =>{
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token,401,'请提供token')
    const tokenData = jwt.verify(token,req.app.get('secret'))
    assert(tokenData,401,'无效的token')
    req.user = await Admin.findById(tokenData.id)
    assert(req.user,401,'请先登录')
    await next()
  }
}