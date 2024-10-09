import os
import discord
import requests
import yaml
import psutil
from threading import Thread

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

DISCORD_TOKEN = os.getenv('DISCORD_TOKEN')
GITHUB_ACCOUNTS_URL = "https://raw.githubusercontent.com/deswafyfxd/disc-data-store/main/accounts.yml"

def fetch_accounts():
    try:
        response = requests.get(GITHUB_ACCOUNTS_URL, timeout=10)
        response.raise_for_status()
        return yaml.safe_load(response.text).get('accounts', {})
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch accounts: {e}")
        return {}

def get_recovery_email(outlook_account, accounts):
    return accounts.get(outlook_account)

def get_system_stats():
    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    stats = {
        "cpu": f"{cpu}%",
        "memory": f"Total: {memory.total // (1024 ** 2)} MB, Available: {memory.available // (1024 ** 2)} MB, Used: {memory.percent}%",
        "disk": f"Total: {disk.total // (1024 ** 3)} GB, Used: {disk.used // (1024 ** 3)} GB, Free: {disk.free // (1024 ** 3)} GB, Used: {disk.percent}%"
    }
    return stats

intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'Logged in as {client.user}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('!get_recovery'):
        parts = message.content.split(' ')
        if len(parts) != 2:
            await message.channel.send("Please use the correct format: `!get_recovery <outlook_account>`")
            return

        outlook_account = parts[1]
        accounts = fetch_accounts()
        recovery_email = get_recovery_email(outlook_account, accounts)
        if recovery_email:
            response_message = f'The recovery email for {outlook_account} is {recovery_email}'
        else:
            response_message = f'No recovery email found for {outlook_account}'
        await message.channel.send(response_message)

    if message.content.startswith('!system_stats'):
        stats = get_system_stats()
        response_message = (
            f"**CPU Usage**: {stats['cpu']}\n"
            f"**Memory**: {stats['memory']}\n"
            f"**Disk**: {stats['disk']}\n"
        )
        await message.channel.send(response_message)

def run_discord_bot():
    try:
        client.run(DISCORD_TOKEN)
    except Exception as e:
        print(f"Failed to connect: {e}")

def start_discord_bot():
    Thread(target=run_discord_bot).start()
