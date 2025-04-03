import random
import smtplib
import string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
# Helper functions for OTP
def generate_otp(length=6):
    """Generate a random numeric OTP"""
    return ''.join(random.choices(string.digits, k=length))

def send_otp_email(receiver_email, otp):
    """Send an animated OTP email"""
    sender_email = os.getenv("SENDER_EMAIL")  # Use your sender email here
    password = os.getenv("SENDER_PASSWORD")  # Use your app password here
    
    # Create message container
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Your CLASS Verification Code"
    msg['From'] = "CLASS <" + sender_email + ">"
    msg['To'] = receiver_email
    
    # Create the expiration time (5 minutes from now)
    expiry_time = datetime.now() + timedelta(minutes=5)
    expiry_str = expiry_time.strftime("%H:%M:%S")
    
    # HTML email with animation and styling
    html = f"""
    <html>
    <head>
        <style>
            @keyframes fadeIn {{
                from {{ opacity: 0; transform: translateY(20px); }}
                to {{ opacity: 1; transform: translateY(0); }}
            }}
            @keyframes pulse {{
                0% {{ transform: scale(1); }}
                50% {{ transform: scale(1.05); }}
                100% {{ transform: scale(1); }}
            }}
            body {{
                font-family: 'Helvetica Neue', Arial, sans-serif;
                color: #333;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border-radius: 8px;
                animation: fadeIn 0.8s ease-out;
            }}
            .logo {{
                text-align: center;
                margin-bottom: 20px;
            }}
            .header {{
                text-align: center;
                margin-bottom: 30px;
            }}
            .otp-container {{
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                text-align: center;
                margin: 20px 0;
                animation: pulse 2s infinite;
            }}
            .otp {{
                font-size: 36px;
                letter-spacing: 5px;
                color: #4a4a4a;
                font-weight: bold;
                padding: 10px;
                background-color: #f8f9fa;
                border-radius: 4px;
            }}
            .message {{
                text-align: center;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                font-size: 12px;
                color: #666;
                margin-top: 30px;
            }}
            .button {{
                display: inline-block;
                padding: 12px 24px;
                background-color: #4a90e2;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                margin: 20px 0;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <h1 style="color: #4a90e2;">CLASS</h1>
            </div>
            <div class="header">
                <h2>Your Exclusive Verification Code</h2>
                <p>Welcome to premium service that puts you first.</p>
            </div>
            <div class="otp-container">
                <p>Your verification code is:</p>
                <div class="otp">{otp}</div>
                <p>Valid for 5 minutes (until {expiry_str})</p>
            </div>
            <div class="message">
                <p>Don't worry, we've got you covered. This code is your key to unlocking a world of premium experiences.</p>
                <p><strong>CLASS: Because You Deserve the Best</strong></p>
            </div>
            <div style="text-align: center;">
                <a href="#" class="button">Verify Now</a>
            </div>
            <div class="footer">
                <p>If you need assistance, our  support team is always here for you.</p>
                <p>© 2025 CLASS. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    
    # Attach parts to message
    part = MIMEText(html, 'html')
    msg.attach(part)
    
    try:
        # Connect to Yahoo's SMTP server
        server = smtplib.SMTP('smtp.mail.yahoo.com', 587)
        server.starttls()  # Secure the connection
        server.login(sender_email, password)
        
        # Send email
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        
        return True, "OTP sent successfully"
    except Exception as e:
        return False, f"Error sending OTP: {str(e)}"

def verify_otp(user_input, generated_otp, generation_time):
    """Verify if the entered OTP is correct and not expired"""
    current_time = datetime.now()
    expiry_time = generation_time + timedelta(minutes=5)
    
    if current_time > expiry_time:
        return False, "OTP has expired"
    
    if user_input == generated_otp:
        return True, "OTP verified successfully"
    else:
        return False, "Invalid OTP"
