import nodemailer from 'nodemailer'
require('dotenv').config();

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: '"Z_TER 👨‍⚕️" <z_ter@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend)
    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
<h3>Xin chào ${dataSend.patientName}!</h3>
<p>Bạn nhận được email này vì đã đặt lịch khám bệnh online ....</p>
<p>Thông tin đặt lịch khám bệnh:</p>
<div><b>Thời gian: ${dataSend.time}</b></div>
<div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

<p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
<div>
<a href="${dataSend.redirectLink}">Xác nhận lịch khám</a></div>
`
    }
    if (dataSend.language === 'en') {
        result = `<h3>Hello ${dataSend.patientName}!</h3>
<p>You received this email because you booked a medical appointment online via the ....</p>
<p>Appointment details:</p>
<div><b>Time: ${dataSend.time}</b></div>
<div><b>Doctor: ${dataSend.doctorName}</b></div>

<p>If the above information is correct, please click the link below to confirm and complete your appointment booking.</p>
<div>
<a href="${dataSend.redirectLink}">Confirm your appointment</a>
</div>`
    }
    return result;
}



module.exports = {
    sendSimpleEmail: sendSimpleEmail
}


