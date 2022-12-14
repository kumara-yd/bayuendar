$(function(){
    let url = "https://bayuendar.000webhostapp.com/server.php";
    // ucapan
    $.ajax({
        url:url,
        type:'GET',
        data:{
            pesan: 1
        },
        crossDomain: true,
        dataType: 'jsonp',
        success: function(data){
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
        }, 
        error: function(e){
            alert(e);
        }
    });
    // Variable env
    $.ajax({
        type: 'GET',
        data:{
            env: 1
        },
        crossDomain: true,
        dataType: 'jsonp',
        url: url,
        success: function(env){
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
            $('#akadMap').attr('href',env.akadMap);

            $('#resepsiType').html(env.resepsiType);

            $('#resepsiTimeStart').append(env.resepsiTimeStart);
            $('#resepsiTimeEnd').append(env.resepsiTimeEnd);
            $('#resepsiDay').append(env.resepsiDay);
            $('#resepsiDate').append(env.resepsiDate);
            $('#resepsiAddress').append(env.resepsiAddress);
            $('#resepsiMap').attr('href',env.resepsiMap);

            $('#formUcapan').attr('action',env.formUcapan);
            $('input#nama').val(env.kepada);

        },
        error: function(e){
            console.log(e);
            alert(e);
        }
    })
})





// // Gallery
// const lgContainer = document.getElementById('inline-gallery-container');
// const inlineGallery = lightGallery(lgContainer, {
//     container: lgContainer,
//     dynamic: true,
//     thumbnail: true,
//     // Turn off hash plugin in case if you are using it
//     // as we don't want to change the url on slide change
//     hash: false,
//     // Do not allow users to close the gallery
//     closable: false,
//     // Add maximize icon to enlarge the gallery
//     showMaximizeIcon: true,
//     download: false,
//     // Append caption inside the slide item
//     // to apply some animation for the captions (Optional)
//     appendSubHtmlTo: '.lg-item',
//     // Delay slide transition to complete captions animations
//     // before navigating to different slides (Optional)
//     // You can find caption animation demo on the captions demo page
//     slideDelay: 400,
//     dynamicEl: [],
// });

// // Since we are using dynamic mode, we need to programmatically open lightGallery
// inlineGallery.openGallery();
