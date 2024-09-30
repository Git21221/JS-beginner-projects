import tweepy
import schedule
import time
import random
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

# Twitter API credentials (Replace with your own)
API_KEY = 'GTTmtNd2LSDhNnOYzqiQtoClL'
API_SECRET_KEY = 'MmRHVDcpcqATVAFAcs5Nn39f1LsKGsynoL91a5DpNEaQmK1JQE'
ACCESS_TOKEN = '1827621926421852160-NjQcEEWBd18axdaG8tLI5J2Xcfxskw'
ACCESS_TOKEN_SECRET = 'IdbqCSoNzyRbyTKHfjebWCmOFQkpVxnmqZmpCNF8lUToz'
BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAPcbwAEAAAAAud%2BrAHqJZ7j%2FwSYTsv%2FsT8sTML4%3DXqyeqOUrhx7nH04uKm3gQehNYiAy8Hbq07FCpgoQBQiBWBhUvc' 

# Authenticate with Twitter using Bearer Token for API v2
def authenticate_twitter():
    try:
        client = tweepy.Client(bearer_token=BEARER_TOKEN, 
                               consumer_key=API_KEY, 
                               consumer_secret=API_SECRET_KEY, 
                               access_token=ACCESS_TOKEN, 
                               access_token_secret=ACCESS_TOKEN_SECRET)
        logger.info("Authentication successful")
        return client
    except Exception as e:
        logger.error("Unexpected error during authentication", exc_info=True)
        raise e

# List of motivational quotes
QUOTES = [
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Your limitation—it’s only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for."
]

# Function to post a tweet
def post_tweet(client):
    try:
        quote = random.choice(QUOTES)
        client.create_tweet(text=quote) # Using create_tweet method in v2
        logger.info(f"Tweeted: {quote}")
    except Exception as e:
        logger.error("An unexpected error occurred while posting tweet", exc_info=True)

def main():
    client = authenticate_twitter()

    # Test posting a tweet manually to ensure it works before scheduling
    post_tweet(client) # Comment this out if you want to test scheduling only

    # Schedule the tweet to post every day at a specific time
    schedule.every().day.at("09:00").do(post_tweet, client=client)

    # For debugging, post a tweet every 1 minute (for testing)
    schedule.every(1).minutes.do(post_tweet, client=client)

    logger.info("Bot is running...")

    while True:
        schedule.run_pending()
        time.sleep(1)

# Main entry point
if __name__ == "__main__":
    main()
