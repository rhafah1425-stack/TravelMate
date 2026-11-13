// Sign Up Function
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("signupEmail").value;
        let password = document.getElementById("signupPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        if (password.length < 6) {
            alert("Password must be at least 6 characters!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("travelUser", JSON.stringify(user));

        alert("Account created successfully!");

        window.location.href = "login.html";
    });
}


// Login Function
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let savedUser = JSON.parse(localStorage.getItem("travelUser"));

        if (savedUser && email === savedUser.email &&
            password === savedUser.password) {

            alert("Welcome back, " + savedUser.name + "!");

            window.location.href = "index.html";

        } else {
            alert("Invalid email or password!");
        }
    });
}
// Save Trip Function
const tripForm = document.getElementById("tripForm");

if (tripForm) {
    tripForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const destination = document.getElementById("destination").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const travelers = document.getElementById("travelers").value;
        const budget = document.getElementById("budget").value;

        if (new Date(endDate) < new Date(startDate)) {
            alert("End date must be after start date!");
            return;
        }

        const trip = {
            destination: destination,
            startDate: startDate,
            endDate: endDate,
            travelers: travelers,
            budget: budget
        };

        let trips = JSON.parse(localStorage.getItem("travelTrips")) || [];

        trips.push(trip);

        localStorage.setItem("travelTrips", JSON.stringify(trips));

        alert("Your trip has been saved successfully!");

        tripForm.reset();
    });
}
// Display Saved Trips
const tripsList = document.getElementById("tripsList");

if (tripsList) {

    let trips = JSON.parse(localStorage.getItem("travelTrips")) || [];

    function displayTrips() {
        tripsList.innerHTML = "";

        if (trips.length === 0) {
            tripsList.textContent = "No trips planned yet.";
            return;
        }

        trips.forEach(function(trip, index) {

            const card = document.createElement("div");
            const title = document.createElement("h3");
            const details = document.createElement("p");
            const deleteButton = document.createElement("button");

            title.textContent = trip.destination;

            details.textContent =
                "Start: " + trip.startDate +
                " | End: " + trip.endDate +
                " | Travelers: " + trip.travelers +
                " | Budget: $" + trip.budget;

            deleteButton.textContent = "Delete Trip";

            deleteButton.addEventListener("click", function() {
                trips.splice(index, 1);

                localStorage.setItem(
                    "travelTrips",
                    JSON.stringify(trips)
                );

                displayTrips();
            });

            card.appendChild(title);
            card.appendChild(details);
            card.appendChild(deleteButton);

            tripsList.appendChild(card);
        });
    }

    displayTrips();
}
