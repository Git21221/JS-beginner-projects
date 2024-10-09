from typing import Final
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import random

TOKEN = ''  # Replace with your bot token
BOT_USERNAME: Final = ''

# Fighter Jet Information Dictionary
fighter_jets_info = {
    'f-22': "The F-22 Raptor is a fifth-generation, single-seat, twin-engine, all-weather stealth tactical fighter aircraft developed for the United States Air Force.",
    'f-35': "The F-35 Lightning II is a family of stealth multirole fighters. It is designed to perform ground attack, aerial reconnaissance, and air defense missions.",
    'su-57': "The Sukhoi Su-57 is a Russian fifth-generation stealth multirole fighter developed to destroy all types of air, ground, and naval targets.",
    'rafale': "The Dassault Rafale is a French twin-engine, canard delta wing, multirole fighter aircraft designed and built by Dassault Aviation.",
    'typhoon': "The Eurofighter Typhoon is a twin-engine, canard–delta wing, multirole fighter developed by a consortium of European countries."
}

# Fighter Jet Facts
jet_facts = [
    "The F-22 Raptor can supercruise, meaning it can fly at supersonic speeds without using afterburners.",
    "The F-35 has three variants: F-35A (conventional takeoff), F-35B (short takeoff/vertical landing), and F-35C (carrier-based).",
    "The Su-57 is Russia's first stealth aircraft and is designed to rival American fifth-generation fighters.",
    "The Dassault Rafale is equipped with an advanced electronic warfare system known as Spectra.",
    "The Eurofighter Typhoon can reach a top speed of Mach 2."
]

# Quiz Questions
quiz_questions = [
    {"question": "Which country developed the F-35?", "answer": "united states"},
    {"question": "How many engines does the Rafale have?", "answer": "two"},
    {"question": "What generation is the F-22?", "answer": "fifth"}
]

# Commands
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('ROAR! Thanks for fighting alongside me! I am a Fighter Jet bot. Ask me about fighter jets by typing their names.')

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('I can provide information about different fighter jets. You can also play a jet quiz or ask for a random jet fact!')

# Fighter Jet Information Response Handler
async def handle_response(text: str, update: Update):
    processed = text.lower()

    for jet, info in fighter_jets_info.items():
        if jet in processed:
            await update.message.reply_text(info)
            return None

    return "I don't have information on that fighter jet. Try asking about F-22, F-35, Su-57, Rafale, or Typhoon."

# Random Jet Generator
async def random_jet_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    random_jet = random.choice(list(fighter_jets_info.keys()))
    jet_info = fighter_jets_info[random_jet]
    await update.message.reply_text(f"How about learning about the {random_jet.upper()}? \n{jet_info}")

# Jet Fact of the Day
async def fact_of_the_day_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    fact = random.choice(jet_facts)
    await update.message.reply_text(f"Jet Fact of the Day: {fact}")

# Quiz Feature
async def quiz_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    question = random.choice(quiz_questions)
    context.user_data['current_question'] = question  # Store current question in user data
    await update.message.reply_text(f"Quiz Time! {question['question']}")

# Handle Quiz Response
async def handle_quiz_response(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_answer = update.message.text.lower()
    current_question = context.user_data.get('current_question')

    if current_question:
        correct_answer = current_question['answer']

        if user_answer == correct_answer:
            await update.message.reply_text("Correct! 🎉")
        else:
            await update.message.reply_text(f"Oops! The correct answer was '{correct_answer}'.")
        
        # Clear the current question after answering
        context.user_data['current_question'] = None
    else:
        await update.message.reply_text("You're not currently in a quiz! Type /quiz to start one.")

# Handle messages (includes both fighter jet info and quiz handling)
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Check if the user is answering a quiz
    current_question = context.user_data.get('current_question')

    if current_question:
        # If there's a current quiz question, handle the quiz response
        await handle_quiz_response(update, context)
    else:
        # Otherwise, handle the general message as a fighter jet inquiry
        text = update.message.text
        response = await handle_response(text, update)
        if response:
            await update.message.reply_text(response)

# Handle errors
async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f'Update {update} caused error {context.error}') 

# Main application logic
if __name__ == '__main__':
    print('Starting')
    app = Application.builder().token(TOKEN).build()

    # Command Handlers
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('randomjet', random_jet_command))
    app.add_handler(CommandHandler('fact', fact_of_the_day_command))
    app.add_handler(CommandHandler('quiz', quiz_command))

    # Message Handlers
    app.add_handler(MessageHandler(filters.TEXT, handle_message))

    # Error Handler
    app.add_error_handler(error)

    # Polling the bot
    print('Polling')
    app.run_polling(poll_interval=3)
