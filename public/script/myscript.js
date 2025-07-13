
function slimeChange(stage) {
    const slime = document.getElementById("slime");
    slime.src = `/img/v1/ideal/${stage}.gif`;

}

function changeBG() {
    const bg = document.body.style;
    const info = document.getElementById('info').style;
    const button = document.getElementById("dayNight");
    const date = new Date();
    const time = date.getHours();

    console.log(data);

    if (time >= 5 && time < 6) {
        //Sunrise
        bg.backgroundImage = data.weather[0];
    } else if (time >= 6 && time < 12) {
        //Morniing
        bg.backgroundImage = data.weather[1];
    } else if (time >= 12 && time < 18) {
        //Afternoons
        bg.backgroundImage = data.weather[2];

    } else if (time >= 18 && time < 19) {
        //Sunset
        bg.backgroundImage = data.weather[3];
    } else if (time >= 19 || time < 5) {
        //Other
        bg.backgroundImage = data.weather[4];
        info.color = 'white';

    }
    else {
        bg.backgroundImage = 'linear-gradient(to bottom, #3C2F3F, #413C4E, #7C6E72, #B1716F, #DA8A67)';

    }
}

function move() {
    const slime = document.getElementById("slime");
    const stageBefore = slime.src;

    const indx = stageBefore.indexOf('ideal');
    const string = stageBefore.substring(indx + 6);


    slime.src = `/img/v1/emote/${string}`;


}
function ideal() {
    const slime = document.getElementById("slime");
    const stageBefore = slime.src;

    const indx = stageBefore.indexOf('emote');
    const string = stageBefore.substring(indx + 6);
    slime.src = `/img/v1/ideal/${string}`;
}


function changeBGRealtime() {
    //Check time every 30 mins
    setInterval(changeBG, 30 * 60000);
}

async function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Weather data:", data);
            })
            .catch((error) => {
                console.error("Error sending location:", error);
            });
    });
}
async function main() {
    await getLocation();
    changeBG();
    changeBGRealtime();
}

main();