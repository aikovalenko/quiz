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
            description: "<p>Представлял собой щит с железной рукавицей, надеваемой на левую руку.</p><p>К переднему концу рукавицы прикреплялся узкий клинок типа шпаги.</p><p>Тарч употреблялся лишь при обороне городов и крепостей</p>"
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
                "Also false": "0",
                "False": "0",
                "True": "1"
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
            header: "проверьте свои познания",
            about: "в военном обмундировании XVII века",
            start: "Начать",
            end: "Завершить квест",
            score: "Ваш счет",
            out: "из",
            tryAgain: "неверно, попробуйте ещё раз",
            reset: "В начало",
            next: "Следующий вопрос",
            lang: "English"
        },
        "eng": {
            header: "test your knowledge",
            about: "of the military outfit of the XVII century",
            start: "Start",
            end: "Finish",
            score: "Your score is",
            out: "out of",
            tryAgain: "wrong, try again",
            reset: "To the beginning",
            next: "Next question",
            lang: "Русский"
        }
    }
];

function interfaceRender() {
    welcome.append(
        "<div class=''>" +
            "<div class='animate animate-inside animate-js header'>" + quizStrings[0][lang].header + "</div>" +
            "<div class='animate animate-inside animate-js header--under'>" + quizStrings[0][lang].about + "</div>" +
        "</div>" +
        "<button class='animate animate-down animate-js js-quiz'>" + quizStrings[0][lang].start + "</button>"
    );
    footer.append( "<button class='reset'>" + quizStrings[0][lang].reset + "</button>" );
    footer.append( "<button class='lang'>" + quizStrings[0][lang].lang + "</button>" );

    // setTimeout(function () {
    //     $('.test').addClass('dasdasd');
    // }, 1000);
}
interfaceRender();


$(document).on('click', '.js-quiz', function () {

    var $this = $(this);

    $('.animate-js').removeClass('animate');
    $('.background').removeClass('background--animate');

    setTimeout(function () {
        $('.background').removeClass('background--intro').removeClass("background--" + i + '');
    }, 300);

    setTimeout(function () {
        welcome.hide();

        quiz.html('');


        function render() {
            quiz.append(
                "<div class='quiz-wrap'>" +
                    "<div class='question animate-top animate-js'>" + quizQuestions[i][lang].question + "</div>" +
                "</div>"
            );
            quiz.append(
                $( '<div />', { 'class': 'answers' } ).append( function() {

                    return $.map(quizQuestions[i][lang].answers, function(value, key) {
                        return $( '<button class="quiz-answer animate-inside animate-js" data-true="'+ value +'">'+ key +'</button>');
                    });

                })
            );
            quiz.append(
                "<div class='quiz-additional hide'>" +
                    "<div class='description animate-inside animate-js'>" + quizQuestions[i][lang].description + "</div>" +
                "</div>"
            );
        }

        setTimeout(function () {
            $('.quiz-answer').addClass('animate');
            $('.question').addClass('animate');
        }, 100);

        if ( i == quizQuestionsLength - 1 ) {

            render();

            quiz.append(
                "<div class='quiz-additional quiz-additional--next hide'>" +
                    "<button class='js-quiz animate-down animate-js'>" + quizStrings[0][lang].end + "</button>" +
                "</div>"
            );

            firstClick = true;
            i++;

        } else if ( i == quizQuestionsLength ) {
            quiz.append( "<div class='score'>" + quizStrings[0][lang].score + " " + score + " " + quizStrings[0][lang].out + " " + quizQuestionsLength +"</div>" );
            welcome.show();
            $('.animate-js').addClass('animate');

            setTimeout(function () {
                $('.score').remove();
            }, 5000);

            score = 0;
            i = 0;

        } else {

            render();

            quiz.append(
                "<div class='quiz-additional quiz-additional--next hide'>" +
                    "<button class='js-quiz animate-down animate-js'>" + quizStrings[0][lang].next + "</button>" +
                "</div>"
            );

            // setTimeout(function () {
            //     $('.animate-js').addClass('animate');
            // }, 100);


            firstClick = true;
            i++;
        }
    }, 500);
});


$(document).on('click', '.quiz-answer', function () {

    $('.quiz-alert').remove();

    if ($(this).attr('data-true') != 0) {

        $('.background').addClass("background--" + i + '');
        $('.quiz-answer').removeClass('animate');

        setTimeout(function () {
            $('.answers').addClass('hide');
            $('.quiz-additional').removeClass('hide');
            $('.background').addClass("background--animate");

        }, 400);
        setTimeout(function () {
            $('.description').addClass('animate');
            $('.js-quiz').addClass('animate');
        }, 600);

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

    $('.animate-js').removeClass('animate');
    $('.background').addClass('background--intro');
    setTimeout(function () {
        quiz.html('');
        welcome.show();
        $('.animate-js').addClass('animate');
        $('.background').addClass('background--animate');
    }, 400);

    score = 0;
    i = 0;
});
$(document).on('click', '.lang', function () {

    $('.animate-js').removeClass('animate');
    $('.background').addClass('background--intro');
    setTimeout(function () {
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
        $('.animate-js').removeClass('animate');
        $('.background').addClass('background--animate');

        welcome.show();

    }, 400);
    setTimeout(function () {
        $('.animate-js').addClass('animate');
    }, 600);

    score = 0;
    i = 0;

});