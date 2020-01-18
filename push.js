var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BCaiQ-gUJzKyxLqt2ykSsuinKMqz84aKqyk5N1jeNBE2Rr14tIB5fWaZabjhrBChDtDlLp83e9_LKnX-Sqt9Zc0",
    "privateKey": "DJ6Ia0PEMsuuBs3LFM1Hqh7hX2bVFJZp2Ez8Xe0aOhw"
};

webPush.setVapidDetails(
    'mailto:pradipta.agha@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d8qiTYBTthM:APA91bHSCVWof_w9dcd-DHy1qUV5qS2-lmLGmv9E4DLuo_TYyqudpLMJA1SrtZiSFADwjSklWq4wODw2o3TbjxYUzRlgYagjYlSaO1h9RdqUQ4y5DI0r4o2aRI_XY24VvVc1OqKIxDNw",
    "keys": {
        "p256dh": "BCdQIL1RyvvpbFXxGuii3FXVCWqLJJsFZfqzqJPVh4ea7QemCe0fE/6qAo4q+/clCCmfVgl1uGPhWVy/pErsHlY=",
        "auth": "5wDGSfa0qHDLOZELYNmLLw=="
    }
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "731907884730",
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
).catch(function (error) {
    console.log(error);
});