
$(function() {  
  // clear image list
  $('#image-list').empty();
  // clear youku video list
  $('#movie-list').empty();
  // clear fulva video list
  $('#movie-list2').empty();
});

// Image search
function searchImage(){
    var searchString = $('#imageSearchString').val();
    //alert(searchString);
    $.ajax({
        url: 'searchImage',
        data: {
            searchString: searchString
        },
        dataType : 'json',
        success: function (result) {
            $('#image-list').empty();
            ajax.parseImageJSON(result);
        },
        error: function (request, error) {
            alert('无法连接网络或者返回值错误!');
        }
    });
};

// Youku video search
function youkuVideoSearch(){
    var searchString = $('#youkuVideoSearchString').val();
    var url = 'https://openapi.youku.com/v2/searches/video/by_keyword.json?',
    mode = '&keyword=' + encodeURI(searchString),
    key = '&client_id=8f1ddae1ec473e98';

    $.ajax({
        url: url + mode + key,
        dataType: "json",
        async: true,
        success: function (result) { 
            $('#movie-list').empty();
            ajax.parseJSONP(result);
        },
        error: function (request, error) {
            alert('无法连接网络或者返回值错误!');
        }
    });
};

// Fulva video search
function fulvaVideoSearch(){
    var searchString = $('#fulvaVideoSearchString').val();
    var url = 'https://openapi.youku.com/v2/searches/video/by_keyword.json?',
    mode = '&keyword=' + encodeURI(searchString),
    key = '&client_id=8f1ddae1ec473e98';

    $.ajax({
        url: url + mode + key,
        dataType: "json",
        async: true,
        success: function (result) { 
            $('#movie-list2').empty();
            ajax.parseFulvaVideoJSONP(result);
        },
        error: function (request, error) {
            alert('无法连接网络或者返回值错误!');
        }
    });
};


var ajax = {
    parseJSONP: function (result) {
        $.each(result.videos, function (i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list').append('<li><a href="' + row.link + '" data-id="' + row.id + '"><img src="' + row.thumbnail + '"/><h5>' + row.title + '</h5></a></li>');
        });
    },
    parseImageJSON: function (result) {
        $.each(result.images.d.results, function (i, row) {
            console.log(JSON.stringify(row));
            $('#image-list').append('<li> <div class="img" style="background-image:url(' + row.MediaUrl + ');"></div> </li>');
        });
    },
    parseFulvaVideoJSONP: function (result) {
        $.each(result.videos, function (i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list2').append('<li><a href="' + row.link + '" data-id="' + row.id + '"><img src="' + row.thumbnail + '"/><h5>' + row.title + '</h5></a></li>');
        });
    },
};    