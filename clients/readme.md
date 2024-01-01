# Clients


### Scripts

Create a user:

```sh
baseUrl="http://pointymcpointface.xyz/"
```

Create a user:
```sh
userId=$(curl -s -H "Content-Type: application/json" -d '{"name": "Creator McTestFace"}' "$baseUrl/api/user" | jq -r '.id')
```

Create a planning session:
```sh
sessionId=$(curl -s -H "Content-Type: application/json" -d "{\"userId\": \"$userId\", \"name\": \"test\"}" "$baseUrl/api/session" | jq -r '.id')
```

Alternatively:
```sh
post_data()
{
    cat <<EOF
{
  "userId": "$userId",
  "name": "test"
}
EOF
}

sessionId=$(curl -s -H "Content-Type: application/json" -d "$(post_data)" "$baseUrl/api/session" | jq -r '.id')
```


Set the story:
```sh
curl -s -X PUT -H "Content-Type: application/json" -d '{"name": "SomeStory", "description": "Just do it!"}' "$baseUrl/api/session/$sessionId/story"
```

Join a session for a user that isn't the creator of session:
```sh
curl -X PUT -H "Content-Type: application/json" -d "{\"userId\": \"$userId2\"}" "$baseUrl/api/session/$sessionId"
```



Reveal estimates:
```sh
curl "$baseUrl/api/session/$sessionId/reveal"
```