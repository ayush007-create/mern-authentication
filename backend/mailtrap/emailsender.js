const {client,sender} = require('./mailtrap.config')
const {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE} = require('./emailTemplates')

const sendVerificationEmail = async (email,token) => {
    const recipients = [{email}]
    await client.send({
        from: sender,
        to: recipients,
        subject: "Verify Your Email",
        html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",token),
        category: "Verification Email!",
        }).then((response)=>{
            console.log("Email Sent Successfully!",response)}).catch((error)=>{
                console.log(error)
        })
}
const sendWelcomeEmail = async (email,name) => {
    const recipients = [{email}]
    await client.send({
      from: sender,
      to: recipients,
      template_uuid: "b856bc12-1f12-4789-b06f-225f922ffe72",
      template_variables: {
        "company_info_name": "Artsy View",
        "name": name
      }
    }).then((response)=>{
        console.log("Email Sent Successfully!",response)}).catch((error)=>{
            console.log(error)
    })
}

const sendResetPasswordRequestEmail = async (email,resetUrl) => {
   const recipients = [{email}]
    await client.send({
        from: sender,
        to: recipients,
        subject: "Reset Your Password!",
        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
        category: "Verification Email!",
        }).then((response)=>{
            console.log("Email Sent Successfully!",response)}).catch((error)=>{
                console.log(error)
        })
}

const sendResetPasswordSuccessEmail = async (email) => {
    const recipients = [{email}]
    await client.send({
        from: sender,
        to: recipients,
        subject: "Password Reset Successfull!",
        html:PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Verification Email!",
        }).then((response)=>{
            console.log("Email Sent Successfully!",response)}).catch((error)=>{
                console.log(error)
        })
}

module.exports = {sendVerificationEmail,sendWelcomeEmail,sendResetPasswordRequestEmail,sendResetPasswordSuccessEmail}