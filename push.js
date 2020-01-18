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
    "endpoint": "https://fcm.googleapis.com/fcm/send/eeaGKOs2YNI:APA91bHgt_VB9CKmSMjNaWqTYm8r0VvcsjwAXRdywUDSJ3gtCVA_DrTh43eUTXO602Jrth6wjWgl6IyYK0ycJ1I34qvUkYErc2w4TRBaYmfY8Fdytq372xdpjZxgGw-NphWCU35y87SG",
    "keys": {
        "p256dh": "BNNcPE+40WoKzcw7V+qx4tNvab2od099mRXs3TQamgYJokk66zB96yxhV8Fx8Qc3A7trUtY1MMZrgMWkCE3iOYY=",
        "auth": "7P6usYDkKOK2Zv9dXtUhJQ=="
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