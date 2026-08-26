import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EVENT_FILE = path.join(__dirname, '../src/data/event.json');
const COMMUNITY_DATA_FILE = path.join(__dirname, '../src/data/community-data.json');

async function updateMeetupData() {
  console.log('Fetching Meetup page...');
  let res;
  try {
    res = await fetch('https://www.meetup.com/grafana-and-friends-mumbai/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
  } catch (err) {
    console.error('Failed to fetch Meetup page:', err);
    process.exit(1);
  }

  if (!res.ok) {
    console.error(`Meetup page returned status: ${res.status}`);
    process.exit(1);
  }

  const html = await res.text();
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/);
  if (!nextDataMatch) {
    console.error('Could not find __NEXT_DATA__ on the page. Meetup DOM might have changed.');
    process.exit(1);
  }

  let nextData;
  try {
    nextData = JSON.parse(nextDataMatch[1]);
  } catch (err) {
    console.error('Failed to parse __NEXT_DATA__ JSON:', err);
    process.exit(1);
  }

  const apolloState = nextData.props?.pageProps?.__APOLLO_STATE__;
  if (!apolloState) {
    console.error('Could not find __APOLLO_STATE__ inside __NEXT_DATA__.');
    process.exit(1);
  }

  const groupKey = Object.keys(apolloState).find(k => k.startsWith('Group:'));
  if (!groupKey) {
    console.error('Could not find Group key in Apollo state.');
    process.exit(1);
  }

  const memberCount = apolloState[groupKey]?.stats?.memberCounts?.all;

  // Identify all events and filter for future ones
  const now = new Date();
  const eventKeys = Object.keys(apolloState).filter(k => k.startsWith('Event:'));
  const futureEvents = [];

  for (const k of eventKeys) {
    const event = apolloState[k];
    if (event.dateTime) {
      const eventDate = new Date(event.dateTime);
      if (eventDate > now) {
        futureEvents.push(event);
      }
    }
  }

  // Sort future events by date ascending to get the earliest one
  futureEvents.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  const earliestUpcoming = futureEvents.length > 0 ? futureEvents[0] : null;

  console.log('Fetched Member Count:', memberCount);
  if (earliestUpcoming) {
    console.log('Fetched Upcoming Event:', earliestUpcoming.title, 'at', earliestUpcoming.dateTime);
  } else {
    console.log('No upcoming future events found on Meetup.');
  }

  // Load existing files
  const communityData = JSON.parse(fs.readFileSync(COMMUNITY_DATA_FILE, 'utf-8'));
  const eventData = JSON.parse(fs.readFileSync(EVENT_FILE, 'utf-8'));

  let communityUpdated = false;
  let eventUpdated = false;

  // 1. Update member count in community-data.json
  if (memberCount) {
    const rounded = Math.floor(memberCount / 100) * 100;
    const membersString = `${rounded}+`;
    if (communityData.chapter.stats.members !== membersString) {
       console.log(`Updating members count: ${communityData.chapter.stats.members} -> ${membersString}`);
       communityData.chapter.stats.members = membersString;
       communityUpdated = true;
    }
  }

  // 2. Update event details in event.json
  if (earliestUpcoming) {
    if (eventData.currentEvent.hasUpcomingEvent !== true) {
      eventData.currentEvent.hasUpcomingEvent = true;
      eventUpdated = true;
    }

    const newTitle = earliestUpcoming.title || eventData.currentEvent.title;
    if (eventData.currentEvent.title !== newTitle) {
      eventData.currentEvent.title = newTitle;
      eventUpdated = true;
    }

    const eventDate = new Date(earliestUpcoming.dateTime);
    // Format date like "Saturday, 13th June 2026"
    const formattedDate = eventDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const day = eventDate.getDate();
    const suffix = ["th", "st", "nd", "rd"][day % 10 > 3 ? 0 : (day % 100 - day % 10 != 10) * (day % 10)];
    const finalDateStr = formattedDate.replace(day.toString(), `${day}${suffix}`);
    
    if (eventData.currentEvent.date !== finalDateStr) {
      eventData.currentEvent.date = finalDateStr;
      eventUpdated = true;
    }

    const formattedTime = eventDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
      timeZoneName: 'short'
    });
    if (eventData.currentEvent.time !== formattedTime) {
      eventData.currentEvent.time = formattedTime;
      eventUpdated = true;
    }

    if (eventData.currentEvent.targetDateISO !== earliestUpcoming.dateTime) {
      eventData.currentEvent.targetDateISO = earliestUpcoming.dateTime;
      eventUpdated = true;
    }

    const url = earliestUpcoming.eventUrl;
    if (url && eventData.currentEvent.registration.rsvpUrl !== url) {
      eventData.currentEvent.registration.rsvpUrl = url;
      eventUpdated = true;
    }

    // Attempt to extract venue
    let venueName = 'TBA';
    let venueAddress = 'Venue details to be announced soon';
    if (earliestUpcoming.venue && earliestUpcoming.venue.__ref) {
       const venueObj = apolloState[earliestUpcoming.venue.__ref];
       if (venueObj) {
          venueName = venueObj.name || venueName;
          venueAddress = venueObj.address || venueAddress;
       }
    }
    
    if (eventData.currentEvent.venue.name !== venueName) {
      eventData.currentEvent.venue.name = venueName;
      eventUpdated = true;
    }
    if (eventData.currentEvent.venue.address !== venueAddress) {
      eventData.currentEvent.venue.address = venueAddress;
      eventUpdated = true;
    }
    
    // Status text
    const statusText = earliestUpcoming.status === 'ACTIVE' ? 'Registrations Open' : 'Limited Seats Available';
    if (eventData.currentEvent.registration.statusText !== statusText) {
       eventData.currentEvent.registration.statusText = statusText;
       eventUpdated = true;
    }

  } else {
    // No upcoming event
    if (eventData.currentEvent.hasUpcomingEvent !== false) {
      console.log('Transitioning to no-upcoming-event state in event.json.');
      eventData.currentEvent.hasUpcomingEvent = false;
      eventUpdated = true;
    }
  }

  // Write changes
  if (communityUpdated) {
    fs.writeFileSync(COMMUNITY_DATA_FILE, JSON.stringify(communityData, null, 2) + '\n');
    console.log('Updated community-data.json with latest stats!');
  }
  if (eventUpdated) {
    fs.writeFileSync(EVENT_FILE, JSON.stringify(eventData, null, 2) + '\n');
    console.log('Updated event.json with latest upcoming event details!');
  }
  if (!communityUpdated && !eventUpdated) {
    console.log('No updates needed. Both event.json and community-data.json are current.');
  }
}

updateMeetupData().catch(err => {
  console.error('Unhandled error during sync:', err);
  process.exit(1);
});
