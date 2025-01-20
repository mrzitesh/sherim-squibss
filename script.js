// Example data for areas, doctors, and medicines
const data = {
    "Nagaur": {
        "Dr. Sharma": ["Medicine 1", "Medicine 2", "Medicine 3"],
        "Dr. Verma": ["Medicine 4", "Medicine 5"]
    },
    "Merta City": {
        "Dr. Kapoor": ["Medicine 6", "Medicine 7"],
        "Dr. Jain": ["Medicine 8", "Medicine 9", "Medicine 10"]
    },
    // Add more areas and doctors as needed
};

// Default company selection
const companySelect = document.getElementById("companySelect");
companySelect.value = "Sherim Squibss"; // Set default company

// Get the area and doctor select elements
const areaSelect = document.getElementById("areaSelect");
const doctorSelect = document.getElementById("doctorSelect");
const medicineContainer = document.getElementById("medicineContainer");

// Function to load areas dynamically
function loadAreas() {
    const areas = Object.keys(data);
    areas.forEach(area => {
        const option = document.createElement("option");
        option.value = area;
        option.textContent = area;
        areaSelect.appendChild(option);
    });
}

// Function to load doctors based on the selected area
function loadDoctors() {
    const selectedArea = areaSelect.value;
    doctorSelect.innerHTML = "<option value=''>--Select Doctor--</option>"; // Reset doctors list
    if (selectedArea) {
        const doctors = Object.keys(data[selectedArea]);
        doctors.forEach(doctor => {
            const option = document.createElement("option");
            option.value = doctor;
            option.textContent = doctor;
            doctorSelect.appendChild(option);
        });
    }
}

// Function to load medicines based on the selected doctor
function loadMedicines() {
    const selectedArea = areaSelect.value;
    const selectedDoctor = doctorSelect.value;
    medicineContainer.innerHTML = ""; // Clear existing medicines

    if (selectedArea && selectedDoctor) {
        const medicines = data[selectedArea][selectedDoctor];
        medicines.forEach(medicine => {
            const img = document.createElement("img");
            img.src = `https://via.placeholder.com/100?text=${medicine}`; // Placeholder for medicine image
            img.alt = medicine;
            img.addEventListener("click", function() {
                openZoom(img.src);
            });
            medicineContainer.appendChild(img);
        });
    }
}

// Zoom Modal functionality
const zoomModal = document.getElementById("zoomModal");
const zoomedImg = document.getElementById("zoomedImg");
const closeZoom = document.getElementById("closeZoom");

// Open zoom modal when an image is clicked
function openZoom(imgSrc) {
    zoomedImg.src = imgSrc;
    zoomModal.style.display = "flex"; // Show the modal
}

// Close zoom modal when the close button is clicked
closeZoom.addEventListener("click", function() {
    zoomModal.style.display = "none"; // Hide the modal
});

// Close zoom modal when clicking outside of the image
zoomModal.addEventListener("click", function(event) {
    if (event.target === zoomModal) { // Check if the click is outside the image
        zoomModal.style.display = "none"; // Hide the modal
    }
});

// Load the areas when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    loadAreas();
});
