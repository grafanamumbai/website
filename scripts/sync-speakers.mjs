import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPEAKERS_FILE = path.join(__dirname, '../src/data/speakers.json');
const COMMUNITY_DATA_FILE = path.join(__dirname, '../src/data/community-data.json');

const DEFAULT_SHEET_ID = '1DkCN5SN2wIKbORpYUV03OJcEW4hfLl69jYetf2egYps';
const SHEET_CSV_URL = process.env.SPEAKERS_SHEET_CSV_URL || 
  `https://docs.google.com/spreadsheets/d/${DEFAULT_SHEET_ID}/export?format=csv`;

/**
 * Parses standard CSV text (including quoted multiline cells) into rows
 */
function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentCell.trim());
      if (currentRow.some(c => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some(c => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Resolves Google Drive URLs into high-res thumbnail previews
 */
function resolveAvatarUrl(url) {
  if (!url) return '';
  const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|drive\/folders\/|open\?id=)([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w500-h500`;
  }
  return url;
}

async function syncSpeakersFromGoogleSheet() {
  console.log('Fetching Google Sheet CSV feed from:', SHEET_CSV_URL);
  let res;
  try {
    res = await fetch(SHEET_CSV_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
  } catch (err) {
    console.error('Network request failed for Google Sheet:', err.message);
    return;
  }

  if (!res.ok) {
    console.error(`Google Sheet returned status HTTP ${res.status}. Note: Ensure the sheet is shared as "Anyone with the link can view".`);
    return;
  }

  const csvText = await res.text();
  if (csvText.includes('<!DOCTYPE html>') || csvText.includes('Sign in to your Google Account')) {
    console.warn('⚠️ Google Sheet is private. To enable automatic speaker sync:');
    console.warn('👉 In Google Sheets, click "Share" -> change to "Anyone with the link" as "Viewer", or use "File > Share > Publish to web > CSV".');
    return;
  }

  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    console.log('No data rows found in Google Sheet.');
    return;
  }

  const headers = rows[0].map(h => h.toLowerCase());
  console.log('Detected Sheet Headers:', headers);

  // Fuzzy Header Resolver
  const findCol = (...keywords) => {
    return headers.findIndex(h => keywords.some(k => h.includes(k)));
  };

  const nameIdx = findCol('name', 'speaker', 'full name');
  const roleIdx = findCol('role', 'designation', 'title', 'headline');
  const companyIdx = findCol('company', 'organization', 'work');
  const topicIdx = findCol('topic', 'talk title', 'session', 'proposal');
  const bioIdx = findCol('bio', 'about', 'abstract', 'description');
  const avatarIdx = findCol('photo', 'image', 'picture', 'avatar', 'drive');
  const linkedinIdx = findCol('linkedin');
  const twitterIdx = findCol('twitter', 'x.com');
  const statusIdx = findCol('status', 'accepted', 'selected', 'confirmed');
  const editionIdx = findCol('edition', 'event', 'meetup');

  // Load current event info to match active edition
  let currentEdition = '';
  try {
    const communityData = JSON.parse(fs.readFileSync(COMMUNITY_DATA_FILE, 'utf-8'));
    currentEdition = communityData.currentEvent?.edition || '';
  } catch (e) {
    // Ignore if not accessible
  }

  const dataRows = rows.slice(1);
  const confirmedSpeakers = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    const name = nameIdx !== -1 ? row[nameIdx] : '';
    if (!name || name.length < 2) continue;

    // Filter by status if status column exists
    if (statusIdx !== -1) {
      const status = (row[statusIdx] || '').toLowerCase();
      const isAccepted = status.includes('accept') || status.includes('confirm') || status.includes('select') || status.includes('yes');
      if (!isAccepted) {
        continue; // Skip unconfirmed or pending submissions
      }
    }

    // Filter by edition if edition column exists and matches
    if (editionIdx !== -1 && currentEdition) {
      const editionVal = (row[editionIdx] || '').toLowerCase();
      if (editionVal && !currentEdition.toLowerCase().includes(editionVal) && !editionVal.includes(currentEdition.toLowerCase())) {
        // Different edition, skip
        continue;
      }
    }

    const role = roleIdx !== -1 ? row[roleIdx] : 'Speaker';
    const company = companyIdx !== -1 ? row[companyIdx] : '';
    const topic = topicIdx !== -1 ? row[topicIdx] : '';
    const bio = bioIdx !== -1 ? row[bioIdx] : '';
    const rawAvatar = avatarIdx !== -1 ? row[avatarIdx] : '';
    const avatar = resolveAvatarUrl(rawAvatar);
    const linkedin = linkedinIdx !== -1 ? row[linkedinIdx] : '';
    const twitter = twitterIdx !== -1 ? row[twitterIdx] : '';

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `speaker-${i + 1}`;

    const speaker = {
      id,
      name,
      role: role || 'Community Speaker',
      ...(company ? { company } : {}),
      ...(topic ? { topic } : {}),
      ...(bio ? { bio } : {}),
      ...(avatar ? { avatar } : {}),
      socials: {
        ...(linkedin ? { linkedin } : {}),
        ...(twitter ? { twitter } : {})
      },
      featured: true
    };

    confirmedSpeakers.push(speaker);
  }

  if (confirmedSpeakers.length === 0) {
    console.log('No confirmed speakers matched current criteria.');
    return;
  }

  console.log(`Found ${confirmedSpeakers.length} confirmed speakers from Google Sheet:`, confirmedSpeakers.map(s => s.name));

  // Compare with existing speakers.json
  let existingSpeakers = [];
  try {
    existingSpeakers = JSON.parse(fs.readFileSync(SPEAKERS_FILE, 'utf-8'));
  } catch (e) {
    existingSpeakers = [];
  }

  const isDifferent = JSON.stringify(existingSpeakers) !== JSON.stringify(confirmedSpeakers);
  if (isDifferent) {
    fs.writeFileSync(SPEAKERS_FILE, JSON.stringify(confirmedSpeakers, null, 2) + '\n', 'utf-8');
    console.log('✅ Successfully updated src/data/speakers.json with confirmed speakers!');
  } else {
    console.log('Speakers data is already up to date.');
  }
}

syncSpeakersFromGoogleSheet();
