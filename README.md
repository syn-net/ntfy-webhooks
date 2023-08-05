# ntfy-webhooks

This is a simple proxy that receives alert messages from [TrueNAS Scale](https://truenas.com) via the [Slack alert plugin](https://www.truenas.com/docs/scale/scaleuireference/toptoolbar/alerts/alertservicesscreen/#slack-authentication-settings) and then passes those onward to a local [ntfy](https://ntfy.sh/) server for immediate routing and display to the end-user.

TrueNAS Scale does not have an official means of developing a custom alert plugin, nor do any of the configurable alert plugins allow one to run a shell script. My best option was to use an existing plugin that accepted an incoming web-hook URL.

## Usage

```shell
git clone https://github.com/syn-net/ntfy-webhooks.git ntfy-webhooks.git
cd ntfy-webhooks.git
npm install
npm run start
```

## Reference Documents

1. <https://www.truenas.com/community/threads/creating-a-custom-alert.21269/>
1. <https://api.slack.com/messaging/webhooks#handling_errors>
