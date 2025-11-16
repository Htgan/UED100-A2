// Image gallery logic: click thumbnails or use prev/next to change the main image.

function setupGallery() {
    // Find the main image element that will display the large version.
    var mainImage = document.getElementById("gallery-main-image");

    // Find the caption element displayed under the main image.
    var mainCaption = document.getElementById("gallery-main-caption");

    // Collect all thumbnail buttons and convert the NodeList into a real array.
    var thumbButtons = Array.prototype.slice.call(
        document.querySelectorAll(".gallery-thumb")
    );

    // If any core element is missing or there are no thumbnails, do nothing.
    if (!mainImage || !mainCaption || thumbButtons.length === 0) {
        return;
    }

    // Locate the previous navigation button, if present in the DOM.
    var prevButton = document.getElementById("gallery-prev");

    // Locate the next navigation button, if present in the DOM.
    var nextButton = document.getElementById("gallery-next");

    // Track the index of the currently selected thumbnail.
    var currentIndex = getActiveIndex(thumbButtons);
    if (currentIndex === -1) {
        // If no thumbnail is marked as active, default to the first one.
        currentIndex = 0;

        // Mark the first thumbnail as active so the gallery has an initial state.
        thumbButtons[0].classList.add("is-active");
    }

    // Update the main image and caption based on a thumbnail button.
    function showImageAtIndex(index) {
        // Determine which thumbnail we are switching to.
        var button = thumbButtons[index];

        // Read the full-size image URL from the thumbnail data attributes.
        var fullSrc = button.getAttribute("data-full");

        // Read the caption text associated with this image.
        var caption = button.getAttribute("data-caption");

        // If a full-size source is available, update the main image src.
        if (fullSrc) {
            mainImage.src = fullSrc;
        }

        // If a caption is provided, update both alt text and the visible caption.
        if (caption) {
            mainImage.alt = caption;
            mainCaption.textContent = caption;
        }

        // Clear the active state from all thumbnails before setting the new one.
        thumbButtons.forEach(function(btn) {
            btn.classList.remove("is-active");
        });

        // Highlight the newly selected thumbnail.
        button.classList.add("is-active");

        // Persist the currently selected index so navigation works correctly.
        currentIndex = index;
    }

    // Set up click handlers for all thumbnails.
    thumbButtons.forEach(function(button, index) {
        // When a thumbnail is clicked, show the corresponding main image.
        button.addEventListener("click", function() {
            showImageAtIndex(index);
        });
    });

    // Previous and next buttons.
    if (prevButton) {
        // Move to the previous image, wrapping to the last image if needed.
        prevButton.addEventListener("click", function() {
            var newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = thumbButtons.length - 1;
            }
            showImageAtIndex(newIndex);
        });
    }

    if (nextButton) {
        // Move to the next image, wrapping to the first image if needed.
        nextButton.addEventListener("click", function() {
            var newIndex = currentIndex + 1;
            if (newIndex >= thumbButtons.length) {
                newIndex = 0;
            }
            showImageAtIndex(newIndex);
        });
    }

    // Optional: allow keyboard left/right to move through images when the gallery is in focus.
    document.addEventListener("keydown", function(event) {
        // Move to the previous image when the left arrow key is pressed.
        if (event.key === "ArrowLeft") {
            var prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = thumbButtons.length - 1;
            }
            showImageAtIndex(prevIndex);
        }

        // Move to the next image when the right arrow key is pressed.
        if (event.key === "ArrowRight") {
            var nextIndex = currentIndex + 1;
            if (nextIndex >= thumbButtons.length) {
                nextIndex = 0;
            }
            showImageAtIndex(nextIndex);
        }
    });
}

// Determine which thumbnail is currently marked as active.
function getActiveIndex(thumbButtons) {
    // Loop through all thumbnails and return the index of the one with the active class.
    for (var i = 0; i < thumbButtons.length; i++) {
        if (thumbButtons[i].classList.contains("is-active")) {
            return i;
        }
    }

    // If none are active, return -1 so the caller can handle the default state.
    return -1;
}