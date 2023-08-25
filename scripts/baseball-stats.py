import os
import sys
import json
import pandas as pd
from datetime import datetime
from supabase import create_client, Client
from pybaseball import schedule_and_record, standings
from json import dumps

url = 'https://ubsvlgsqbasovaldifvs.supabase.co'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVic3ZsZ3NxYmFzb3ZhbGRpZnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI1NjgxOTcsImV4cCI6MjAwODE0NDE5N30.fbQhRdt3Mwj1DVsk9Q1JbEch7k1N3fVKUFEYUdiZCag'
supabase: Client = create_client(url, key)
year = sys.argv[1]

teams_response = supabase.table('teams').select("abbreviation").execute()
last_upload_response = supabase.table('game_uploads').select("*").eq("year", year).order('uploaded_at', desc = True).limit(1).execute()
print('begin game downloading for year ' + str(year))

last_upload_date = datetime(1900, 1, 1).date()
if len(last_upload_response.data):
    last_upload_date = datetime.strptime(last_upload_response.data[0]["uploaded_at"].split(".")[0], "%Y-%m-%dT%H:%M:%S").date()
    print('last upload was at ' + str(last_upload_date))
else:
    print('no previous upload found')

total_count = 0

for team in teams_response.data:
    data = schedule_and_record(int(year), team['abbreviation'])
    records = []

    print('downloading games for ' + team['abbreviation'])

    for index,row in data.iterrows(): 
        date = datetime.strptime(row['Date'].replace(' (1)', '').replace(' (2)', '') + ', ' + str(year), "%A, %b %d, %Y").date()
        
        if not pd.isna(row['R']) and date > last_upload_date:
            records.append({"game_num": index, 
                "year": year,
                "date": json.dumps(date, indent=4, sort_keys=True, default=str),
                "team": row['Tm'], 
                "home": row['Home_Away'] == 'Home',
                "opponent": row['Opp'],
                "win": 'W' in row['W/L'],
                "runs_scored": int(row['R']),
                "runs_against": int(row['RA']),
                "innings": float(row['Inn']),
                "winloss": row['W-L']
            })
        
    print('found ' + str(len(records)) + ' records...sending to DB')
    total_count = total_count + len(records)
    if len(records) > 0:
        d, count = supabase.table('games').insert(records).execute()

supabase.table('game_uploads').insert({"uploaded_at": json.dumps(datetime.now(), indent=4, sort_keys=True, default=str), "num_records": total_count, "year": year}).execute()
print('game downloading finished')
