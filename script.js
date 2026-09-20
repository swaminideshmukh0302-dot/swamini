/* =========================================
   SMART PARKING MANAGEMENT
   STACK IMPLEMENTATION
   ========================================= */

let parking = [];

const maxSlots = 5;

let operationCount = 0;


/* =========================================
   PARK VEHICLE - PUSH
   ========================================= */

function parkVehicle() {

    const input = document.getElementById("vehicleNumber");

    let vehicle = input.value.trim().toUpperCase();

    if (vehicle === "") {

        showStatus(
            "Please enter a vehicle number.",
            "error"
        );

        return;
    }


    if (parking.length >= maxSlots) {

        showStatus(
            "Parking is full! No more vehicles can enter.",
            "error"
        );

        return;
    }


    /* PUSH operation */

    parking.push(vehicle);


    input.value = "";


    showStatus(
        vehicle + " parked successfully.",
        "success"
    );


    addHistory(
        "PUSH",
        vehicle,
        "Vehicle added to stack"
    );


    displayParking();

}


/* =========================================
   REMOVE VEHICLE - POP
   ========================================= */

function removeVehicle() {

    if (parking.length === 0) {

        showStatus(
            "Parking is empty. Nothing to remove.",
            "error"
        );

        return;
    }


    /* POP operation */

    const removedVehicle = parking.pop();


    showStatus(
        removedVehicle + " removed from parking.",
        "success"
    );


    addHistory(
        "POP",
        removedVehicle,
        "Top vehicle removed"
    );


    displayParking();

}


/* =========================================
   VIEW TOP VEHICLE - PEEK
   ========================================= */

function peekVehicle() {

    if (parking.length === 0) {

        showStatus(
            "Parking is empty. No top vehicle.",
            "error"
        );

        return;
    }


    /* PEEK operation */

    const topVehicle =
        parking[parking.length - 1];


    showStatus(
        "Top Vehicle: " + topVehicle,
        "info"
    );


    addHistory(
        "PEEK",
        topVehicle,
        "Top vehicle viewed"
    );

}


/* =========================================
   DISPLAY PARKING STACK
   ========================================= */

function displayParking() {

    const area =
        document.getElementById("parkingArea");


    area.innerHTML = "";


    if (parking.length === 0) {

        area.innerHTML = `

            <div class="empty-stack">

                <i class="fa-solid fa-car-side"></i>

                <h3>No vehicles parked</h3>

                <p>Park a vehicle to start the simulation</p>

            </div>

        `;

    }


    /*
       Display from TOP to BOTTOM
       because Stack follows LIFO
    */

    for (
        let i = parking.length - 1;
        i >= 0;
        i--
    ) {

        const vehicle =
            document.createElement("div");


        vehicle.className = "vehicle";


        if (i === parking.length - 1) {

            vehicle.classList.add("top");

        }


        vehicle.innerHTML = `

            <div>

                <i class="fa-solid fa-car"></i>

                <span class="vehicle-number">
                    ${parking[i]}
                </span>

            </div>

            ${
                i === parking.length - 1
                ?
                `<span class="top-label">
                    TOP
                </span>`
                :
                `<span>
                    P${i + 1}
                </span>`
            }

        `;


        area.appendChild(vehicle);

    }


    updateCounters();

}


/* =========================================
   UPDATE COUNTERS
   ========================================= */

function updateCounters() {

    document.getElementById("occupied")
        .innerText = parking.length;


    document.getElementById("available")
        .innerText =
        maxSlots - parking.length;


    document.getElementById("stackSize")
        .innerText = parking.length;

}


/* =========================================
   CLEAR PARKING
   ========================================= */

function clearParking() {

    if (parking.length === 0) {

        showStatus(
            "Parking is already empty.",
            "info"
        );

        return;
    }


    const numberRemoved =
        parking.length;


    parking = [];


    showStatus(
        numberRemoved +
        " vehicles removed. Parking cleared.",
        "success"
    );


    addHistory(
        "CLEAR",
        "ALL",
        "Entire parking stack cleared"
    );


    displayParking();

}


/* =========================================
   STATUS MESSAGE
   ========================================= */

function showStatus(message, type) {

    const status =
        document.getElementById("status");


    let icon = "fa-circle-info";


    if (type === "success") {

        icon = "fa-circle-check";

    }


    if (type === "error") {

        icon = "fa-circle-exclamation";

    }


    status.innerHTML = `

        <i class="fa-solid ${icon}"></i>

        <span>${message}</span>

    `;

}


/* =========================================
   OPERATION HISTORY
   ========================================= */

function addHistory(
    operation,
    vehicle,
    description
) {

    operationCount++;


    document.getElementById(
        "operationCount"
    ).innerText =
        operationCount +
        (operationCount === 1
            ? " operation"
            : " operations");


    const history =
        document.getElementById("historyList");


    const empty =
        history.querySelector(".no-history");


    if (empty) {

        history.innerHTML = "";

    }


    let icon = "fa-arrow-down";

    let className = "push-history";


    if (operation === "POP") {

        icon = "fa-arrow-up";

        className = "pop-history";

    }


    if (operation === "PEEK") {

        icon = "fa-eye";

        className = "peek-history";

    }


    if (operation === "CLEAR") {

        icon = "fa-trash";

        className = "pop-history";

    }


    const time =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    const item =
        document.createElement("div");


    item.className =
        "history-item";


    item.innerHTML = `

        <div class="history-left">

            <div class="history-icon ${className}">

                <i class="fa-solid ${icon}"></i>

            </div>

            <div>

                <strong>
                    ${operation} — ${vehicle}
                </strong>

                <small>
                    ${description}
                </small>

            </div>

        </div>


        <div class="history-time">
            ${time}
        </div>

    `;


    history.prepend(item);

}


/* =========================================
   ENTER KEY SUPPORT
   ========================================= */

document
    .getElementById("vehicleNumber")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                parkVehicle();

            }

        }
    );