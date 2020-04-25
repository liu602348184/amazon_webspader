const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host:'smtp.qq.com',//邮箱服务的主机，如smtp.qq.com
  port:'465',//对应的端口号
  //开启安全连接
  secure: true,
  //secureConnection:false,
  //hahulhbtaobubegj
  //用户信息
  auth:{
    user:'602348184@qq.com ',
    pass:'hahulhbtaobubegj'
  }
})

exports.send = function (content) {
  //设置收件人信息
  let mailOptions={
    from:'602348184@qq.com',//谁发的
    to:'liuyujie.602348184@qq.com',//发给谁
    subject:'the switch page of amazon has been change!!',//主题是什么
    text: content,//文本内容
    html: '',
  }
  // console.error(mailOptions)
  transporter.sendMail(mailOptions,(error,info)=>{
    // console.error(">>>>>>>>>>>>>>>", error, info)
    if(error)
      return console.log(error);
    console.log(`Message: ${info.messageId}`);
    console.log(`sent: ${info.response}`);
  })
}