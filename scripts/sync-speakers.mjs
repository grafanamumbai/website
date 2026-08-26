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
 * Robust CSV parser that correctly handles commas inside quotes and multiline rows
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
        i++; // skip escaped quote
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
    console.error(`Google Sheet returned status HTTP ${res.status}.`);
    return;
  }

  const csvText = await res.text();
  if (csvText.includes('<!DOCTYPE html>') || csvText.includes('Sign in to your Google Account')) {
    console.warn('⚠️ Google Sheet is private or requires authentication.');
    return;
  }

  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    console.log('No speaker rows found in Google Sheet yet (only headers present). Keeping existing speakers.');
    return;
  }

  const headers = rows[0].map(h => h.toLowerCase().trim());
  console.log('Detected Google Sheet Headers:', headers);

  // Exact & Fuzzy Column Matcher
  const findCol = (...keywords) => {
    return headers.findIndex(h => keywords.some(k => h.includes(k.toLowerCase())));
  };

  const firstNameIdx = findCol('first name');
  const lastNameIdx = findCol('last name');
  const fullNameIdx = findCol('full name', 'speaker name', 'name');
  const orgIdx = findCol('organization', 'company', 'work');
  const designationIdx = findCol('designation', 'role', 'job title', 'title');
  const headshotIdx = findCol('your headshot', 'headshot', 'photo', 'picture', 'avatar');
  const linkedinIdx = findCol('linkedin');
  const otherSocialIdx = findCol('other social links', 'social');
  const githubIdx = findCol('github repo', 'github');
  const bioIdx = findCol('your bio', 'bio', 'about');
  const sessionTitleIdx = findCol('session title', 'talk title', 'topic');
  const sessionDescIdx = findCol('session description', 'abstract', 'description');
  const statusIdx = findCol('status', 'accepted', 'selected', 'confirmed');
  const eventConsiderIdx = findCol('which meetup or event', 'event', 'edition');

  // Load current event edition to match if specified
  let currentEdition = '';
  try {
    const communityData = JSON.parse(fs.readFileSync(COMMUNITY_DATA_FILE, 'utf-8'));
    currentEdition = communityData.currentEvent?.edition || '';
  } catch (e) {
    // Ignore
  }

  const dataRows = rows.slice(1);
  const confirmedSpeakers = [];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];

    // Compute Name (First + Last or Full Name)
    let name = '';
    if (firstNameIdx !== -1 && row[firstNameIdx]) {
      name = row[firstNameIdx];
      if (lastNameIdx !== -1 && row[lastNameIdx]) {
        name += ' ' + row[lastNameIdx];
      }
    } else if (fullNameIdx !== -1 && row[fullNameIdx]) {
      name = row[fullNameIdx];
    }
    name = name.trim();
    if (!name || name.length < 2) continue;

    // Filter by Status if status column is present
    if (statusIdx !== -1) {
      const status = (row[statusIdx] || '').toLowerCase();
      const isAccepted = status.includes('accept') || status.includes('confirm') || status.includes('select') || status.includes('yes');
      if (!isAccepted) {
        console.log(`Skipping row for "${name}" (Status: "${row[statusIdx] || 'Pending'}")`);
        continue;
      }
    }

    // Filter by Event Edition if matched
    if (eventConsiderIdx !== -1 && currentEdition) {
      const eventTarget = (row[eventConsiderIdx] || '').toLowerCase();
      if (eventTarget && !currentEdition.toLowerCase().includes(eventTarget) && !eventTarget.includes(currentEdition.toLowerCase())) {
        // Targeted for another meetup, skip for current lineup
        continue;
      }
    }

    const company = orgIdx !== -1 ? row[orgIdx] : '';
    const role = designationIdx !== -1 && row[designationIdx] ? row[designationIdx] : 'Community Speaker';
    const rawHeadshot = headshotIdx !== -1 ? row[headshotIdx] : '';
    const avatar = resolveAvatarUrl(rawHeadshot);
    const linkedin = linkedinIdx !== -1 ? row[linkedinIdx] : '';
    const otherSocial = otherSocialIdx !== -1 ? row[otherSocialIdx] : '';
    const github = githubIdx !== -1 ? row[githubIdx] : '';
    const topic = sessionTitleIdx !== -1 && row[sessionTitleIdx] ? row[sessionTitleIdx] : '';
    const bio = (bioIdx !== -1 && row[bioIdx]) || (sessionDescIdx !== -1 && row[sessionDescIdx]) || '';

    // Extract Twitter if present in otherSocial
    let twitter = '';
    if (otherSocial && (otherSocial.includes('twitter.com') || otherSocial.includes('x.com') || otherSocial.startsWith('@'))) {
      twitter = otherSocial;
    }

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `speaker-${i + 1}`;

    confirmedSpeakers.push({
      id,
      name,
      role,
      ...(company ? { company } : {}),
      ...(topic ? { topic } : {}),
      ...(bio ? { bio } : {}),
      ...(avatar ? { avatar } : {}),
      socials: {
        ...(linkedin ? { linkedin } : {}),
        ...(twitter ? { twitter } : {}),
        ...(github ? { github } : {})
      },
      featured: true
    });
  }

  if (confirmedSpeakers.length === 0) {
    console.log('No confirmed/accepted speakers found for this edition. Preserving current speakers.json lineup.');
    return;
  }

  console.log(`✅ Extracted ${confirmedSpeakers.length} confirmed speakers:`, confirmedSpeakers.map(s => s.name));

  // Compare and write
  let existingSpeakers = [];
  try {
    existingSpeakers = JSON.parse(fs.readFileSync(SPEAKERS_FILE, 'utf-8'));
  } catch (e) {
    existingSpeakers = [];
  }

  const isDifferent = JSON.stringify(existingSpeakers) !== JSON.stringify(confirmedSpeakers);
  if (isDifferent) {
    fs.writeFileSync(SPEAKERS_FILE, JSON.stringify(confirmedSpeakers, null, 2) + '\n', 'utf-8');
    console.log('🎉 Successfully updated src/data/speakers.json with new lineup from Google Sheet!');
  } else {
    console.log('Lineup is already up to date in src/data/speakers.json.');
  }
}

syncSpeakersFromGoogleSheet();
