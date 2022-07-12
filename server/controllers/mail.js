const nodemailer = require('nodemailer')

const sendEmail=(mail,message)=>{
     
      var message = {
            from:'ash24biradar@gmail.com',
            to:mail,
            subject:'Order Placed Successfully',
            text:message,
       }
      const transporter = nodemailer.createTransport({
            host:'smtp-relay.sendinblue.com',
            port:587,
            secure:false,
            auth:{
               user:'ash24biradar@gmail.com',
               pass:'V0mqzbJBM7G3awYg'
            }
      })

      transporter.sendMail(message,function(err,data){
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
      })

}

module.exports={sendEmail}