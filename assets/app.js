$(document).ready(function () {
    var routes = [
        {
            number: 1,
            name: "Route 1 - Main St & Santa Monica Blvd",
            start: "7:12",
            frequency: 12
        },
        {
            number: 2,
            name: "Route 2 - Wilshire Blvd",
            start: "6:32",
            frequency: 25
        },
        {
            number: 3,
            name: "Route 3 - Lincoln Blvd",
            start: "4:53",
            frequency: 20
        },
        {
            number: 4,
            name: "Rapid 3 - Lincoln Blvd",
            start: "5:35",
            frequency: 12
        },
        {
            number: 5,
            name: "Route 5 - Olympic Blvd - Century City",
            start: "6:20",
            frequency: 20
        },
        {
            number: 7,
            name: "Route 7 - Pico Blvd",
            start: "4:52",
            frequency: 15
        },
        {
            number: 6,
            name: "Rapid 7 - Pico Blvd",
            start: "7:00",
            frequency: 10
        },
        {
            number: 8,
            name: "Route 8 - UCLA Westwood & Ocean Park Blvd",
            start: "7:12",
            frequency: 12
        },
        {
            number: 9,
            name: "Route 9 - Pacific Palisades",
            start: "7:12",
            frequency: 12
        },
        {
            number: 10,
            name: "Rapid 10 - DTLA Express",
            start: "5:30",
            frequency: 15
        },
        {
            number: 12,
            name: "Rapid 12 - UCLA & Overland Ave",
            start: "5:33",
            frequency: 15
        },
        {
            number: 14,
            name: "Route 14 - Bundy Dr And Centinela Ave",
            start: "5:40",
            frequency: 20
        },
        {
            number: 15,
            name: "Route 15 - Barrington Ave",
            start: "6:44",
            frequency: 30
        },
        {
            number: 16,
            name: "Route 16 - Bundy & Wilshire to Marina Del Rey",
            start: "6:10",
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
    var database = firebase.database();

    // Push perm routes to firebase
    $(".dropdown-item").on("click", function () {
        var routeId = $(this).attr("id")
        database.ref().push({
            number: routes[routeId].number,
            name: routes[routeId].name,
            start: routes[routeId].start,
            frequency: routes[routeId].frequency
        })
    });

    // Form submit
    $("#add-line-btn").on("click", function () {

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
    //moment rubbish
    database.ref().on("child_added", function (childSnapshot) {
        var firebaseNum = childSnapshot.val().number;
        var firebaseName = childSnapshot.val().name;
        var firebaseStart = childSnapshot.val().start;
        var firebaseFreq = childSnapshot.val().frequency;

        var startTimeConverted = moment(firebaseStart, "hh:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
        var timeDiff = diffTime % firebaseFreq;
        var minutesLeft = firebaseFreq - timeDiff;
        var nextLine = moment().add(minutesLeft, "minutes");
        var catchLine = moment(nextLine).format("HH:mm");

        $("#tracker").append(
            ' <tr scope="row"><td>' + firebaseNum +
            ' </td><td>' + firebaseName +
            ' </td><td>' + firebaseFreq +
            ' </td><td>' + catchLine +
            ' </td><td>' + minutesLeft + ' </td></tr>');
        $("#line-number-input, #line-name-input, #first-depart-input, #frequency-input").val("");
        return false;
    },

        function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
});