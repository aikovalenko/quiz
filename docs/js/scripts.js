$(document).on('click', '.js-quiz', function () {
    $(this).hide();

    var loadUrl = $(this).attr('data-load'),
        target = $(this).attr('data-target');

    callAjaxContent(loadUrl,target);
    firstClick = true;
});

$(document).on('click', '.quiz-finish', function () {

    $('.quiz').append( "<div class='score'>Ваш счет " + score + " из 2</div>" );

    setTimeout(function () {
        $('.js-quiz').show();
        $('.quiz-wrap').remove();
        $('.score').remove();
    }, 2000);

    
    score = 0;

});

var score = 0;
var firstClick = true;

$(document).on('click', '.quiz-answer', function () {
    console.log($(this).attr('data-true'));
    $('.quiz-alert').remove();
    if ($(this).attr('data-true') != undefined) {
        console.log('true');
        $('.answers').addClass('hide');
        $('.quiz-additional').removeClass('hide');

        if (firstClick) {
            score++;
        }

    } else {
        $('.quiz').append( "<div class='quiz-alert'>Поробуйте еще раз</div>" );
        $(this).addClass('pressed');
    }

    firstClick = false;
});


function callAjaxContent(loadUrl,preload) {
    var quiz = $('.quiz');
    $.get(loadUrl, function(data) {

        quiz.html(data);

    }).done(function() {
        $(preload).css('display', 'none');
    }).fail(function() {
        $(target).html('Что-то пошло не так...');
        $(preload).css('display', 'none');
    }).always(function() {

    });
}


var quizQuestions = [
    {
        question: "Тарч",
        answers: ["Польский меч","Вид ядра","Русский щит"],
        right: 2
    },
    {
        question: "Test",
        answers: ["wrong","true","wrong"],
        right: 1
    }
];