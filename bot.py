from telegram.ext import Updater, CommandHandler

# Function to handle the /start command
def start(update, context):
    # Get the user's first name or username
    first_name = update.message.from_user.first_name
    # Craft the personalized welcome message
    welcome_message = f"Hello dear {first_name}, welcome to my bot!"
    # Send the message back to the user
    update.message.reply_text(welcome_message)

# Main function to set up the bot
def main():
    # Replace 'YOUR_TOKEN' with the token you got from BotFather
    updater = Updater("7152403792:AAG4bIdcj0NFf3xAr5g2GFlk6JqmwQUxtBA", use_context=True)

    # Get the dispatcher to register handlers
    dp = updater.dispatcher

    # Add a handler for the /start command
    dp.add_handler(CommandHandler("start", start))

    # Start polling for updates from Telegram
    updater.start_polling()

    # Run the bot until you stop it
    updater.idle()

if __name__ == '__main__':
    main()
