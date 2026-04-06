let currentRole = "worker";

const loginForm = document.getElementById("loginForm");
const devicesSection = document.getElementById("devicesSection");
const adminPanel = document.getElementById("adminPanel");
const roleSelect = document.getElementById("role");
const deviceTable = document.getElementById("deviceTable");
const addDeviceForm = document.getElementById("addDeviceForm");

let devices = [
    { name: "Sülearvuti", serial: "ABC123", status: "Vaba", condition: "Hea" },
    { name: "Monitor", serial: "XYZ789", status: "Kasutuses", condition: "Rahuldav" }
];

// LOGIN
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    currentRole = roleSelect.value;

    devicesSection.classList.remove("hidden");
    devicesSection.classList.add("fade-in");

    if (currentRole === "admin") {
        adminPanel.classList.remove("hidden");
    }

    renderDevices();
});

// RENDER
function renderDevices() {
    deviceTable.innerHTML = "";

    devices.forEach((device, index) => {
        const row = document.createElement("tr");
        row.classList.add("fade-in");

        row.innerHTML = `
            <td>${device.name}</td>
            <td>${device.serial}</td>
            <td>${device.status}</td>
            <td>${device.condition}</td>
            <td>
                <button class="use">Kasuta</button>
                ${currentRole === "admin" ? '<button class="delete">Kustuta</button>' : ''}
            </td>
        `;

        // TOGGLE STATUS
        row.querySelector(".use").addEventListener("click", () => {
            device.status = device.status === "Vaba" ? "Kasutuses" : "Vaba";
            renderDevices();
        });

        // DELETE
        if (currentRole === "admin") {
            row.querySelector(".delete").addEventListener("click", () => {
                devices.splice(index, 1);
                renderDevices();
            });
        }

        deviceTable.appendChild(row);
    });
}

// ADD DEVICE
addDeviceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const serial = document.getElementById("serial").value;

    devices.push({
        name,
        serial,
        status: "Vaba",
        condition: "Uus"
    });

    addDeviceForm.reset();
    renderDevices();
});