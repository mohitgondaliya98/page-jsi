$(function () {

  const $header = $('#header');
  const $footer = $('#footer');

  if ($header.length) {
    // Load header.html into #header
    $header.load('./component/header.html', function (response, status, xhr) {
      if (status === 'error') {
        console.error('Error loading header:', xhr.status, xhr.statusText);
        return;
      }

      // After header is successfully loaded
      const $toggleBtn = $('#sidebarToggler');
      // const $searchBtn = $('#searchToggler');
      // const $closeBtn = $('#closeSearch');

      if ($toggleBtn.length) {
        $toggleBtn.on('click', toggleSidebar);
      }

      // Highlight active link
      highlightActiveLink();

      // When menu button is clicked — open sidebar
      $('#toggleMenu').on('click', function (e) {
        e.preventDefault();
        $('.wrapper').addClass('show-sidebar');
      });

      // When overlay is clicked — close sidebar
      $('#OverLayer').on('click', function (e) {
        e.preventDefault();
        $('.wrapper').removeClass('show-sidebar');
      });

      // Initialize Bootstrap ScrollSpy
      const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#header'
      });

      // Refresh scrollspy if DOM changes
      $(window).on('load', function () {
        scrollSpy.refresh();
      });
    });
  }

  if ($footer.length) {
    // Load footer.html into #footer
    $footer.load('./component/footer.html', function (response, status, xhr) {
      if (status === 'error') {
        console.error('Error loading footer:', xhr.status, xhr.statusText);
        return;
      }
      // Adjust Footer
      footerAdj();

      // Scroll To Top
      $('#scrollToTop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600); // 600ms for smooth scroll
      });
    });
  }

  // Prevent Page Reload on all # links
  $("body").on("click", "a[href='#']", function (e) {
    e.preventDefault();
  });

  // Placeholder handling
  $("[placeholder]").each(function () {
    var $el = $(this);
    $el.attr("data-placeholder", $el.attr("placeholder"));

    $el.on("focus", function () {
      $el.attr("placeholder", "");
    });

    $el.on("blur", function () {
      $el.attr("placeholder", $el.data("placeholder"));
    });
  });

  // On scroll Add Class
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".wrapper").addClass("page-scrolled");
    } else {
      $(".wrapper").removeClass("page-scrolled");
    }
  });

  // Highlight Active Link
  function highlightActiveLink() {
    const current = window.location.pathname.split('/').pop();
    $('.header .nav-item').each(function () {
      const href = $(this).attr('href');
      if (href && href.indexOf(current) !== -1) {
        $(this).addClass('active');
      }
    });
  }

  // Footer margin set for stick to bottom
  function footerAdj() {
    var $footer = $(".footer");
    var $mainContent = $(".main-content");
    if ($footer.length && $mainContent.length) {
      var footerHeight = $footer.outerHeight();
      $footer.css("margin-top", -footerHeight + "px");
      $mainContent.css("padding-bottom", footerHeight + "px");
    }
  }

  if ($(".footer").length) {
    footerAdj();
    $(window).on("resize", footerAdj);
  }

  // Add/remove class when window resize finishes
  var resizeTimer;
  $(window).on("resize", function () {
    $("body").addClass("window-resizing");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      $("body").removeClass("window-resizing");
    }, 250);
  });

  // Add Class on Window Load
  $("body").addClass("page-loaded");

  // AOS initialization
  AOS.init({
    duration: 1100,
    once: true,
  });

  $("[data-aos]").each(function () {
    var $el = $(this);
    var duration = $el.attr("data-aos-duration");
    var delay = $el.attr("data-aos-delay");
    var easing = $el.attr("data-aos-easing");

    if (duration) $el.css("--aos-duration", duration + "ms");
    if (delay) $el.css("--aos-delay", delay + "ms");
    if (easing) $el.css("--aos-easing", easing);
  });

  // Convert classes like p-[16] or m-[8] to rem styles
  $("[class*='-[']").each(function () {
    var $el = $(this);
    var regex = /(p|m)([trblxy]?)-\[(\d+)\]/g;
    var base = 16; // 1rem = 16px
    var classList = $el.attr("class").split(" ");

    classList.forEach(function (cls) {
      var match = regex.exec(cls);
      if (match) {
        var px = parseFloat(match[3]);
        var rem = px / base;
        $el.css("--val", rem + "rem");
      }
      regex.lastIndex = 0;
    });
  });

  // Initialize Bootstrap Tooltips
  $('[data-bs-toggle="tooltip"]').each(function () {
    new bootstrap.Tooltip(this);
  });

});
