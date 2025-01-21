let data = {};
let currentImages = [];

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
        data[area][doctor].forEach(med => {
            let img = document.createElement("img");
            img.src = med.photo;
            img.alt = med.medicine;
            img.onclick = function() { openGallery(); };
            let label = document.createElement("p");
            label.textContent = med.medicine;

            medicineContainer.appendChild(img);
            medicineContainer.appendChild(label);

            // Store image sources for the zoom gallery
            currentImages.push(med.photo);
        });
    }
}

// Open Image Gallery (Zoomed View)
function openGallery() {
    let zoomModal = document.getElementById("zoomModal");
    let zoomGallery = document.getElementById("zoomGallery");
    
    // Clear previous images in the gallery
    zoomGallery.innerHTML = "";

    currentImages.forEach(src => {
        let img = document.createElement("img");
        img.src = src;
        img.classList.add("zoomed-image");
        zoomGallery.appendChild(img);
    });

    zoomModal.style.display = "flex";
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
