var createCORSRequest = function (method, url) {
        var xhr = new XMLHttpRequest();
if ("withCredentials" in xhr) {
    // Most browsers.
    xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
    // IE8 & IE9
    xhr = new XDomainRequest();
xhr.open(method, url);
        } else {
    // CORS not supported.
    xhr = null;
        }
return xhr;
    };


function pesan() {
    var url = 'https://tools.te.net.id/cache/90192/server.php?pesan=1';
    // var url = 'http://localhost/php8/wedding/server/server.php?pesan=1';
    var method = 'GET';
    var xhr = createCORSRequest(method, url);

    xhr.onload = function () {
        let data = JSON.parse(xhr.responseText);
        // console.log(data);

        for (let i = 0; i < data.length; i++) {
            const val = JSON.parse(data[i]);
            const item = `
                <a class="list-group-item" title="${val.alamat}">
                    <div class="name"><span class="strong" style="font-size: 24px">${val.nama}</span> 
                    <span class="label ${val.kehadiran_st > 0 ? "label-success" : "label-warning"}">${val.kehadiran_st > 0 ? "Hadir" : "Tidak Hadir"}</span></div>
                    <hr style="margin-top: 0;">
                    <div class="comment">${val.pesan}</div>
                </a>
            `;

            $("#fh5co-testimonial .list-group").append(item);
        }
    };

    xhr.onerror = function () {
        alert('Gagal mengambil pesan');
    };

    xhr.send();
}

function env() {
    var url = 'https://tools.te.net.id/cache/90192/server.php?env=1';
    // var url = 'http://localhost/php8/wedding/server/server.php?env=1';
    var method = 'GET';
    var xhr = createCORSRequest(method, url);

    xhr.onload = function () {
        let env = JSON.parse(xhr.responseText);
        $('meta[name=description]').attr('content', env.title);
        $('meta[name=author]').attr('content', env.womenShort + " & " + env.menShort);
        $('title').append(env.title);
        $('.kepada').append(env.kepada);
        $('.namaPengantin').append(env.menShort + " & " + env.womenShort);

        $('.womenFull').append(env.womenFull);
        $('#womenTo').append(env.womenTo);
        $('#womenFather').append(env.womenFather);
        $('#womenMother').append(env.womenMother);

        $('.menFull').append(env.menFull);
        $('#menTo').append(env.menTo);
        $('#menFather').append(env.menFather);
        $('#menMother').append(env.menMother);
        //
        $('#akadTimeStart').append(env.akadTimeStart);
        $('#akadTimeEnd').append(env.akadTimeEnd);
        $('#akadDay').append(env.akadDay);
        $('#akadDate').append(env.akadDate);
        $('#akadAddress').append(env.akadAddress);
        $('#akadMap').attr('href', env.akadMap);

        $('#resepsiType').html(env.resepsiType);

        $('#resepsiTimeStart').append(env.resepsiTimeStart);
        $('#resepsiTimeEnd').append(env.resepsiTimeEnd);
        $('#resepsiDay').append(env.resepsiDay);
        $('#resepsiDate').append(env.resepsiDate);
        $('#resepsiAddress').append(env.resepsiAddress);
        $('#resepsiMap').attr('href', env.resepsiMap);

        $('#formUcapan').attr('action', env.formUcapan);
        $('input#nama').val(env.kepada);
    };

    xhr.onerror = function () {
        alert('Gagal mengambil env');
    };

    xhr.send();
}

function galery() {
    var url = 'https://tools.te.net.id/cache/90192/server.php?gallery=1';
    // var url = 'http://localhost/php8/wedding/server/server.php?gallery=1';
    var method = 'GET';
    var xhr = createCORSRequest(method, url);

    xhr.onload = function () {
        let data = JSON.parse(xhr.responseText);
        
        data.forEach(val => {
            const item = `
                <a data-fancybox="gallery" href="${val.src}">
                    <img src="${val.thumb}" loading="lazy" width="180" height="180" class="hover" />
                </a>
            `;

            $("#animated-thumbnails").append(item);
        });

        lightGallery(document.getElementById('animated-thumbnails-gallery'), {
            thumbnail: true,
        });

    };

    xhr.onerror = function () {
        alert('Gagal mengambil gallery');
    };

    xhr.send();
}


env();
pesan();
galery();

$(function(){
    $("#player").click(function () {
        if(this.className == 'Stop'){
            $("audio").trigger("pause");
            $(this).removeClass(this.className).addClass('Start');
            $(this).html('Start');
        } else {
            $("audio").trigger("play");
            $(this).removeClass(this.className).addClass('Stop');
            $(this).html('Stop');
        }
    });
})
