const isAdmin =(req, res, next) => {
    if ((req.userInfo.role !== 'apprenant')) {
        
        return res.json({message : 'you are not admin'})
        
    }
    next();
}
module.exports = isAdmin