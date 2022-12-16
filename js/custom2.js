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
    var url = 'https://bayuendar.000webhostapp.com/server.php?pesan=1';
    var method = 'GET';
    var xhr = createCORSRequest(method, url);

    xhr.onload = function (data) {
        console.log(data);
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
        alert('Gagal');
    };

    xhr.send();
}

function env() {
    var url = 'https://bayuendar.000webhostapp.com/server.php?env=1';
    var method = 'GET';
    var xhr = createCORSRequest(method, url);

    xhr.onload = function (env) {
        console.log(env);
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
        alert('Gagal mengambil data.');
    };

    xhr.send();
}

pesan();

env();