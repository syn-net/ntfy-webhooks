#!/bin/sh
#
#

headers="Content-Type: application/json"

# post_data='{"text": "Hello, there"}'
post_data='{"text": "Hello, there!","channel": "#fs1", "icon_emoji": "ghost", "username": "i8degrees+fs1@gmail.com"}'

http_method="POST"
test_url="http://virgo.lan/messages"

curl -H "$headers" -X "$http_method" \
  -d "$post_data" \
$test_url

exit 0
