# Live Video Streaming Setup

## Overview
This app now includes live video streaming functionality using Twilio Video. The implementation includes:

- **VideoStream Component**: Connects to Twilio Video rooms
- **Picture-in-Picture (PiP)**: Watch auctions while browsing
- **Seller Controls**: Go live and end stream buttons
- **Edge Function**: Generates secure Twilio access tokens

## Installation Required

To enable full video functionality, install the Twilio Video SDK:

```bash
npm install twilio-video
# or for React Native
npm install @twilio/video-react-native-sdk
```

## Features Implemented

### 1. Video Streaming
- Replace static images with live video streams
- Automatic connection to Twilio Video rooms
- Loading and error states

### 2. Picture-in-Picture Mode
- Floating video window while browsing
- Tap to expand back to full view
- Close button to dismiss
- Positioned above bottom navigation

### 3. Seller Controls
- "Go Live" button to start streaming
- "End Stream" button to stop
- Live viewer count display
- Confirmation dialogs

### 4. Token Generation
- Secure server-side token generation via Supabase Edge Function
- Uses Twilio credentials from environment variables
- JWT-based authentication

## How It Works

1. **Auction Detail Page**: Shows VideoStream component when live
2. **PiP Button**: Appears in header when stream is active
3. **Context Management**: Global PiP state via React Context
4. **Edge Function**: `/create-video-token` generates access tokens

## Testing

To test as a seller, change `isSeller` to `true` in `app/auction/[id].tsx` line 22.

## Environment Variables

The following Twilio secrets are already configured:
- TWILIO_ACCOUNT_SID
- TWILIO_API_KEY
- TWILIO_API_SECRET
