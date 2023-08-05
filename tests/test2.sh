#!/bin/sh
#
#

# post_uri="virgo.lan"
post_uri="notifications.lan"
post_data='
{
  "topic": "lan",
  "message": "Disk space is low at 5.1 GB",
  "title": "Low disk space alert",
  "tags": [
    "warning",
    "cd"
  ],
  "priority": 4,
  "attach": "https://filesrv.lan/space.jpg",
  "filename": "diskspace.jpg",
  "click": "https://notifications.lan/lan",
  "actions": [{
    "action": "view",
    "label": "Admin panel",
    "url": "https://notifications.lan/lan"
  }]
}'

curl http://"${post_uri}" -d "$post_data"

exit 0
