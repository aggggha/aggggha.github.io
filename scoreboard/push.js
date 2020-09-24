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
    "endpoint": "https://fcm.googleapis.com/fcm/send/ehLFEWVnB_8:APA91bH75hcsG-Svv5vepJQ-_h2Lfgb58-GWcb8dXvDJ9FCuWyWX-mNC1A8IYJAkLkDDusZVgUQ-yEefgP7HVnzJP2tTsly3OY9khq_XrwIsCp0XKiLvMNdV6U5XwWVvAPG3vILUs8R7",
    "keys": {
        "p256dh": "BFKy4B2usKMYiizw4lkjAc8NJ6GDUiyF/aYbaRjZ1ZoCD88lsi+vD3vuADf0o5KiQC8TfGG2xBdvpETMdjzE7SQ=",
        "auth": "ID2kgRPq8XL6iSG7x6TB3w=="
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