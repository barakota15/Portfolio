/*
 * Wedding invitation configuration
 * -------------------------------
 * Update this file to personalise the entire invitation. No other file needs
 * editing for normal content, image, colour, story, event, or form changes.
 */
const config = {
  // Couple and invitation
  brideName: 'Sarah',
  groomName: 'Hany',
  brideInitial: 'S',
  groomInitial: 'H',
  monogram: 'S & H',
  weddingDate: 'July 28, 2026',
  weddingDateTime: '2026-07-28T15:19:00',
  city: 'Giza',
  rsvpBy: 'July 1, 2026',
  heroInvitationLine: 'invite you to celebrate their engagement',
  openingKicker: 'A celebration of love',
  engagementLine: 'Are getting engaged',
  heroEyebrow: 'Together with their families',

  // Venue and map
  venueName: 'Vienna Hall - Villa Rihana',
  address: 'المريوطية طريق سقارة السياحي بعد فندق كتراكت',
  googleMapsLink: 'https://maps.app.goo.gl/h9mo5tfvxGSoLmow6',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.682249525638!2d31.1775049!3d29.959817100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584902f52ae89f%3A0x383f54fc06dc5a10!2z2qTZitmE2Kdf2LHZitit2KfZhtipIFZpbGxhX1JpaGFuYQ!5e0!3m2!1sar!2seg!4v1784032101765!5m2!1sar!2seg',

  // Remote submissions — paste the deployed Google Apps Script URL ending in /exec.
  submissionEndpoint: 'https://script.google.com/macros/s/AKfycbzizYD5-M2Pnoivi6c4pS74sd-rMM8VDee68sCmdJACnbZUpQ6u5qU8nWmEe3jXMlMX/exec',

  // Images — use hosted URLs or local paths relative to index.html
  cardImage: './src/cardImage.png',
  heroImage: './src/heroImage.png',
  guestbookImage: './src/image4.png',

  // Theme colours
  colors: {
    primaryText: '#2a221f',
    accentRed: '#6b0f1a',
    backgroundIvory: '#f8f5f0',
    gold: '#d4af37',
    envelopeText: '#3e322b',
  },

  // Our story — add, remove, or reorder moments as desired.
  story: [
    { title: 'First Meeting', date: 'Faculty of Veterinary Medicine', description: 'We first met at the Faculty of Veterinary Medicine, not knowing that day would become the beginning of our journey together.', imageUrl: './src/image1.png' },
    { title: 'The Proposal', date: 'July 7, 2026', description: 'A snowy evening filled with lights, a ring, and a promise of forever.', imageUrl: './src/image2.png' },
    { title: 'Forever Starts Here', date: 'July 28, 2026', description: 'Join us as we take the next step in our beautiful journey together.', imageUrl: './src/image3.png' },
  ],

  // Event details
  events: [
    { title: 'Ceremony', time: '7:00 PM', location: 'Vienna Hall - Villa Rihana' },
  ],
  dressCode: 'Black Tie Optional',
  note: 'Please arrive 30 minutes early.',

  isGuestbookPublic: new URLSearchParams(window.location.search).get("gusetBook") || false,
  maxGuests: 4,
  closingMessage: 'Your presence will make our celebration even more special.',
};
