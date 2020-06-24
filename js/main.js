// API
const api = {
  sindonewsUrl: "https://berita-news.herokuapp.com/",
  proxyUrl: "https://cors-anywhere.herokuapp.com/",
  urlNews: "http://newsapi.org/v2/",
  urlCovidIndonesia: "https://indonesia-covid-19-api.now.sh/",
  keyNews: "b422121f5eec42f786f7420a95272b7e",
  keyNews1: "adc2048d9f684f759754fdeb64ee7242",
  keyApiFootball: "799d55db35e3fc05fd2e3518dd53ad8f824164f6c74175f9d672853639467c5e",
};

// Membuat koma setelah 3 ribuan
function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
  }
  return val;
}

// Array tanggal
const tgl = {
  days: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
  months: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
};

// Formating tanggal
function timeDateFormat(val) {
  let d = new Date(val);
  const td = {
    dt: d.getUTCDate() +
      " " +
      tgl.months[d.getUTCMonth()] +
      " " +
      d.getUTCFullYear(),
    tm: d.getUTCHours() + ":" + (d.getUTCMinutes() < 10 ? '0' : '') + d.getUTCMinutes(),
  };

  return td;
}

// Function Top News Indonesia
function topNewsId() {
  $.ajax({
    url: api.urlNews + "top-headlines?country=id&apiKey=" + api.keyNews1,
    success: function (res) {
      if ((res.status = "ok")) {
        let w = res.articles;

        $('#top-news-id-3').append(`
          <div class="col-sm-8 my-auto">
            <div class="card shadow-sm">
                  
                  <img class="w-100" src="` + w[w.length - 3].urlToImage + `" />
                  <div class="card-img-overlay d-flex overlay-dark">
                      <div class="align-self-center mx-auto text-light">
                          <a href="` + w[w.length - 3].url + `" target="_blank" class="h2 font-weight-bolder text-light"
                              id="text-title-corona">` + w[w.length - 3].title + `
                              Corona</a>
                          <br class="mb-3" />
                          <a class="mt-5">
                              <i class="fas fa-user mr-2"></i> <span >` + w[w.length - 3].author + `</span> -
                              <span ><i class="far fa-clock mr-2"></i>` + timeDateFormat(w[w.length - 3].publishedAt).dt + `</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-sm-4 my-auto">
              <div class="card mt-2 shadow-sm">
                  <img class="w-100" src="` + w[w.length - 2].urlToImage + `" />
                  <div class="card-img-overlay d-flex overlay-dark">
                      <div class="align-self-center my-auto mx-auto text-light">
                          <a href="` + w[w.length - 2].url + `" target="_blank" class="h5 font-weight-bolder text-light"
                              id="text-title-corona">` + w[w.length - 2].title + `</a>
                          <br />
                          <a class="mt-3">
                              <i class="fas fa-user mr-2"></i> <span>` + w[w.length - 2].author + `</span> -
                              <span id="time-edit-corona-news"><i class="far fa-clock mr-2"></i>` + timeDateFormat(w[w.length - 2].publishedAt).dt + `</span>
                          </a>
                      </div>
                  </div>
              </div>
              <div class="card mt-2 shadow-sm">
                  <img class="w-100" src="` + w[w.length - 1].urlToImage + `" />
                  <div class="card-img-overlay d-flex overlay-dark">
                      <div class="align-self-center mx-auto text-light">
                          <a href="` + w[w.length - 1].url + `" target="_blank" class="h5 font-weight-bolder text-light"
                              id="text-title-corona">` + w[w.length - 1].title + `</a>
                          <br />
                          <a class="mt-3">
                              <i class="fas fa-user mr-2"></i> <span id="author-corona">` + w[w.length - 1].author + `</span> -
                              <span id="time-edit-corona-news"><i class="far fa-clock mr-2"></i>` + timeDateFormat(w[w.length - 1].publishedAt).dt + `</span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          `);

        $.each(w, function (i, data) {



          $("#berita-indonesia").append(
            `
            <div class="col-md-4 mt-5 ">
              <div class="card shadow">
                <div class="inner">
                  <img class="card-img-top"
                    src="` +
            data.urlToImage +
            `"
                    alt="Card image cap" />
                  </div>
                <div class="card-body">
                  <a class="card-title h5" target="_blank" href="` +
            data.url +
            `">` +
            data.title +
            `</a>
                  <p class="card-text">
                    ` +
            data.content.substring(0, 150) +
            `...
                  </p>
                  <p class="card-text">
                      <small class="text-muted mr-2">
                      <i class="far fa-calendar-check"></i>  
                      ` +
            timeDateFormat(data.publishedAt).dt +
            `
                      </small>
                      <small class="text-muted">
                      <i class="far fa-clock"></i>
                      ` +
            timeDateFormat(data.publishedAt).tm +
            `</small>

                  </p>
                </div>
              </div>
            </div>
          `
          );
        });
      }
    },
  });
}

// Function NewsCovid
function newsCovid() {
  $.ajax({
    url: api.urlNews +
      "top-headlines?q=corona&sortBy=publishedAt&apiKey=" +
      api.keyNews,
    success: function (res) {
      $("#text-corona").after(
        `
        <!-- Berita Start -->
        <div class="row mt-3 mx-3">
          <!-- Image -->
          <div class="col-md-6">
            <img class="card-img-top"
              src="` +
        res.articles[0].urlToImage +
        `" />
          </div>

          <!-- Isi -->
          <div class="col-md-6 my-auto">
            <a class="h5 text-dark" href="` +
        res.articles[0].url +
        `">
              ` +
        res.articles[0].title +
        `
            </a>
            <p class="text-secondary">
              <small>
                <i class="fas fa-user"></i>
                ` +
        res.articles[0].author +
        `
                <span class="ml-2">
                  <i class="far fa-clock"></i>
                  ` +
        timeDateFormat(res.articles[0].publishedAt).dt +
        `
                </span>
              </small>
            </p>

            <p class="card-text">
              ` +
        res.articles[0].content.substring(0, 150) +
        `...
            </p>
          </div>
        </div>
        <!-- Berita End -->
      `
      );

      $("#image-corona").attr("src", res.articles[1].urlToImage);
      $("#text-title-corona")
        .text(res.articles[1].title)
        .attr("href", res.articles[1].url);
      $("#author-corona").text(res.articles[1].author);
      $("#time-edit-corona-news").text(timeDateFormat(
        res.articles[1].publishedAt).dt);
    },
  });
}

// Function Count Covid
function countCovidHome() {
  $.ajax({
    url: api.urlCovidIndonesia + "api",
    success: function (res) {
      $("#count-positif").text(commaSeparateNumber(res.jumlahKasus));
      $("#count-meninggal").text(commaSeparateNumber(res.meninggal));
      $("#count-sembuh").text(commaSeparateNumber(res.sembuh));
    },
  });
}

// Function Make Owl Carousel
function callOwlCarousel() {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 5,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        dots: true,
      },
      600: {
        dots: true,
        items: 3,
      },
      1000: {
        dots: true,
        items: 5,
        loop: false
      }
    }
  });
}

function sindonewsAPI() {
  $('.loading').show();
  $.ajax({
    url: api.sindonewsUrl,
    success: function (res) {
      let w = res.data;
      $('.loading').hide();
      $.each(w, function (i, data) {
        if (i < 10) {
          // var img = (data.poster == 'undifined' ? '/Image/no_image.jpg' : data.poster);

          $('.owl-carousel').append(`
            <div class="card shadow rounded-lg" style="width: 12rem;">
                  <img class="card-img-top image-carousel" src="` + data.poster + `" alt="Card image cap">
                  <div class="card-body">
                      <a target="_blank" class="card-title text-dark font-weight-bold" href="` + data.link + `">` + data.judul.substring(0, 25) + `...</a>
                      <p class="card-text"><small> ` + data.kutipan.substring(0, 50) + `...</small></p>
                  </div>
              </div>
          `);
        }


        if (i > 10) {
          return false;
        }
      });

      callOwlCarousel();

    }
  });
}

// News Business
function newsBusinessID() {
  $.ajax({
    url: api.urlNews + "top-headlines?country=id&category=business&apiKey=" + api.keyNews1,
    success: function (res) {
      let w = res.articles;

      $.each(w, function (i, data) {
        $('#row-news-id').append(`
          <div class="row mt-5 border-bottom pb-2">
              <div class="col-sm-4 my-auto">
                  <img class="w-100" src="` + data.urlToImage + `" />
              </div>
              <div class="col-sm-8 my-auto">
                  <small class="text-muted">` + timeDateFormat(data.publishedAt).dt + `</small>
                  <br/>
                  <a class="h4  text-dark" target="_blank" href="` + data.url + `">` + data.title + `</a>
                  <p>` + data.content.substring(0, 200) + `</p>
              </div>
          </div>
        `);
      });
    }
  });
}

$(document).ready(function () {
  let dt = new Date(1593005616000);
  $('.loading').hide();
  newsBusinessID();
  topNewsId();
  newsCovid();
  countCovidHome();
  sindonewsAPI();
});