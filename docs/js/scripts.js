var i = 0,
    score = 0,
    firstClick = true,
    quiz = $('.quiz'),
    welcome = $('.welcome'),
    footer = $('.footer'),
    lang = $('html').attr('lang');

var quizQuestions = [
    {
        "ru": {
            question: "Тарч",
            answers: {
                "Польский меч": "0",
                "Вид ядра": "0",
                "Русский щит": "1"
            },
            description: "Описание с фактами первого вопроса"
        },
        "eng": {
            question: "Tarch",
            answers: {
                "Polish sword": "0",
                "Kind of kernel": "0",
                "Russian shield": "1"
            },
            description: "Facts of the first question"
        }
    },
    {
        "ru": {
            question: "Второй предмет",
            answers: {
                "Неверно": "0",
                "Верно": "1",
                "Тоже неверно": "0"
            },
            description: "Описание с фактами второго вопроса"
        },
        "eng": {
            question: "Second item",
            answers: {

            },
            description: "Facts of the second question"
        }
    },
    {
        "ru": {
            question: "Третий предмет",
            answers: {
                "Верно": "1",
                "Неверно": "0",
                "Тоже неверно": "0"
            },
            description: "Описание с фактами третьего вопроса"
        },
        "eng": {
            question: "Third item",
            answers: {
                "Also false": "0",
                "False": "0",
                "True": "1"
            },
            description: "Facts of the third question"
        }
    }
];
var quizQuestionsLength = quizQuestions.length;

var quizStrings = [
    {
        "ru": {
            start: "Начать",
            end: "Завершить квест",
            score: "Ваш счет",
            out: "из",
            tryAgain: "Попробуйте еще раз",
            reset: "В начало",
            next: "Следующий вопрос",
            lang: "English"
        },
        "eng": {
            start: "Start",
            end: "Finish",
            score: "Your score is",
            out: "out of",
            tryAgain: "Try again",
            reset: "To the beginning",
            next: "Next question",
            lang: "Русский"
        }
    }
];

function interfaceRender() {
    welcome.append( "<button class='js-quiz'>" + quizStrings[0][lang].start + "</button>" );
    footer.append( "<button class='reset'>" + quizStrings[0][lang].reset + "</button>" );
    footer.append( "<button class='lang'>" + quizStrings[0][lang].lang + "</button>" );

}
interfaceRender();


$(document).on('click', '.js-quiz', function () {

    var $this = $(this);
    $this.hide();

    quiz.html('');


    function render() {
        quiz.append(
            "<div class='quiz-wrap'>" +
                "<div class='question'>" + quizQuestions[i][lang].question + "</div>" +
            "</div>"
        );
        quiz.append(
            $( '<div />', { 'class': 'answers' } ).append( function() {

                return $.map(quizQuestions[i][lang].answers, function(value, key) {
                    return $( '<button class="quiz-answer" data-true="'+ value +'">'+ key +'</button>');
                });

            })
        );
        quiz.append(
            "<div class='quiz-additional hide'>" +
                "<div>" + quizQuestions[i][lang].description + "</div>" +
            "</div>"
        );
    }

    if ( i == quizQuestionsLength - 1 ) {

        render();

        quiz.append(
            "<div class='quiz-additional hide'>" +
                "<button class='js-quiz'>" + quizStrings[0][lang].end + "</button>" +
            "</div>"
        );

        firstClick = true;
        i++;

    } else if ( i == quizQuestionsLength ) {
        quiz.append( "<div class='score'>" + quizStrings[0][lang].score + " " + score + " " + quizStrings[0][lang].out + " " + quizQuestionsLength +"</div>" );
        $('.js-quiz').show();


        setTimeout(function () {
            $('.score').remove();
        }, 5000);

        score = 0;
        i = 0;

    } else {

        render();

        quiz.append(
            "<div class='quiz-additional hide'>" +
                "<button class='js-quiz'>" + quizStrings[0][lang].next + "</button>" +
            "</div>"
        );


        firstClick = true;
        i++;
    }

});


$(document).on('click', '.quiz-answer', function () {

    $('.quiz-alert').remove();

    if ($(this).attr('data-true') != 0) {

        $('.answers').addClass('hide');
        $('.quiz-additional').removeClass('hide');

        if (firstClick) {
            score++;
        }

    } else {
        quiz.append( "<div class='quiz-alert'>" + quizStrings[0][lang].tryAgain + "</div>" );
        $(this).addClass('pressed');
    }

    firstClick = false;
});

$(document).on('click', '.reset', function () {
    quiz.html('');
    $('.js-quiz').show();
    score = 0;
    i = 0;
});
$(document).on('click', '.lang', function () {

    if ($('html').attr('lang') == 'ru') {
        lang = 'eng';
    } else {
        lang = 'ru';
    }
    $('html').attr('lang', lang);

    quiz.html('');
    welcome.html('');
    footer.html('');



    interfaceRender();


    $('.js-quiz').show();

    score = 0;
    i = 0;

});