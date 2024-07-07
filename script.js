var player = videojs("myVideo", {
  playbackRates: [0.5, 1, 1.5, 2], // Optional playback rate options
});
player.hlsQualitySelector({ displayCurrentQuality: true });

const channelList = document.getElementById("channel-list");
const channelName = document.getElementById("channel-name");
const channelLogo = document.getElementById("channel-logo");
const myVideo = document.getElementById("myVideo");
const filterSelect = document.getElementById("channel-filter");

// Replace 'your_data.json' with the actual path to your JSON file
fetch("./channel.json")
  .then((response) => response.json())
  .then((data) => {
    // Extract unique groups from your JSON data
    const uniqueGroups = [...new Set(data.map((item) => item.group))];

    // Populate the filter select element with group options
    uniqueGroups.forEach((group) => {
      const option = document.createElement("option");
      option.value = group;
      option.text = group;
      filterSelect.appendChild(option);
    });
    filterSelect.addEventListener("change", () => {
      const selectedGroup = filterSelect.value;
      let filteredData;
      // Filter data based on selected group
      if (selectedGroup === "all") {
        filteredData = data;
      } else {
        filteredData = data.filter((item) => item.group === selectedGroup);
      }
      // Clear existing channel list and repopulate with filtered data
      channelList.innerHTML = "";
      for (const item of filteredData) {
      //  const logoImg = document.createElement("img");
        const listItem = document.createElement("li");
       // logoImg.src = item.logo;
        listItem.textContent = item.name;
        listItem.insertAdjacentHTML("beforeend", `<img src="${item.logo}">`);
        listItem.addEventListener("click", () => {
          
           var epgid=generateEpgId(item.name);
           var channelData = getChannelDataById(epgid);

          channelName.textContent = item.name;
          channelLogo.src = item.logo;
          player.pause();
          player.src({
            src: `https://fifaxbd.fun/JIOxRANAPK/stream.m3u8?id=${item.id}&e=.m3u8`,
            type: "application/x-mpegURL",
          });
          player.load();
          player.play();
        });
        channelList.appendChild(listItem);
      }
    });
  });
  function getChannelDataById(channelId) {
    console.log(channelId)
    var currentPlayingProgram=""; 
   var  currentPlayingPrograminfo="" // Initialize variable to store current program
    const currentPlaying = document.getElementById("current-playing");
    const currentPlayinginfo = document.getElementById("current-playing-info");
    var currentTime = getTimeshiftedCurrentTime(20500);
    currentPlaying.innerHTML=""
    currentPlayinginfo.innerHTML=""
     //currentPlaying.textContent= "Now Playing "
     fetch("./prod.json")
    .then((response) => response.json())
    .then((data) => {
        for (var i = 0; i < data.length; i++) {
          var channel = data[i];    
         const startTime = channel.start_time;
    const stopTime = channel.stop_time;
    const title = channel.title;
    const description = channel.description;
    const channelName = channel.name;
    if (startTime < currentTime && currentTime < stopTime) {
       // Store the title of the current program
      if(channelName===channelId)
      {
        currentPlayingProgram = title;
      currentPlayingPrograminfo = description;
        currentPlaying.textContent= "Now Playing: "+ currentPlayingProgram;
        currentPlayinginfo.textContent= "Information->"+ currentPlayingPrograminfo ;
      }
      // Stop iterating after finding the current program
    }
    
        }

  });
    
      
  }
  function generateEpgId(channelName) {
    // Remove unnecessary characters and spaces for a cleaner format
    const sanitizedName = channelName.replace(/\W/g, '.').toUpperCase();
  
    return `${sanitizedName}.IN`;
  }


function getTimeshiftedCurrentTime(timeShiftSeconds) {
  // Check if timeShiftSeconds is a number (optional)
  if (typeof timeShiftSeconds !== 'number') {
    console.warn('timeShiftSeconds is not a number. Using 0 seconds offset.');
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
  var formattedTime = year + month + day + hour + minute+"00";

  return formattedTime;
}

