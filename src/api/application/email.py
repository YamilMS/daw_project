import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

def send_verification_email(to_email, verification_token):
    
    
    sender_email = os.getenv('GMAIL_MAIL')
    sender_password = os.getenv('GMAIL_PWD')
    subject = 'Account Verification'
    FE_URL= os.getenv('FRONT_URL')

    # Debugging prints
    print(f"Sender Email: {sender_email}")
    print(f"Sender Password: {'*' * len(sender_password) if sender_password else None}")
    print(f"Front End URL: {FE_URL}")

    if not sender_email or not sender_password or not FE_URL:
        print("Error: One or more environment variables are not set.")
        return
    
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = to_email
    message['Subject'] = subject

    body = f'Welcome to TSA! Click the following link to verify your account: ' \
           f'https://{FE_URL}/verify/{verification_token}'
    message.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        text = message.as_string()
        server.sendmail(sender_email, to_email, text)
        server.quit()
        print('Verification email sent successfully!')
    except Exception as e:
        print('Error sending verification email:', str(e))