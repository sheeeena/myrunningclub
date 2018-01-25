
/* jQuery Pre loader
 -----------------------------------------------*/
$(window).load(function () {
    $('.preloader').fadeOut(1000); // set duration in brackets    
});


/* HTML document is loaded. DOM is ready. 
-------------------------------------------*/
$(document).ready(function () {

    /* template navigation
    -----------------------------------------------*/
    $('.main-navigation').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollOffset: 75, //Height of Navigation Bar
        filter: ':not(.external)',
        changeHash: true
    });

    /* Navigation visible on Scroll */
    mainNav();
    $(window).scroll(function () {
        mainNav();
    });

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.sticky-navigation').stop().animate({
            "opacity": '1',
            "top": '0'
        });
        else $('.sticky-navigation').stop().animate({
            "opacity": '0',
            "top": '-75'
        });
    }


    /* Hide mobile menu after clicking on a link
     -----------------------------------------------*/
    $('.navbar-collapse a').click(function () {
        $(".navbar-collapse").collapse('hide');
    });


    /*  smoothscroll
    ----------------------------------------------*/
    $(function () {
        $('.navbar-default a, #home a, #overview a').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 49
            }, 1000);
            event.preventDefault();
        });
    });


    /* Parallax section
       -----------------------------------------------*/
    function initParallax() {
        $('#home').parallax("100%", 0.1);
        $('#overview').parallax("100%", 0.3);
        $('#trainer').parallax("100%", 0.2);
        $('#newsletter').parallax("100%", 0.3);
        $('#blog').parallax("100%", 0.1);
        $('#price').parallax("100%", 0.2);
        $('#testimonial').parallax("100%", 0.2);

    }
    initParallax();


    /* home slider section
   -----------------------------------------------*/
    $(function () {
        jQuery(document).ready(function () {
            $('#home').backstretch([
                "images/home-bg-slider-img3.jpg",
                "images/home-bg-slider-img5.jpg",
                "images/home-bg-slider-img6.jpg",
                "images/home-bg-slider-img10.jpg",
                "images/home-bg-slider-img11.jpg",
            ], { duration: 2500, fade: 750 });
        });
    })


    /* Owl Carousel
    -----------------------------------------------*/
    $(document).ready(function () {
        $("#owl-testimonial").owlCarousel({
            autoPlay: 6000,
            items: 1,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [979, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
        });
    });


    /* wow
    -------------------------------*/
    new WOW({ mobile: false }).init();

});


$(function () {

    // on submitting the form
    $('form').submit(function (event) {
        // prevent the default action of reloading the page
        event.preventDefault();

        var sendData = {};
        $(event.target.nodeName + ' :input').each(function () {
            if (this.type === 'radio') {
                if (this.checked === true) {
                    sendData[this.name] = $(this).val();
                }
            } else {
                sendData[this.name] = $(this).val();
            }
        });

        var posting = $.ajax({
            type: 'POST',
            url: $(event.target.nodeName).prop('action'),
            data: sendData
        });

        posting.done(function (response) {
            // console.log(response);

            if ($('#alert-id').length > 0) {
                $('#alert-id').prop('hidden', false);
            }

            $('form :input').each(function () {
                $(this).val('');
            });
            
            $('#submit').attr('value', 'THANK YOU!');
        });
        posting.fail(function (response) {
            // console.log(response);
        });
    });

    // RESPONSE ALERT WINDOW-------------------------------------------------------------------------------
    /* include the following HTML to use:
    <div class="form-group">
        <button type="submit" class="btn btn-default my-btn form-control" id="submit-id">submit</button>                   
        <div class="alert alert-danger alert-dismissible fade in" hidden id="alert-id">
            <button type="button" class="close" id="close-id"><span>&times;</span></button>
            Thank you! I will get in touch.
        </div>
    </div>
    */

    // on clicking the X button
    $('#close-id').click(function () {
        // hide the alert panel by adding the hidden property
        $('#alert-id').prop('hidden', true);
        // optionally reload the webpage
        location.reload();
    });

});
