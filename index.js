require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

const githubData = {
  "login": "sahilgusain100",
  "id": 297959642,
  "node_id": "U_kgDOEcKA2g",
  "avatar_url": "https://avatars.githubusercontent.com/u/297959642?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/sahilgusain100",
  "html_url": "https://github.com/sahilgusain100",
  "followers_url": "https://api.github.com/users/sahilgusain100/followers",
  "following_url": "https://api.github.com/users/sahilgusain100/following{/other_user}",
  "gists_url": "https://api.github.com/users/sahilgusain100/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/sahilgusain100/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/sahilgusain100/subscriptions",
  "organizations_url": "https://api.github.com/users/sahilgusain100/orgs",
  "repos_url": "https://api.github.com/users/sahilgusain100/repos",
  "events_url": "https://api.github.com/users/sahilgusain100/events{/privacy}",
  "received_events_url": "https://api.github.com/users/sahilgusain100/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Sahil Gusain",
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": null,
  "public_repos": 2,
  "public_gists": 0,
  "followers": 0,
  "following": 0,
  "created_at": "2026-06-29T15:27:47Z",
  "updated_at": "2026-07-01T11:23:59Z"
}
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/twitter',(req,res) => {
  res.send("Sahil Gsn");
});

app.get("/login",(req,res) => {
  res.send("<h1>Please Login </h1>")
})

app.get("/youtube", (req,res) => {
  res.send("<h2>MegaBlog</h2>")
})

app.get("/github", (req,res) => {
  res.json(githubData)
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});