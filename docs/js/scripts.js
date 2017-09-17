var i = 0;
var score = 0;
var firstClick = true;

$(document).on('click', '.js-quiz', function () {

    var $this = $(this);
    $this.hide();

    var quiz = $('.quiz');

    quiz.html('');


    function render() {

        quiz.append("" +
            "<div class='quiz-wrap'>" +
            "<div class='question'>" + quizQuestions[i].question + "</div>" +
            "</div>");

        quiz.append(
            $( '<div />', { 'class': 'answers' } ).append( function() {
                return $.map(quizQuestions[i].answers, function(value, key) {
                    return $( '<button class="quiz-answer" data-true="'+ value +'">'+ key +'</button>');
                });
            })
        );

        quiz.append("" +
            "<div class='quiz-additional hide'>" +
            "<div>" + quizQuestions[i].description + "</div>" +
            "</div>");
    }

    if ( i == quizQuestionsLength - 1 ) {
        render();

        quiz.append("" +
            "<div class='quiz-additional hide'>" +
            "<button class='js-quiz'>Завершить квест</button>" +
            "</div>");

        i++;

    } else if ( i == quizQuestionsLength ) {
        quiz.append( "<div class='score'>Ваш счет " + score + " из 2</div>" );
        $('.js-quiz').show();


        setTimeout(function () {
            $('.score').remove();
        }, 5000);

        score = 0;
        i = 0;

    } else {

        render();

        quiz.append("" +
            "<div class='quiz-additional hide'>" +
                "<button class='js-quiz'>Следующий вопрос</button>" +
            "</div>");


        firstClick = true;

        console.log(i, quizQuestionsLength );


        i++;
    }



});


$(document).on('click', '.quiz-answer', function () {
    console.log($(this).attr('data-true'));
    $('.quiz-alert').remove();
    if ($(this).attr('data-true') != 0) {
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
        answers: {
            "Польский меч": "0",
            "Вид ядра": "0",
            "Русский щит": "1"
        },
        description: "Описание с фактами первого вопроса"
    },
    {
        question: "Test",
        answers: {
            "wrong": "0",
            "wrong too": "0",
            "true": "1"
        },
        description: "Описание с фактами второго вопроса"
    }
];
var quizQuestionsLength = quizQuestions.length;