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
            question: "Куяк",
            answers: {
                "Доспехи из пластин ": "1",
                "Кулак на древнерусском": "0",
                "Название<br>птицы": "0"
            },
            description: "<p>Куяк — доспех из металлических пластин, прямоугольных или круглых, набранных каждая отдельно на кожаную или суконную основу.</p><p>Куяки изготовлялись с рукавами и без рукавов, имели полы, как кафтан. Куяк мог усиливатьсяна груди и спине большими латными досками — щитами. Такие доспехи бывали на Руси с XIII по XVII век и имели близкие аналоги в Западной Европе. Сам же термин «куяк» появился лишь в XVI веке.</p>"
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
            question: "Юшман",
            answers: {
                "Суп из баранины": "0",
                "Вид кольчуги ": "1",
                "Турецкая сабля": "0"
            },
            description: "<p>Юшман представляет собой кольчужную рубашку с вплетённым на груди и спине набором горизонтальных пластин</p>"
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
    },
    {
        "ru": {
            question: "Чалдар",
            answers: {
                "Воинское звание": "0",
                "Вид колющего оружия": "0",
                "Доспехи для коня": "1"
            },
            description: "<p>Чалдар — конские покровы, набранные из металлических блях, нашитых на сукно, закрывавшие круп, бока и грудь лошади и имевшие защитное назначение</p>"
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
    },
    {
        "ru": {
            question: "Мисюрка",
            answers: {
                "Вид бокала": "0",
                "Уменьшительно-ласкательное имя": "0",
                "Вид шлема": "1"
            },
            description: "<p>Мисюркой — железной шапкой — называлось воинское наголовье, защищавшее лишь верхнюю часть головы воина. </p><p>На Руси мисюрка известна с XIV века</p>"
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
    },
    {
        "ru": {
            question: "Тегиляй",
            answers: {
                "Род войск": "0",
                "Шапка-ушанка XVII века": "0",
                "Военный кафтан": "1"
            },
            description: "<p>На Руси мисюрка известна с XIV века</p>"
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
    },
    {
        "ru": {
            question: "Бердыш",
            answers: {
                "Воинское звание": "0",
                "Наконечник шлема": "0",
                "Холодное оружие": "1"
            },
            description: "<p>На Руси мисюрка известна с XIV века</p>"
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

}
interfaceRender();


$(document).on('click', '.js-quiz', function () {

    var $this = $(this);

    $('.animate-js').removeClass('animate');
    $('.background').removeClass('background--animate');

    setTimeout(function () {
        $('body').removeClass().addClass("question--" + Number(i+1) + '');
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
        quiz.append( "<div class='quiz-alert'><div class='quiz-alert__text'>" + quizStrings[0][lang].tryAgain + "</div></div>" );
        $(this).addClass('pressed');
    }


    firstClick = false;
});

$(document).on('click', '.reset', function () {

    $('.animate-js').removeClass('animate');
    $('.background').addClass('background--intro').removeClass("background--" + i + '');
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
    $('.background').addClass('background--intro').removeClass("background--" + i + '');
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