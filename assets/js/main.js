$(function () {
  AOS.init({ duration: 900, once: true, offset: 80 });
  new PureCounter();

  const heroSwiper = $('.heroSwiper').length ? new Swiper('.heroSwiper', {
    loop: true,
    speed: 900,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.heroSwiper .swiper-pagination', clickable: true }
  }) : null;

  let testimonialSwiper = null;

  function initTestimonialSwiper() {
    if ($('.testimonialSwiper').length) {
      testimonialSwiper = new Swiper('.testimonialSwiper', {
        loop: true,
        spaceBetween: 24,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: '.testimonialSwiper .swiper-pagination', clickable: true },
        breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }
      });
    }
  }

  function bindProjectFilter() {
    $('.filter-btn').off('click').on('click', function () {
      const filter = $(this).data('filter');
      $('.filter-btn').removeClass('active');
      $(this).addClass('active');

      $('.project-item').each(function () {
        const category = $(this).data('category');
        if (filter === 'all' || category === filter) {
          $(this).fadeIn(250);
        } else {
          $(this).fadeOut(250);
        }
      });
    });
  }

  function renderProjects(projects) {
    const grid = $('#projectGrid');
    if (!grid.length || !projects || !projects.length) return;

    const cards = projects.map((project, index) => {
      const delay = (index % 3) * 80;
      return `
        <div class="col-md-6 col-lg-4 project-item" data-category="${project.category}" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="project-card">
            <img src="${project.image}" alt="${project.title}" />
            <div class="project-overlay"><h6>${project.title}</h6><span>${project.label}</span></div>
          </div>
        </div>`;
    }).join('');

    grid.html(cards);
    AOS.refresh();
  }

  function renderTestimonials(testimonials) {
    const wrapper = $('.testimonialSwiper .swiper-wrapper');
    if (!wrapper.length || !testimonials || !testimonials.length) return;

    const slides = testimonials.map((item) => `
      <div class="swiper-slide">
        <div class="testimonial-card">
          <p>${item.quote}</p>
          <div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
          <h6>${item.name}</h6><span>${item.role}</span>
        </div>
      </div>`).join('');

    wrapper.html(slides);
  }

  $.getJSON('assets/data/site-data.json')
    .done(function (data) {
      renderProjects(data.projects);
      renderTestimonials(data.testimonials);
      if (testimonialSwiper) {
        testimonialSwiper.destroy(true, true);
      }
      initTestimonialSwiper();
      bindProjectFilter();
    })
    .fail(function () {
      initTestimonialSwiper();
      bindProjectFilter();
    });

  if (!testimonialSwiper) {
    initTestimonialSwiper();
  }

  $('.nav-link').on('click', function (e) {
    const target = $(this).attr('href');
    if (target && target.startsWith('#') && $(target).length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $(target).offset().top - 70 }, 600);
      $('.navbar-collapse').collapse('hide');
    }
  });

  bindProjectFilter();
});
