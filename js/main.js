const api = {
  proxyUrl: "https://cors-anywhere.herokuapp.com/",
  urlNews: "http://newsapi.org/v2/",
  urlCovidIndonesia: "https://indonesia-covid-19-api.now.sh/",
  keyNews: "b422121f5eec42f786f7420a95272b7e"
}

function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }
  return val;
}

function topNewsId() {
  $.ajax({
    url: api.urlNews + "top-headlines?country=id&apiKey=" + api.keyNews,
    success: function (res) {

      if (res.status = "ok") {

        let w = res.articles;

        $.each(w, function (i, data) {
          $('#berita-indonesia').append(`
            <div class="col-md-4 mt-5 ">
              <div class="card">
                <img class="card-img-top"
                  src="` + data.urlToImage + `"
                  alt="Card image cap" />
                <div class="card-body">
                  <a class="card-title h5" target="_blank" href="` + data.url + `">` + data.title + `</a>
                  <p class="card-text">
                    ` + data.content.substring(0, 150) + `...
                  </p>
                  <p class="card-text">
                      <small class="text-muted mr-2">
                      <i class="far fa-calendar-check"></i>  
                      ` + data.publishedAt.substring(0, 10) + `
                      </small>
                      <small class="text-muted">
                      <i class="far fa-clock"></i>
                      ` + data.publishedAt.substring(11, 16) + `</small>

                  </p>
                </div>
              </div>
            </div>
          `);



        });

      }
      // if ()
    }
  })
}

function newsCovid() {
  $.ajax({
    url: api.urlNews + "top-headlines?q=corona&sortBy=publishedAt&apiKey=" + api.keyNews,
    success: function (res) {

      $('#text-corona').after(`
        <!-- Berita Start -->
        <div class="row mt-3 mx-3">
          <!-- Image -->
          <div class="col-md-6">
            <img class="card-img-top"
              src="` + res.articles[0].urlToImage + `" />
          </div>

          <!-- Isi -->
          <div class="col-md-6 my-auto">
            <a class="h5 text-dark" href="` + res.articles[0].url + `">
              ` + res.articles[0].title + `
            </a>
            <p class="text-secondary">
              <small>
                <i class="fas fa-user"></i>
                ` + res.articles[0].author + `
                <span class="ml-2">
                  <i class="far fa-clock"></i>
                  ` + res.articles[0].publishedAt.substring(0, 10) + `
                </span>
              </small>
            </p>

            <p class="card-text">
              ` + res.articles[0].content.substring(0, 180) + `...
            </p>
          </div>
        </div>
        <!-- Berita End -->
      `);

      $('#image-corona').attr('src', res.articles[1].urlToImage);
      $('#text-title-corona').text(res.articles[1].title).attr('href', res.articles[1].url);
      $('#author-corona').text(res.articles[1].author);
      $('#time-edit-corona-news').text(res.articles[1].publishedAt.substring(0, 10));
    }
  })
}

function countCovidHome() {
  $.ajax({
    url: api.urlCovidIndonesia + "api",
    success: function (res) {
      $('#count-positif').text(commaSeparateNumber(res.jumlahKasus));
      $('#count-meninggal').text(commaSeparateNumber(res.meninggal));
      $('#count-sembuh').text(commaSeparateNumber(res.sembuh));
    }
  })
}

$(document).ready(function () {
  topNewsId();
  newsCovid();
  countCovidHome();
});