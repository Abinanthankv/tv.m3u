var player = videojs("myVideo", {
  playbackRates: [0.5, 1, 1.5, 2], // Optional playback rate options
});

player.hlsQualitySelector({
  displayCurrentQuality: true,

  default: "highest",
});

const channelList = document.getElementById("channel-list");

const channelName = document.getElementById("channel-name");

const channelLogo = document.getElementById("channel-logo");

const myVideo = document.getElementById("myVideo");

const filterLanguage = document.getElementById("language-filter");

const filterCategory = document.getElementById("channel-filter");

var activeChannel = "";

// Replace 'your_data.json' with the actual path to your JSON file

fetch("./streams.json")
  .then((response) => response.json())

  .then((data) => {
    // Extract unique groups (languages) and categories from your JSON data

    const uniqueGroups = [...new Set(data.map((item) => item.language))];

    const uniqueCategories = [...new Set(data.map((item) => item.category))];

    // Populate the filter select element with group (language) and category options

    uniqueGroups.forEach((language) => {
      const option = document.createElement("option");

      option.value = language;

      option.text = language;

      filterLanguage.appendChild(option);
    });

    uniqueCategories.forEach((category) => {
      const option = document.createElement("option");

      option.value = category;

      option.text = category;

      filterCategory.appendChild(option);
    });

    filterCategory.parentElement.appendChild(filterLanguage);

    filterCategory.addEventListener("change", () => {
      const selectedGroup = filterLanguage.value;

      const selectedCategory = filterCategory.value;

      let filteredData;

      // Filter data based on selected group (language) and category

      if (selectedGroup === "all" && selectedCategory === "all") {
        filteredData = data;
      } else if (selectedGroup === "all") {
        filteredData = data.filter(
          (item) => item.category === selectedCategory
        );
      } else if (selectedCategory === "all") {
        filteredData = data.filter((item) => item.language === selectedGroup);
      } else {
        filteredData = data.filter(
          (item) =>
            item.language === selectedGroup &&
            item.category === selectedCategory
        );
      }

      filtereditemlist(filteredData);
    });

    filterLanguage.addEventListener("change", () => {
      const selectedGroup = filterLanguage.value;

      const selectedCategory = filterCategory.value;

      let filteredData;

      // Filter data based on selected group (language) and category

      if (selectedGroup === "all" && selectedCategory === "all") {
        filteredData = data;
      } else if (selectedGroup === "all") {
        filteredData = data.filter(
          (item) => item.category === selectedCategory
        );
      } else if (selectedCategory === "all") {
        filteredData = data.filter((item) => item.language === selectedGroup);
      } else {
        filteredData = data.filter(
          (item) =>
            item.language === selectedGroup &&
            item.category === selectedCategory
        );
      }

      filtereditemlist(filteredData);
    });

    function filtereditemlist(filteredData) {
      // Clear existing channel list and repopulate with filtered data

      channelList.innerHTML = "";

      for (const item of filteredData) {
        //  const logoImg = document.createElement("img");

        const listItem = document.createElement("li");

        // logoImg.src = item.logo;

        listItem.textContent = item.name;

        listItem.insertAdjacentHTML("beforeend", `<img src="${item.logo}">`);

        listItem.addEventListener("mouseenter", () => {
          // Mute the main player

          // player.muted(true);

          // Set a temporary source for preview

          // channelName.textContent = item.name;

          var channelData = getChannelDataById(item.epgid);

          channelLogo.src = item.logo;

          channelName.textContent = item.name;

          //  player .src({

          //    src: `https://fifaxbd.fun/JIOxRANAPK/stream.m3u8?id=${item.id}&e=.m3u8`,

          //   type: "application/x-mpegURL",

          // });

          // Play the preview at a muted and slower playback rate

          // player .playbackRate(1);

          // player .load();

          // player .play();
        });

        listItem.addEventListener("mouseleave", () => {
          // Unmute the main player

          // player.muted(false);

          // Reset the preview source and playback state

          //player.pause();

          channelLogo.src = activeChannel.logo;

          channelName.textContent = activeChannel.name;

          var channelData = getChannelDataById(activeChannel.epgid);
        });

        listItem.addEventListener("click", () => {
          for (const channelItem of channelList.children) {
            channelItem.style.backgroundColor = "";
          }

          listItem.style.backgroundColor = "lightgreen";

          // to change css style

          var channelData = getChannelDataById(item.epgid);

          activeChannel = item;

          console.log(activeChannel);

          channelName.textContent = item.name;

          channelLogo.src = item.logo;

          if (item.id != null) {
            player.pause();

            player.src({
              src: `https://fifaxbd.fun/JIOxRANAPK/stream.m3u8?id=${item.id}&e=.m3u8`,

              type: "application/x-mpegURL",

              suggestedQuality: "hd",
            });

            player.load();

            player.play();
          }
        });

        channelList.appendChild(listItem);
      }
    }
  });

// });

function getChannelDataById(channelId) {
  var currentPlayingProgram = "";

  var currentPlayingPrograminfo = ""; // Initialize variable to store current program

  var upcomingProgram = "";

  var upcomingPrograminfo = "";

  var programLimit = 1;

  const currentPlaying = document.getElementById("current-playing");

  const currentPlayinginfo = document.getElementById("current-playing-info");

  const upcomingPlaying = document.getElementById("upcoming-playing"); // Add element for upcoming info (optional)

  const upcomingPlayinginfo = document.getElementById("upcoming-playing-info"); // Add element for upcoming info (optional)

  var currentTime = getTimeshiftedCurrentTime(19800);

  currentPlaying.innerHTML = "";

  currentPlayinginfo.innerHTML = "";

  upcomingPlaying.innerHTML = ""; // Clear upcoming info if displayed (optional)

  upcomingPlayinginfo.innerHTML = ""; // Clear upcoming info if displayed (optional)

  //currentPlaying.textContent= "Now Playing "

  fetch("./prod.json")
    .then((response) => response.json())

    .then((data) => {
      let foundCurrentProgram = false;

      for (var i = 0; i < data.length; i++) {
        var channel = data[i];

        const startTime = channel.start_time;

        const stopTime = channel.stop_time;

        const title = channel.title;

        const description = channel.description;

        const channelName = channel.name;

        //now playing data

        if (startTime < currentTime && currentTime < stopTime) {
          // Store the title of the current program

          if (channelName === channelId) {
            currentPlayingProgram = title;

            currentPlayingPrograminfo = description;

            currentPlaying.textContent =
              "Now Playing: " + currentPlayingProgram;

            currentPlayinginfo.textContent =
              "Information->" + currentPlayingPrograminfo;

            // foundCurrentProgram = true;
          }

          // Stop iterating after finding the current program
        } else if (startTime > currentTime && programLimit > 0) {
          //  const upcomingStartTime = new Date(startTime * 1000);

          //   console.log("upcomingStartTime",upcomingStartTime );

          //  const upcomingStartHour = upcomingStartTime.getHours().toString().padStart(2, "0");

          // const upcomingStartMinute = upcomingStartTime.getMinutes().toString().padStart(2, "0");

          //  const upcomingFormattedTime = `${upcomingStartHour}:${upcomingStartMinute}`;

          // 11320 +19800+ 11320+ 13000;

          //   const timeString=stopTime.toString();

          //  const upcomingFormattedstartTime = convertTimeToHHMM(startTime.toString(), 20820);
          //  const upcomingFormattedstopTime = convertTimeToHHMM(stopTime.toString(), 20820);
          //  console.log("upcomingFormattedstartTime",upcomingFormattedstartTime );
          //  console.log("upcomingFormattedstopTime ",upcomingFormattedstopTime );

          // Upcoming program (within limit)

          if (channelName === channelId) {
            upcomingProgram = title;

            upcomingPrograminfo = description;

            upcomingPlaying.textContent = `Upcoming:  - ${upcomingProgram}`; // Display upcoming info if elements added (optional)

            upcomingPlayinginfo.textContent =
              "Information->" + upcomingPrograminfo; // Display upcoming info if elements added (optional)

            programLimit--;
          }
        }

        if (foundCurrentProgram) {
          break;
        }
      }
    });

  return {
    currentPlayingProgram,
    currentPlayingPrograminfo,
    upcomingProgram,
    upcomingPrograminfo,
  };
}

function convertTimeToHHMM(timeString, timeshiftSeconds) {
  // Check if the time string is a valid number

  if (isNaN(timeString)) {
    console.error("Invalid time string provided:", timeString);

    return "Invalid Time";
  }

  // Extract year, month, day, hour, minute from the string

  const year = timeString.slice(0, 4);

  const month = timeString.slice(4, 6) - 1; // Months are 0-indexed

  const day = timeString.slice(6, 8);

  const hour = timeString.slice(8, 10);

  const minute = timeString.slice(10, 12);

  // Apply timeshift in seconds

  const timeshiftedTime = new Date(
    parseInt(timeString) + timeshiftSeconds * 1000
  );

  // Format the hours and minutes with leading zeros (HH:MM)

  const formattedHours = timeshiftedTime.getHours().toString().padStart(2, "0");

  const formattedMinutes = timeshiftedTime
    .getMinutes()
    .toString()
    .padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

// Example usage

function generatesonychannel(channelName) {
  // Remove unnecessary characters and spaces for a cleaner format

  const sanitizedName = channelName.replace(/\W/g, "-").toLowerCase();

  return sanitizedName;
}

function getTimeshiftedCurrentTime(timeShiftSeconds) {
  // Check if timeShiftSeconds is a number (optional)

  if (typeof timeShiftSeconds !== "number") {
    console.warn("timeShiftSeconds is not a number. Using 0 seconds offset.");

    timeShiftSeconds = 0;
  }

  var now = new Date();

  var year = now.getFullYear().toString().padStart(4, "0");

  var month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month (0-indexed)

  var day = now.getDate().toString().padStart(2, "0");

  // Get current time in seconds since epoch (Jan 1, 1970, 00:00:00 UTC)

  var currentTime = now.getTime() / 1000;

  // Apply the time shift in seconds

  var adjustedTime = currentTime - timeShiftSeconds;

  // Convert adjusted time back to a Date object

  var adjustedDate = new Date(adjustedTime * 1000);

  // Extract and format time components from adjusted Date object

  var hour = adjustedDate.getHours().toString().padStart(2, "0");

  var minute = adjustedDate.getMinutes().toString().padStart(2, "0");

  var second = adjustedDate.getSeconds().toString().padStart(2, "0");

  // Combine the formatted components into the desired format (remove seconds for now)

  var formattedTime = year + month + day + hour + minute + "00";

  console.log(formattedTime);

  return formattedTime;
}

//unwanteprovide the code without spaces between lines
