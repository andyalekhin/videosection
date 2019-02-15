$(function() {
    'use strict';

    var data = [
        {
            img: 'https://www.ringcentral.com/content/dam/ringcentral/images/whyringcentral/casestudies/color/re-max-nexus-logo.png',
            title: 'RE/MAX Nexus',
            text: 'RE/MAX Nexus Innovates with Team Messaging and Collaboration',
            video: 'https://www.youtube.com/watch?v=7qUK9TRl02o'
        },
        {
            img: 'https://www.ringcentral.com/content/dam/ringcentral/images/whyringcentral/casestudies/color/msxi-logo.png',
            title: 'MSXI',
            text: 'A Platform for First-Class Customer Service',
            video: 'https://www.youtube.com/watch?v=Ej10mMruFP4'
        },
        {
            img: 'https://www.ringcentral.com/content/dam/ringcentral/images/whyringcentral/casestudies/brinker-page-logo.png',
            title: 'Brinker International',
            text: 'Brinker International has leveraged RingCentral platform data to help optimize the staffing at the restaurants',
            video: 'https://www.youtube.com/watch?v=ahm93twt0jU'
        },
        {
            img: 'https://www.ringcentral.com/content/dam/ringcentral/images/whyringcentral/casestudies/color/aseracare_card_logo.png',
            title: 'AseraCare',
            text: 'RingCentral Helps AseraCare Improve Customer Service Through Analytics-Driven Customer Engagement',
            video: 'https://www.youtube.com/watch?v=U6fmFoNo7WY'
        }
    ];

    renderVideoSection();
    clickVideoLink();
    popupClose();

    function renderVideoSection() {
        var $container = $('<div/>', {
            class: 'container'
        });
        var $video = $('<section/>', {
            class: 'video'
        });

        $('body').append($container);
        $container.append($video);

        data.forEach(function(item) {
            var $item = $('<div/>', {
                class: 'video__item'
            });
            var $imgWrap = $('<div/>', {
                class: 'video__img'
            });
            var $img = $('<img/>', {
                src: item.img,
                alt: item.title
            });
            var $title = $('<h2/>', {
                class: 'video__title',
                text: item.title
            });
            var $text = $('<p/>', {
                class: 'video__text',
                text: item.text
            });
            var $link = $('<a/>', {
                href: item.video,
                class: 'video__link',
                text: 'Watch video'
            });

            $video.append($item);
            $item.append($imgWrap);
            $imgWrap.append($img);
            $item.append($title);
            $item.append($text);
            $item.append($link);
        });
    }

    function clickVideoLink() {
        var scriptYoutubeInit = false;

        $(document).on('click', '.video__link', function(e) {
            e.preventDefault();

            var $link = $(this);
            var linkUrl = $(this).prop('href');

            var $popup = $('<div/>', {
                class: 'popup',
            });
            var $popupOuter = $('<div/>', {
                class: 'popup__outer',
            });
            var $popupInner = $('<div/>', {
                class: 'popup__inner',
            });
            var $popupClose = $('<button/>', {
                class: 'popup__close',
                type: 'button'
            });

            $('body').append($popup);
            $popup.append($popupOuter);
            $popupOuter.append($popupInner);
            $popupInner.append($popupClose);

            if ( !scriptYoutubeInit )  {
                getYoutubeScript();
            }

            function getYoutubeScript() {
                scriptYoutubeInit = true;

                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            function getIdFromURL(url) {
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = url.match(regExp);
            
                if (match && match[2].length == 11) {
                    return match[2];
                } else {
                    return 'error';
                }
            }

            var videoId = getIdFromURL(linkUrl);
            var $player = $('<iframe/>', {
                id: 'player',
                type: 'text/html',
                // width: '100%',
                // height: '100%',
                src: 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&enablejsapi=1&version=3&playerapiid=ytplayer',
                frameborder: 0
            });
    
            $popupInner.append($player);
        });
    }

    function popupClose() {
        $(document).on('click', '.popup__close, .popup__outer', function() {
            $('#player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            $(this).parents('.popup').remove();
        });
    }
});