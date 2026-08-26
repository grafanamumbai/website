import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../src/data/community-data.json');

async function updateMeetupData() {
  console.log('Fetching Meetup page...');
  const res = await fetch('https://www.meetup.com/grafana-and-friends-mumbai/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();

  const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/);
  if (!nextDataMatch) {
    console.error('Could not find __NEXT_DATA__ on the page');
    process.exit(1);
  }

  const nextData = JSON.parse(nextDataMatch[1]);
  const apolloState = nextData.props?.pageProps?.__APOLLO_STATE__;
  if (!apolloState) {
    console.error('Could not find __APOLLO_STATE__');
    process.exit(1);
  }

  const groupKey = Object.keys(apolloState).find(k => k.startsWith('Group:'));
  const eventKey = Object.keys(apolloState).find(k => k.startsWith('Event:'));

  const memberCount = apolloState[groupKey]?.stats?.memberCounts?.all;
  let upcomingEventUrl = null;
  
  if (eventKey) {
    upcomingEventUrl = apolloState[eventKey].eventUrl;
  }

  console.log('Fetched Member Count:', memberCount);
  console.log('Fetched Upcoming Event:', upcomingEventUrl);

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  let updated = false;

  if (memberCount) {
    // Format as 2700+, 2800+ etc
    const rounded = Math.floor(memberCount / 100) * 100;
    const membersString = `${rounded}+`;
    if (data.chapter.stats.members !== membersString) {
       console.log(`Updating members: ${data.chapter.stats.members} -> ${membersString}`);
       data.chapter.stats.members = membersString;
       updated = true;
    }
  }

  if (upcomingEventUrl && data.currentEvent.registration.rsvpUrl !== upcomingEventUrl) {
    console.log(`Updating event URL: ${data.currentEvent.registration.rsvpUrl} -> ${upcomingEventUrl}`);
    data.currentEvent.registration.rsvpUrl = upcomingEventUrl;
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
    console.log('Updated community-data.json successfully!');
  } else {
    console.log('No updates needed.');
  }
}

updateMeetupData().catch(console.error);
