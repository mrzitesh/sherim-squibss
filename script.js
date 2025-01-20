let data = {};

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

    if (area && doctor && data[area][doctor]) {
        data[area][doctor].forEach(med => {
            let img = document.createElement("img");
            img.src = med.photo;
            img.alt = med.medicine;
            img.onclick = function() { zoomImage(med.photo); };
            let label = document.createElement("p");
            label.textContent = med.medicine;
            medicineContainer.appendChild(img);
            medicineContainer.appendChild(label);
        });
    }
}

// Zoom Image
function zoomImage(imageSrc) {
    let zoomModal = document.getElementById("zoomModal");
    let zoomedImg = document.getElementById("zoomedImg");
    zoomedImg.src = imageSrc;
    zoomModal.style.display = "flex";
}

// Close Zoom
document.getElementById("closeZoom").onclick = function() {
    let zoomModal = document.getElementById("zoomModal");
    zoomModal.style.display = "none";
}
