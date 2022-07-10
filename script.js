$(document).ready(function () {
    let timer2 = "01:00";
    let timer;
    let interval;
    let r = 0;

    function startTimer() {
        interval = setInterval(function () {
            timer = timer2.split(':');
            let minutes = parseInt(timer[0], 10);
            let seconds = parseInt(timer[1], 10);
            --seconds;
            minutes = (seconds < 0) ? --minutes : minutes;
            seconds = (seconds < 0) ? 59 : seconds;
            seconds = (seconds < 10) ? '0' + seconds : seconds;
            $('.countdown').html('0' + minutes + ':' + seconds);
            $('.countdownBox').html('0' + minutes + ':' + seconds);
            if (minutes < 0) clearInterval(interval);
            if ((seconds <= 0) && (minutes <= 0)) clearInterval(interval);
            timer2 = minutes + ':' + seconds;
            if ($('.countdown').text() == '00:00') {
                oneMitunesTimer()
            }
        }, 1000);
    }
    function oneMitunesTimer() {
        $('.checkRes').prop("disabled", true);
        $('.boxDown').slideDown();
        $('.text').html("<span>It's a pity, but you lost</span>")
        $('.countdownBox').remove()
        $('.btnCheckBox').remove()
    }
    function start() {
        if (r === 1) {
            startTimer()
            $('.startGame').prop("disabled", true);
            $('.checkRes').prop("disabled", false);
            $('.text').html("<span>You still have time, you sure ?</span>")
            // $('.timerBox').append('<span class="countdownBox"></span>')
            $('.countdownBox').css('opacity', '1')
            $('.btnCheckBox').css('display', 'block')
        }
    }

    $(".startGame").on("click", function () {
        r++;
        start()
    });
    $('.checkRes').on('click', function () {
        $('.boxDown').slideDown();
        $('body').css({
            backgroundColor: 'gray'
        })
    })
    $('.btnCloseBox').on('click', function () {
        $('.boxDown').slideUp();
        $('body').css({
            backgroundColor: 'white'
        })
    })

    const rows = 4;
    const columns = 4;
    let box = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            box += "<div class = 'collectedBox'></div>"
        }
    }
    $(".newGame").on("click", function () {
        r = 0;
        $('.startGame').prop("disabled", false);
        $('.checkRes').prop("disabled", true);
        timer2 = "01:00";
        clearTimeout(interval)
        $('p').html("<p>01:00</p>")
        let container = $('.leftBox');
        container.append($('.box'))
        let nodes = container.children();
        for (let i = 1; i < nodes.length; i++) {
            $('.collectedBox').append()
            container.append(nodes.eq(Math.floor(Math.random() * nodes.length)));
        }
    })

    $('.rightBox').html(box)
    $('.box').draggable();
    $('.collectedBox').droppable({
        accept: '.box',
        drop: function (event, ui) {
            let draggableElem = ui.draggable;
            let droppedOn = $(this);
            r++,
                start(),
                $(draggableElem)
                    .css({
                        top: 0,
                        left: 0,
                        position: 'relative',
                    }).appendTo(droppedOn)
        }
    });
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    $('.btnCheckBox').on('click', function () {
        let user = [];
        $('.collectedBox .box').each(function (i) {
            user.push(+$('.collectedBox .box').eq(i).text())
        })
        if (JSON.stringify(user) == JSON.stringify(numbers)) {
            console.log('win')
            $('.text').html("<span>Woohoo, well done, you did it!</span>")
            clearTimeout(interval)
            $('.countdownBox').remove()
            $('.btnCheckBox').remove()
        } else {
            console.log('lost')
            clearTimeout(interval)
            $('.checkRes').prop("disabled", true);
            $('.text').html("<span style='margin-left: 100px'>It's a pity, but you lost</span>")
            $('.countdownBox').css('opacity', '0')
            $('.btnCheckBox').css('display', 'none')
        }
    })
})



