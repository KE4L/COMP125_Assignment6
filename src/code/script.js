let images = [];
let currentIndex = 0;
let galleryTimer = null;

function loadImageList() {
    const request = new XMLHttpRequest();
    request.open("GET", "data.txt", true);

    request.onload = function () {
        if (request.status === 200) {
            const lines = request.responseText.trim().split("\n");

            images = lines.map(function (line) {
                const parts = line.split(",");

                return {
                    fileName: parts[0].trim(),
                    displayTime: parseInt(parts[1].trim(), 10)
                };
            });

            currentIndex = 0;
            displayImage();
        } else {
            alert("Could not load data.txt");
        }
    };

    request.onerror = function () {
        alert("AJAX request failed.");
    };

    request.send();
}

function displayImage() {
    if (images.length === 0) {
        return;
    }

    const currentImage = images[currentIndex];
    const imagePath = `./src/images/${currentImage.fileName}`;

    clearTimeout(galleryTimer);

    $("#galleryImage").stop(true, true).fadeOut(500, function () {
        $(this).attr("src", imagePath).fadeIn(500);
    });

    galleryTimer = setTimeout(function () {
        showNextImage();
    }, currentImage.displayTime);
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    displayImage();
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    displayImage();
}

$(document).ready(function () {
    $("#nextBtn").click(function () {
        showNextImage();
    });

    $("#prevBtn").click(function () {
        showPreviousImage();
    });

    $("#updateBtn").click(function () {
        loadImageList();
    });

    loadImageList();
});