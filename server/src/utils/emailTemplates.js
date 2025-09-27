export const generateRegisterOTPEmail = (otp, name) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Register OTP</title>
<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f9f9f9;
    color: #333;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  .header {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .project-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .project-desc {
    font-size: 14px;
    color: #555;
    margin-bottom: 25px;
  }
  .otp {
    font-size: 28px;
    font-weight: bold;
    color: #4f46e5;
    margin-bottom: 25px;
  }
  .footer {
    font-size: 12px;
    color: #777;
    margin-top: 20px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">Welcome, ${name}!</div>
    <div class="project-name">Knowledge Base</div>
    <div class="project-desc">Use this OTP to complete your registration process and access Knowledge Base.</div>
    <div class="otp">${otp}</div>
    <div class="footer">If you did not request this, please ignore this email.</div>
  </div>
</body>
</html>
`;


export const generateForgotOTPEmail = (otp, name) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Password OTP</title>
<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f9f9f9;
    color: #333;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  .header {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .project-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .project-desc {
    font-size: 14px;
    color: #555;
    margin-bottom: 25px;
  }
  .otp {
    font-size: 28px;
    font-weight: bold;
    color: #d97706;
    margin-bottom: 25px;
  }
  .footer {
    font-size: 12px;
    color: #777;
    margin-top: 20px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">Hello, ${name}!</div>
    <div class="project-name">Knowledge Base</div>
    <div class="project-desc">Use this OTP to reset your password and continue accessing Knowledge Base.</div>
    <div class="otp">${otp}</div>
    <div class="footer">If you did not request this, please ignore this email.</div>
  </div>
</body>
</html>
`;
