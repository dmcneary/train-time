var routes = [
    {
        number: 1,
        name: "Route 1 - Main St & Santa Monica Blvd",
        start: "07:12",
        frequency: 12
    },
    {
        number: 2,
        name: "Route 2 - Wilshire Blvd",
        start: "06:32",
        frequency: 25
    },
    {
        number: 3,
        name: "Route 3 - Lincoln Blvd",
        start: "04:53",
        frequency: 20
    },
    {
        number: 4,
        name: "Rapid 3 - Lincoln Blvd",
        start: "05:35",
        frequency: 12
    },
    {
        number: 5,
        name: "Route 5 - Olympic Blvb - Century City",
        start: "06:20",
        frequency: 20
    },
    {
        number: 7,
        name: "Route 7 - Pico Blvd",
        start: "04:52",
        frequency: 15
    },
    {
        number: 6,
        name: "Rapid 7 - Pico Blvd",
        start: "07:00",
        frequency: 10
    },
    {
        number: 8,
        name: "Route 8 - UCLA Westwood & Ocean Park Blvd",
        start: "07:12",
        frequency: 12
    },
    {
        number: 9,
        name: "Route 9 - Pacific Palisades",
        start: "07:12",
        frequency: 12
    },
    {
        number: 10,
        name: "Rapid 10 - DTLA Express",
        start: "05:30",
        frequency: 15
    },
    {
        number: 12,
        name: "Rapid 12 - UCLA & Overland Ave",
        start: "05:33",
        frequency: 15
    },
    {
        number: 14,
        name: "Route 14 - Bundy Dr And Centinela Ave",
        start: "05:40",
        frequency: 20
    },
    {
        number: 15,
        name: "Route 15 - Barrington Ave",
        start: "06:44",
        frequency: 30
    },
    {
        number: 16,
        name: "Route 16 - Bundy & Wilshire to Marina Del Rey",
        start: "06:10",
        frequency: 30
    }
]

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAxVdc9Xp_KLQYgbVQIHp9lWIagAqGlndw",
    authDomain: "example-app-ecc60.firebaseapp.com",
    databaseURL: "https://example-app-ecc60.firebaseio.com",
    projectId: "example-app-ecc60",
};
firebase.initializeApp(config);
let database = firebase.database();

database.ref().set({
    number: 0,
    name: "",
    start: "",
    frequency: 0
})

// Push perm routes to firebase
for (let i = 0; i < routes.length; i++) {
    database.ref().push({
        number: routes[i].number,
        name: routes[i].name,
        start: routes[i].start,
        frequency: routes[i].frequency
    })
}

// Form submit
$("#add-line-btn").on("click", function () {
    event.preventDefault();

    var lineNumber = $("#line-number-input").val().trim();
    var lineName = $("#line-name-input").val().trim();
    var firstDepart = $("#first-depart-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    database.ref().push({
        number: lineNumber,
        name: lineName,
        start: firstDepart,
        frequency: frequency
    });
});

/* TO DO:
add moment logic
fill in tracker - child added for form submissions and initial population by objects above, but only visible on click from dropdown (good luck! change display class on click?) */
