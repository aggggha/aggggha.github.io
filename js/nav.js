document.addEventListener("DOMContentLoaded", function () {
    // Load page content
    var page = window.location.hash.substr(1);

    if (page == "") {
        page = "home";
    }
    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        var elemsLoading = document.getElementById("loadingProgress");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 1) {
                elemsLoading.style.display = "block";
                document.getElementById("body-content").classList.remove("animate");
            } else if (this.readyState == 4) {
                var content = document.querySelector("#body-content");

                if (page === "home") {
                    getKlasemenLiga();
                    getMatchSchedule();
                } else if (page === "match") {
                    getMatchSchedule();
                } else if (page === "saved") {
                    getSavedMatch();
                }

                if (this.status == 200) {
                    document.getElementById("body-content").classList.add("animate");
                    content.innerHTML = xhttp.responseText;
                    elemsLoading.style.display = "none";
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

    // Activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
});
