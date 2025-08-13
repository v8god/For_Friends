const sliderTrack = document.getElementById("sliderTrack");
const totalSlides = sliderTrack.children.length;
let currentIndex = 0;
let interval = null;
const SLIDE_INTERVAL = 5000; // 5 seconds

// Apply slide
function updateSlide() {
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}vw)`;
}

// Go to next/previous slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlide();
}
function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlide();
}

// Auto-play setup
function startAutoSlide() {
  interval = setInterval(nextSlide, SLIDE_INTERVAL);
}

function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

// Event Listeners for buttons
document.getElementById("nextBtn").addEventListener("click", () => {
  nextSlide();
  resetAutoSlide(); // reset timer after manual click
});

document.getElementById("prevBtn").addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

// Optional: Pause auto-slide on hover
document.getElementById("slider").addEventListener("mouseenter", () => {
  clearInterval(interval);
});
document.getElementById("slider").addEventListener("mouseleave", () => {
  resetAutoSlide();
});

// Init
updateSlide();
startAutoSlide();

document.addEventListener("DOMContentLoaded", function () {
  // Get all copy links
  const copyLinks = document.querySelectorAll('.copy-link');
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup-text');

  // Add click event to each link
  copyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the text to copy
      const textToCopy = this.getAttribute('data-copy');
      
      // Copy to clipboard
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show popup
        showPopup(`Copied: ${textToCopy.substring(0, 50)}${textToCopy.length > 50 ? '...' : ''}`);
      }).catch(err => {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(textToCopy);
        showPopup(`Copied: ${textToCopy.substring(0, 50)}${textToCopy.length > 50 ? '...' : ''}`);
      });
    });
  });

  // Show popup function
  function showPopup(message) {
      popupText.textContent = message;
      popup.classList.add('show');
      
      // Hide popup after 3 seconds
      setTimeout(() => {
          popup.classList.remove('show');
      }, 3000);
  }

  // Fallback function for older browsers
  function fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
          document.execCommand('copy');
      } catch (err) {
          console.error('Fallback: Could not copy text: ', err);
      }
      
      document.body.removeChild(textArea);
  }
});
