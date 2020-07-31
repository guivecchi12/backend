# backendEndpoints related to

Heroku Url:https://ptct-expat-journal-backend.herokuapp.com

Returns: {"message":"Welcome to our expat-journal-2 API!"}

/auth/register

POST request should be formatted like this:
{
"username":"journal expat",
"password":"password1"
}

    If the POST reqest is successful it will return a status code: 201 and a response body similar to this:
        {
            "id": 1,
            "username": "journal expat"
        }

/auth/login
\*The login response body will contain the token for the user.

POST request should be formatted like this:
{
"username":"journal expat",
"password":"password1"
}

    If the POST reqest is successful it will return a status code: 200 and a response body similar to this:
        {
            "username": "journal expat",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozOSwidXNlcm5hbWUiOiJqb3VybmFsIGV4cGF0IiwiaWF0IjoxNTk2MTUxODMwLCJleHAiOjE1OTYxNTU0MzB9.MM3XmXFyKbYo_fu4l_fQ2gY6dZ2OInBwdw3g7CkYw2Y"
        }

/users
\*Note: This endpoint will be restricted in the future when the app is complete.

Returns an array of objects for each user. The return looks like this:
[
{
{
"id": 1,
"username": "expat story"
},
{
"id": 2,
"username": "legs"
},
{
"id": 3,
"username": "expat"
},
}
]

/users/:id

Returns an object for the user with the id specified in the url. The return looks like this:
{
"id": 1,
"username": "expat story"
}

/users/:imgs_id/images

Returns an array of objects containing the data for each image belonging to the user specified in the url. The return looks like this:
[
{
"id":1,
"img_url":"https://unsplash.com/photos/eU4pipU_8HA",
"user_id":1
},
{
"id":2,
"img_url":"https://unsplash.com/photos/B79-r_b3sbc",
"user_id":1
}
]

POST request should be formatted like this:
{
"img_url": "https://unsplash.com/photos/pp_oXEb2H48"
}

    If the POST reqest is successful it will return a status code: 201 and a response body similar to this:
        {
            "id": 9,
            "img_url": "https://unsplash.com/photos/pp_oXEb2H48",
            "user_id": 1
        }

/users/:id/images/:imgs_id

Returns an object for the image with the id specified in the url. The return looks like this:
{
"id":1,
"img_url":"https://unsplash.com/photos/eU4pipU_8HA",
"user_id":1
}

PUT request should be formatted like this:
{
"img_url": "https://unsplash.com/photos/pp_oXEb2H48"
}

    If the PUT reqest is successful it will return a status code: 202 and a response body similar to this:
        {
            "message": "Image url has been updated to https://unsplash.com/photos/pp_oXEb2H48"
        }

DELETE request:
If the DELETE reqest is successful it will return a status code: 204

/users/:id/stories

Returns an array of objects containing the data for each story belonging to the user specified in the url. The return looks like this:
[
{
"id":1,
"story_title":"user1, story1",
"story_body":"Example story number 1 for user number 1.",
"album_id":null,
"user_id":1
},
{
"id":2,
"story_title":"user1, story2",
"story_body":"Example story number 2 for user number 1.",
"album_id":null,
"user_id":1
}
]

POST request should be formatted like this:
{
"story_title":"NEW story TITLE.",
"story_body":"NEW story BODY."
}

/users/:id/stories/:id

Returns an object for the story with the id specified in the url. The return looks like this:
{
"id":1,
"story_title":"user1, story1",
"story_body":"Example story number 1 for user number 1.",
"album_id":null,
"user_id":1
}

PUT request should be formatted like this:
{
"story_title":"UPDATED story TITLE.",
"story_body":"UPDATED story BODY."
}

    If the PUT reqest is successful it will return a status code: 202 and a response body similar to this:
        {
        "message": "Story title is now: UPDATED story TITLE., and story body is now: UPDATED story BODY.."
        }

    DELETE request:
    If the DELETE reqest is successful it will return a status code: 204

Get all images:
The format looks like this:
/images

Get all stories:
The format looks like this:
/stories
