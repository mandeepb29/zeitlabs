$(function($) {
  "use strict";

  // Preloader
  $(window).on("load", function() {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function() {
          $(this).remove();
        });
    }
  });

  //---------------HEADER-------------//

  //for sticking the header
  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 80) {
      $(".navbar").addClass("navbar-on-scroll");
    } else {
      $(".navbar").removeClass("navbar-on-scroll");
    }
  });

  //toggle hamburger on toggle
  let hamburger = document.querySelector(".hamburger");
  let navLinks = document.querySelectorAll(".navlink");
  let links = document.querySelectorAll(".navlink a");
  let menu = document.querySelector(".menu");

  if (innerWidth <= 768) {
    $(links).on("click", function() {
      $(menu).toggleClass("menu-opened");
      $(hamburger).toggleClass("open");
      $(navLinks).toggleClass("fade");
    });
  }

  $(hamburger).on("click", function() {
    $(menu).toggleClass("menu-opened");
    $(this).toggleClass("open");
    //$(navLinks).toggleClass("fade");
    // console.log("menu-opened");
  });

  //initialize wow.js

  new WOW().init();

  // Smooth scroll for the navigation and links with .scrollto classes
  $(".navlink a, .scrollto").on("click", function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($(".navbar").length) {
          top_space = $(".navbar").outerHeight();

          if (!$(".navbar").hasClass(".navbar-on-scroll")) {
            top_space = top_space - 20;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1200,
          "easeInOutQuint"
        );

        // return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".menu");
  var main_nav_height = $(".navbar").outerHeight();

  $(window).on("scroll", function() {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find("li").removeClass("highlight");
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("highlight");
      }
    });
  });
})(jQuery);
