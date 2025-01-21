let data = {};
let currentImages = [];
let currentIndex = 0;

// Load JSON data
fetch('doctors_medicine.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        loadAreas();
    });

// Populate Area Dropdown
function loadAreas() {
    let areaSelect = document.getElementById("areaSelect");
    Object.keys(data).forEach(area => {
        let option = document.createElement("option");
        option.value = area;
        option.textContent = area;
        areaSelect.appendChild(option);
    });
}

// Populate Doctors Based on Selected Area
function loadDoctors() {
    let area = document.getElementById("areaSelect").value;
    let doctorSelect = document.getElementById("doctorSelect");
    doctorSelect.innerHTML = "<option value=''>--Select Doctor--</option>";

    if (area && data[area]) {
        Object.keys(data[area]).forEach(doctor => {
            let option = document.createElement("option");
            option.value = doctor;
            option.textContent = doctor;
            doctorSelect.appendChild(option);
        });
    }
}

// Show Medicines & Photos Based on Selected Doctor
function loadMedicines() {
    let area = document.getElementById("areaSelect").value;
    let doctor = document.getElementById("doctorSelect").value;
    let medicineContainer = document.getElementById("medicineContainer");
    medicineContainer.innerHTML = "";
    currentImages = [];

    if (area && doctor && data[area][doctor]) {
        data[area][doctor].forEach((med, index) => {
            let img = document.createElement("img");
            img.src = med.photo;
            img.alt = med.medicine;
            img.onclick = function() { openGallery(index); };

            let label = document.createElement("p");
            label.textContent = med.medicine;

            medicineContainer.appendChild(img);
            medicineContainer.appendChild(label);

            // Store images for carousel
            currentImages.push(med.photo);
        });
    }
}

// Open Image Gallery in Carousel Format
function openGallery(index) {
    currentIndex = index;
    let zoomModal = document.getElementById("zoomModal");
    let zoomedImg = document.getElementById("zoomedImg");

    zoomedImg.src = currentImages[currentIndex];
    zoomModal.style.display = "flex";
}

// Navigate Left in Carousel
function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        document.getElementById("zoomedImg").src = currentImages[currentIndex];
    }
}

// Navigate Right in Carousel
function nextImage() {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        document.getElementById("zoomedImg").src = currentImages[currentIndex];
    }
}

// Close Zoom when clicking outside the images
document.getElementById("zoomModal").onclick = function(event) {
    if (event.target === this) {
        this.style.display = "none";
    }
};

// Close Button Functionality
document.getElementById("closeZoom").onclick = function() {
    document.getElementById("zoomModal").style.display = "none";
};
