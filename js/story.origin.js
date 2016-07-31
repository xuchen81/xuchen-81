$(function() {
    $('#pagination-container').pagination({
        dataSource: function(done){
            var result = [];
            for (var i = 1; i < 196; i++) {
                result.push(i);
            }
            done(result);
        },
        showGoInput: true,
        showGoButton: true,
        callback: function(data, pagination) {
            console.log("hhahahaha", pagination);
            // template method of yourself
            // var html = template(data);
            // $('#data-container').html(html);
        }
    })
});
