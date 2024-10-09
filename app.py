from discord_bot import start_discord_bot
from combined_app import create_combined_app

if __name__ == "__main__":
    start_discord_bot()
    combined_app = create_combined_app()
    combined_app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
