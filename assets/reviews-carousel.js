class ReviewsCarousel extends HTMLElement {
  constructor() {
    super();

    this.slider = this.querySelector('[data-reviews-track]');
    this.slides = this.querySelectorAll('[data-review-slide]');

    this.prevButton = this.querySelector('[data-prev]');
    this.nextButton = this.querySelector('[data-next]');

    this.pagination = this.querySelector('[data-pagination]');

    if (!this.slider || this.slides.length === 0) return;

    this.currentPage = 1;

    this.init();
    this.enableDrag();
    this.resizeObserver = new ResizeObserver(() => {
      this.init();
    });

    this.resizeObserver.observe(this.slider);

    this.slider.addEventListener('scroll', () => {
      this.update();
    });

    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => {
        this.previous();
      });
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => {
        this.next();
      });
    }
  }

  init() {
    this.visibleSlides = this.getVisibleSlides();

    if (this.slides.length <= this.visibleSlides) {
      return;
    }

    this.slideOffset =
      this.slides[1].offsetLeft -
      this.slides[0].offsetLeft;

    this.totalPages =
      this.slides.length -
      this.visibleSlides +
      1;

    this.buildPagination();

    this.update();
  }

  enableDrag() {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    this.slider.addEventListener('mousedown', (event) => {
        isDragging = true;
        this.slider.classList.add('is-dragging');

        startX = event.pageX;
        scrollLeft = this.slider.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        this.slider.classList.remove('is-dragging');
    });

    this.slider.addEventListener('mouseleave', () => {
        isDragging = false;
        this.slider.classList.remove('is-dragging');
    });

    this.slider.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        event.preventDefault();

        const walk = event.pageX - startX;

        this.slider.scrollLeft = scrollLeft - walk;
    });
    }

  getVisibleSlides() {
    const width = window.innerWidth;

    if (width < 750) {
      return parseInt(
        this.dataset.mobile || 1
      );
    }

    if (width < 990) {
      return parseInt(
        this.dataset.tablet || 2
      );
    }

    return parseInt(
      this.dataset.desktop || 4
    );
  }

  previous() {
    const position =
      this.slider.scrollLeft -
      this.slideOffset;

    this.scrollTo(position);
  }

  next() {
    const position =
      this.slider.scrollLeft +
      this.slideOffset;

    this.scrollTo(position);
  }

  scrollTo(position) {
    this.slider.scrollTo({
      left: position,
      behavior: 'smooth'
    });
  }

  update() {
    this.currentPage =
      Math.round(
        this.slider.scrollLeft /
          this.slideOffset
      ) + 1;

    this.updatePagination();

    if (!this.prevButton || !this.nextButton) {
      return;
    }

    if (this.currentPage <= 1) {
      this.prevButton.disabled = true;
    } else {
      this.prevButton.disabled = false;
    }

    if (
      this.currentPage >=
      this.totalPages
    ) {
      this.nextButton.disabled = true;
    } else {
      this.nextButton.disabled = false;
    }
  }

  buildPagination() {
    if (!this.pagination) return;

    this.pagination.innerHTML = '';

    for (
      let i = 1;
      i <= this.totalPages;
      i++
    ) {
      const dot =
        document.createElement('button');

      dot.className =
        'reviews-carousel__dot';

      dot.dataset.page = i;

      dot.addEventListener(
        'click',
        () => {
          this.scrollTo(
            (i - 1) *
              this.slideOffset
          );
        }
      );

      this.pagination.appendChild(dot);
    }
  }

  updatePagination() {
    if (!this.pagination) return;

    const dots =
      this.pagination.querySelectorAll(
        '.reviews-carousel__dot'
      );

    dots.forEach((dot, index) => {
      dot.classList.toggle(
        'is-active',
        index + 1 === this.currentPage
      );
    });
  }
}

customElements.define(
  'reviews-carousel',
  ReviewsCarousel
);