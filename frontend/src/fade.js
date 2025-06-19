export default {
    // When the bound element is inserted into the DOM...
    bind(el) {
      const options = {
        root: null, // use the viewport as the container
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Fade in
            el.style.opacity = 1;
          } else {
            // Fade out
            el.style.opacity = 0;
          }
        });
      }, options);
  
      observer.observe(el); // Start observing the element
  
      // Store the observer in the element for cleanup
      el.__observer__ = observer;
    },
  
    // Cleanup when the element is removed from the DOM
    unbind(el) {
      if (el.__observer__) {
        el.__observer__.disconnect();
        delete el.__observer__;
      }
    }
  };
  