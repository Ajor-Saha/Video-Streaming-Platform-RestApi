Project Title: (Replace with your project's name)

## Description:
A versatile social media platform offering a wide range of features to connect, share, and express yourself.

User Management

Content Creation and Engagement

Playlist Management

Community Interaction

## Installation:

Prerequisites:
Node.js and npm (or yarn) installed on your system.

Steps:

Clone the repository:

git clone https://github.com/Ajor-Saha/Video-Streaming-Platform-RestApi

Use code with caution. 

cd project-directory

npm install

Set environment variables:

Create a .env file in the project root directory.Add required variables (e.g., database connection details, JWT secrets, API keys).


## Running the Application:

Start the server:

Run Command

npm run dev
## Available Endpoints:

(Replace with base URL and actual HTTP methods)

## Users:
```
/api/v1/users/register (POST) - Register a new user

```
/api/v1/users/login (POST) - Login

/api/v1/users/logout (POST) - Logout

/api/v1/users/refresh-token (POST) - Refresh access token

/api/v1/users/change-password (POST) - Change password

/api/v1/users/current-user (GET) - Get current user information

/api/v1/users/update-account (PATCH) - Update account details

/api/v1/users/avatar (PATCH) - Update avatar

/api/v1/users/cover-image (PATCH) - Update cover image

/api/v1/users/c/:username (GET) - Get user channel profile

/api/v1/users/history (GET) - Get watch history

## Videos:

/api/v1/videos (GET) - Get all videos

/api/v1/videos (POST) - Publish a video

/api/v1/videos/:videoId (GET) - Get video by ID

/api/v1/videos/:videoId (DELETE) - Delete video

/api/v1/videos/:videoId (PATCH) - Update video

## Tweets:

/api/v1/tweets (POST) - Create a tweet

/api/v1/tweets/user (GET) - Get user tweets

/api/v1/tweets/:tweetId (PATCH) - Update tweet

/api/v1/tweets/:tweetId (DELETE) - Delete tweet

## Playlists:

/api/v1/playlist (POST) - Create a playlist

/api/v1/playlist/:playlistId (GET) - Get playlist by ID

/api/v1/playlist/:playlistId (PATCH) - Update playlist

/api/v1/playlist/:playlistId (DELETE) - Delete playlist

/api/v1/playlist/add/:videoId/
:playlistId (PATCH) - Add video to playlist

/api/v1/playlist/remove/:videoId/:playlistId (PATCH) - Remove video from playlist

/api/v1/playlist/user/:userId (GET) - Get user playlists

## Comments:

/api/v1/comments/:videoId (GET) - Get video comments

/api/v1/comments/:videoId (POST) - Add a comment

/api/v1/comments/c/:commentId (DELETE) - Delete comment

/api/v1/comments/c/:commentId (PATCH) - Update comment

 ## Thanks to
 https://github.com/hiteshchoudhary

 Reference Video
 ```
 https://youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&si=l7TtdRBCFIiK66XK

 ```