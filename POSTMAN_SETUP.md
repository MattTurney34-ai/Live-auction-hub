# Postman API Collection Setup Guide

This guide provides comprehensive instructions for setting up and using the Postman API collection for the Live Auction Hub application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Importing the Collection](#importing-the-collection)
4. [Environment Setup](#environment-setup)
5. [Authentication](#authentication)
6. [Available Endpoints](#available-endpoints)
7. [Testing Workflows](#testing-workflows)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- **Postman Desktop App** or **Postman Web** account ([Download here](https://www.postman.com/downloads/))
- **Live Auction Hub** application running locally or deployed
- **API credentials** (if authentication is required)
- Basic understanding of REST APIs and HTTP methods

## Installation

### Option 1: Postman Desktop Application (Recommended)

1. Download and install Postman from [postman.com/downloads](https://www.postman.com/downloads/)
2. Launch the application
3. Sign in or create a free Postman account

### Option 2: Postman Web

1. Visit [web.postman.co](https://web.postman.co)
2. Sign in with your Postman account
3. Use the browser-based interface

## Importing the Collection

### Method 1: Import from File

1. Open Postman
2. Click **Import** in the top-left corner
3. Select the **File** tab
4. Drag and drop the `Live-Auction-Hub.postman_collection.json` file or click **Choose Files**
5. Click **Import** to complete

### Method 2: Import from Link

1. Click **Import** in Postman
2. Select the **Link** tab
3. Paste the collection URL (if available)
4. Click **Continue** and then **Import**

### Method 3: Import from Repository

1. In Postman, click **Import**
2. Select **Code repository**
3. Connect your GitHub account
4. Select the **Live-auction-hub** repository
5. Choose the collection file and import

## Environment Setup

### Creating an Environment

1. Click the **Environments** tab in the left sidebar
2. Click **Create Environment** (+ icon)
3. Name it `Live Auction Hub - Development` (or `Production`)

### Configuring Environment Variables

Add the following variables to your environment:

| Variable Name | Type | Initial Value | Current Value | Description |
|--------------|------|---------------|---------------|-------------|
| `base_url` | default | `http://localhost:3000` | `http://localhost:3000` | API base URL |
| `api_version` | default | `v1` | `v1` | API version |
| `auth_token` | secret | | | Authentication token |
| `user_id` | default | | | Current user ID |
| `auction_id` | default | | | Sample auction ID |
| `bid_amount` | default | `100` | `100` | Test bid amount |

### Example Environment Configuration

```json
{
  "name": "Live Auction Hub - Development",
  "values": [
    {
      "key": "base_url",
      "value": "http://localhost:3000",
      "type": "default",
      "enabled": true
    },
    {
      "key": "auth_token",
      "value": "",
      "type": "secret",
      "enabled": true
    }
  ]
}
```

### Activating the Environment

1. Click the environment dropdown in the top-right corner
2. Select your configured environment
3. The environment is now active for all requests

## Authentication

### Setting Up Authentication

The Live Auction Hub API likely uses one of the following authentication methods:

#### Option 1: Bearer Token Authentication

1. Obtain your authentication token by logging in or registering
2. In Postman, go to the **Authorization** tab of the collection
3. Select **Bearer Token** as the type
4. Enter your token or use `{{auth_token}}` variable
5. Save the collection

#### Option 2: API Key Authentication

1. Obtain your API key from the application
2. Add it to your environment as `api_key`
3. In the collection, set Authorization type to **API Key**
4. Configure header name and value

#### Option 3: OAuth 2.0

1. In the collection **Authorization** tab, select **OAuth 2.0**
2. Configure the OAuth settings:
   - **Grant Type**: Authorization Code
   - **Auth URL**: `{{base_url}}/oauth/authorize`
   - **Access Token URL**: `{{base_url}}/oauth/token`
   - **Client ID**: Your client ID
   - **Client Secret**: Your client secret
3. Click **Get New Access Token**
4. Follow the authentication flow

### Login Workflow

To obtain an authentication token:

1. Navigate to the **Auth** folder in the collection
2. Run the **Register User** or **Login User** request
3. Copy the `token` from the response
4. Add it to your environment's `auth_token` variable

**Example Login Request:**

```http
POST {{base_url}}/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Available Endpoints

### Authentication Endpoints

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login existing user
- **POST** `/api/auth/logout` - Logout current user
- **GET** `/api/auth/me` - Get current user profile
- **PUT** `/api/auth/profile` - Update user profile
- **POST** `/api/auth/forgot-password` - Request password reset
- **POST** `/api/auth/reset-password` - Reset password

### Auction Endpoints

- **GET** `/api/auctions` - List all auctions
- **GET** `/api/auctions/:id` - Get specific auction details
- **POST** `/api/auctions` - Create new auction (authenticated)
- **PUT** `/api/auctions/:id` - Update auction (authenticated)
- **DELETE** `/api/auctions/:id` - Delete auction (authenticated)
- **GET** `/api/auctions/active` - Get active auctions
- **GET** `/api/auctions/upcoming` - Get upcoming auctions
- **GET** `/api/auctions/completed` - Get completed auctions

### Bidding Endpoints

- **POST** `/api/auctions/:id/bids` - Place a bid on an auction
- **GET** `/api/auctions/:id/bids` - Get all bids for an auction
- **GET** `/api/bids/my-bids` - Get current user's bids
- **GET** `/api/auctions/:id/highest-bid` - Get highest bid for an auction

### WebSocket Endpoints

- **WS** `/ws/auction/:id` - Connect to live auction updates
- Real-time bid notifications
- Auction status changes
- Winner announcements

### User Endpoints

- **GET** `/api/users/:id` - Get user profile
- **GET** `/api/users/:id/auctions` - Get user's auctions
- **GET** `/api/users/:id/bids` - Get user's bid history
- **PUT** `/api/users/:id/notifications` - Update notification settings

## Testing Workflows

### Complete Testing Workflow

Follow this sequence to test the full application flow:

#### 1. User Registration and Authentication

```
1. Register User → Save token
2. Login User → Verify token works
3. Get Current User → Confirm authentication
```

#### 2. Create and Manage Auctions

```
1. Create New Auction → Save auction_id
2. Get All Auctions → Verify auction appears
3. Get Specific Auction → Check details
4. Update Auction → Modify details
```

#### 3. Bidding Flow

```
1. Get Active Auctions
2. Place Bid on Auction
3. Get Auction Bids → Verify bid recorded
4. Get My Bids → Check bid history
5. Place Higher Bid (optional)
```

#### 4. Auction Completion

```
1. Wait for auction to end (or update end time)
2. Get Completed Auctions
3. Check winner status
4. Verify final bid amounts
```

### Using Postman Tests

Add automated tests to verify responses:

**Example Test Script:**

```javascript
// Test status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test response time
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Save authentication token
if (pm.response.json().token) {
    pm.environment.set("auth_token", pm.response.json().token);
}

// Test response structure
pm.test("Response has required fields", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData).to.have.property('data');
});
```

### Collection Runner

To run all requests automatically:

1. Click the **Collections** tab
2. Hover over your collection name
3. Click the three dots (...)
4. Select **Run collection**
5. Configure iterations and delays
6. Click **Run Live Auction Hub**

## Troubleshooting

### Common Issues and Solutions

#### Issue: 401 Unauthorized Error

**Cause:** Missing or invalid authentication token

**Solutions:**
- Verify your `auth_token` is set in the environment
- Re-login to get a fresh token
- Check if the token has expired
- Ensure Authorization is inherited from collection

#### Issue: 404 Not Found Error

**Cause:** Incorrect endpoint URL or resource doesn't exist

**Solutions:**
- Verify `base_url` is correctly set
- Check the endpoint path for typos
- Ensure the resource (auction, user) exists
- Verify API version matches

#### Issue: 500 Internal Server Error

**Cause:** Server-side error or invalid request data

**Solutions:**
- Check the request body format
- Verify all required fields are included
- Check server logs for detailed error messages
- Ensure database is running and accessible

#### Issue: CORS Errors (Web Version)

**Cause:** Cross-origin request blocked by browser

**Solutions:**
- Use Postman Desktop App instead of web version
- Configure CORS on the server to allow Postman domain
- Use a browser extension to disable CORS temporarily (development only)

#### Issue: Connection Refused

**Cause:** Server is not running or wrong port

**Solutions:**
- Verify the application server is running
- Check if the port in `base_url` matches server configuration
- Test with `curl` or browser to confirm server accessibility
- Check firewall settings

### Debugging Tips

1. **Enable Postman Console**
   - View → Show Postman Console (Alt+Ctrl+C)
   - See detailed request/response logs

2. **Use Pre-request Scripts**
   - Generate dynamic data
   - Set up test prerequisites
   - Log debug information

3. **Check Network Tab**
   - View raw HTTP requests
   - Inspect headers and body
   - Verify SSL certificates

4. **Test with cURL**
   - Export request as cURL
   - Run in terminal to isolate issues
   - Compare with Postman behavior

## Advanced Features

### Pre-request Scripts

Automate setup before each request:

```javascript
// Generate timestamp
pm.environment.set("timestamp", Date.now());

// Generate random bid amount
const randomBid = Math.floor(Math.random() * 1000) + 100;
pm.environment.set("bid_amount", randomBid);

// Log environment variable
console.log("Current base URL:", pm.environment.get("base_url"));
```

### Dynamic Variables

Postman provides built-in dynamic variables:

- `{{$guid}}` - Generates a GUID
- `{{$timestamp}}` - Current timestamp
- `{{$randomInt}}` - Random integer
- `{{$randomEmail}}` - Random email address

**Example Usage:**

```json
{
  "email": "{{$randomEmail}}",
  "username": "user_{{$timestamp}}",
  "password": "Test{{$randomInt}}"
}
```

### Monitoring

Set up collection monitoring:

1. Click collection → Monitor
2. Configure schedule (hourly, daily, weekly)
3. Select environment
4. Set up notifications
5. Monitor API health and performance

## Best Practices

1. **Use Environment Variables** - Never hardcode URLs or tokens
2. **Organize Folders** - Group related endpoints
3. **Add Descriptions** - Document each request's purpose
4. **Include Examples** - Save response examples
5. **Version Control** - Export and commit collections to Git
6. **Use Tests** - Automate validation with test scripts
7. **Clean Data** - Reset test data between runs
8. **Secure Secrets** - Use secret variables for sensitive data

## Additional Resources

- [Postman Documentation](https://learning.postman.com/docs/)
- [Postman Learning Center](https://learning.postman.com/)
- [Live Auction Hub API Documentation](./API_DOCUMENTATION.md) (if available)
- [WebSocket Testing Guide](https://learning.postman.com/docs/sending-requests/websocket/)

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review server logs for detailed error messages
3. Open an issue in the GitHub repository
4. Contact the development team

---

**Last Updated:** 2025-12-22  
**Version:** 1.0.0  
**Maintained by:** MattTurney34-ai
