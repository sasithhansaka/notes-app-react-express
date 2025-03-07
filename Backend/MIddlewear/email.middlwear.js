
// import HttpStatus from 'http-status-codes';

const valideEmail = (req,res,next) =>{
    const {to ,noteTitle,noteContent }  = req.body;

    if(!to || !noteTitle || !noteContent){
        return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'all fields are required'
        });
    }


    next();
}

export default valideEmail;