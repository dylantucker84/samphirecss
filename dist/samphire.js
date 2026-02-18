document.addEventListener('DOMContentLoaded', function () {
  // --------------------
  // Intersection Observer for Animate-on-Scroll
  // --------------------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        if (el.hasAttribute('data-animate-stagger')) {
          const children = el.querySelectorAll('[data-animate]');
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 100}ms`;
            child.classList.add('is-in-view');
          });
        } else {
          el.classList.add('is-in-view');
        }

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('[data-animate], [data-animate-stagger]').forEach(el => {
    observer.observe(el);
  });

  // --------------------
  // Dropdown Toggle Logic
  // --------------------
  document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const parent = this.closest('.has-dropdown');
      parent.classList.toggle('active');

      // Optional: close other open dropdowns
      document.querySelectorAll('.has-dropdown').forEach(drop => {
        if (drop !== parent) drop.classList.remove('active');
      });
    });
  });

  // Optional: close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown').forEach(drop => drop.classList.remove('active'));
    }
  });
});