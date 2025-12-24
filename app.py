
from fastapi import FastAPI
from typing import List
import requests
from bs4 import BeautifulSoup
import time

app = FastAPI()

# Rate-limiting: Add 61 seconds delay between requests to external sources
def rate_limited_request(url):
    time.sleep(61)  # Sleep for 61 seconds
    return requests.get(url)

# CricBuzz Scraper
def get_cricbuzz_scores():
    url = "https://www.cricbuzz.com/cricket-match/live-scores"
    response = rate_limited_request(url)
    soup = BeautifulSoup(response.text, "html.parser")

    live_matches = soup.find_all('div', class_='cb-col cb-col-100 cb-ltst-wgt-hdr')

    matches = []
    for match in live_matches:
        match_info = {}
        match_info['teams'] = match.find('a').text.strip()
        match_info['score'] = match.find('div', class_='cb-col cb-col-25 cb-ltst-wgt-hdr').text.strip()
        match_info['status'] = match.find('span', class_='cb-ltst-wgt-status').text.strip() if match.find('span', class_='cb-ltst-wgt-status') else 'N/A'
        matches.append(match_info)

    return matches

# ESPN CricInfo Scraper
def get_espn_scores():
    url = "https://www.espncricinfo.com/live-cricket-score"
    response = rate_limited_request(url)
    soup = BeautifulSoup(response.text, "html.parser")

    live_matches = soup.find_all('div', class_='score-container')

    matches = []
    for match in live_matches:
        match_info = {}
        match_info['teams'] = match.find('span', class_='team-name').text.strip()
        match_info['score'] = match.find('div', class_='score').text.strip()
        match_info['status'] = match.find('div', class_='status').text.strip()
        matches.append(match_info)

    return matches

# BBC Sport Scraper
def get_bbc_scores():
    url = "https://www.bbc.com/sport/cricket"
    response = rate_limited_request(url)
    soup = BeautifulSoup(response.text, "html.parser")

    matches = []
    match_section = soup.find_all('div', class_='gs-o-media__body')

    for match in match_section:
        match_info = {}
        match_info['headline'] = match.find('h3').text.strip() if match.find('h3') else 'N/A'
        match_info['summary'] = match.find('p').text.strip() if match.find('p') else 'N/A'
        matches.append(match_info)

    return matches

# Combine Data from all sources
def combine_data():
    cricbuzz_data = get_cricbuzz_scores()
    espncricinfo_data = get_espn_scores()
    bbc_data = get_bbc_scores()

    combined_data = []

    for match in cricbuzz_data:
        combined_data.append({
            'source': 'CricBuzz',
            'teams': match['teams'],
            'score': match['score'],
            'status': match['status']
        })

    for match in espncricinfo_data:
        combined_data.append({
            'source': 'ESPN CricInfo',
            'teams': match['teams'],
            'score': match['score'],
            'status': match['status']
        })

    for match in bbc_data:
        combined_data.append({
            'source': 'BBC Sport',
            'headline': match['headline'],
            'summary': match['summary']
        })

    return combined_data

@app.get("/livescore", response_model=List[dict])
def get_live_scores():
    data = combine_data()
    return data

@app.get("/livescore/{match_id}", response_model=List[dict])
def get_live_match_scores(match_id: str):
    # Just as an example, here we're using all the data, but match_id logic should be added to filter specific match data
    data = combine_data()
    return data
