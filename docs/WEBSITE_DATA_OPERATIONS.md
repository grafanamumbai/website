# Website Data Operations

This document describes how data operates on the Grafana & Friends Mumbai website.

## Source of Truth
The central source of truth for community and event data is \`src/data/community-data.json\`.
This JSON file drives the entire UI, including community stats, organizer team, and the current upcoming event.

## Meetup Sync Architecture
The website automatically synchronizes its member count and the next upcoming event from our official Meetup page. 
This works via a near-real-time automated pipeline:

1. **GitHub Actions**: The workflow \`.github/workflows/update-meetup.yml\` is triggered automatically.
2. **Frequency**: Scheduled approximately every 30 minutes (cron: \`7,37 * * * *\`). *Note: GitHub Actions scheduling can be delayed by platform load.*
3. **Sync Script**: \`scripts/sync-meetup.mjs\` runs in Node.js. It fetches the Meetup page, parses the internal Apollo GraphQL state, finds the earliest *future* event, and extracts member counts.
4. **Committing Changes**: If the data differs from \`community-data.json\`, the bot safely commits the changes as the official Grafana & Friends Mumbai identity and pushes to \`main\`. Vercel automatically deploys the updated data.

## Event Lifecycle & No-Event Behavior
- **When a Meetup event is scheduled**: The sync script will discover it, update the title, date, time, and RSVP link, and set \`hasUpcomingEvent: true\`. The website will automatically render the live countdown, event details, schedule, speakers, and contests sections.
- **When the event passes / No upcoming event**: The sync script detects there are no future events and safely transitions the data to \`hasUpcomingEvent: false\`. The website intelligently switches to a neutral "Next meetup coming soon" state. Stale schedules, speakers, and expired countdowns are automatically hidden to avoid confusing the community.

## Manual Execution
If an event was just published on Meetup and you want it on the website immediately without waiting 30 minutes, you can manually run the sync:
1. Go to **Actions** in the GitHub repository.
2. Select **Update Meetup Data**.
3. Click **Run workflow**.

## Organizers Guide
**To publish a new event:**
1. Simply publish it on Meetup.com.
2. The website will automatically discover it and update the Hero section and countdown.

**What is manually maintained?**
- **Schedule, Speakers, and Contests**: Since these details vary heavily per event and Meetup doesn't provide structured fields for them, they are manually maintained in \`src/data/community-data.json\`. Edit the file when the lineup is confirmed.
- **Core Team & Gallery**: Manually edited in the JSON file.

## Troubleshooting Sync Failures
If the website stops updating automatically:
1. Check the GitHub Actions tab for failed runs.
2. Ensure the Meetup.com DOM or Apollo State structure hasn't changed. If Meetup changed their internal GraphQL format, \`scripts/sync-meetup.mjs\` must be updated.
