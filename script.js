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
           console.log(epgid);
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
    var currentPlayingProgram=""; // Initialize variable to store current program
    const currentPlaying = document.getElementById("current-playing");
     currentPlaying.textContent= "Now Playing "
    fetch("./epg_ripper_IN1.xml")
      .then((response) => response.text())
      .then((xmlData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        var channels = xmlDoc.getElementsByTagName("programme");
  
        for (var i = 0; i < channels.length; i++) {
          var channel = channels[i];
          var currentChannelId = channel.getAttribute("channel").toUpperCase();
          
  
          if (currentChannelId === channelId) {
            console.log("cuurentchannel",currentChannelId)
            // Extract program data
            var programStart = parseInt(channel.getAttribute("start"));
            var programStop = parseInt(channel.getAttribute("stop"));
            var currentTime = getFormattedCurrentTime();
  
            // Check if program is currently playing
            if (programStart < currentTime && currentTime < programStop) {
              var title = channel.getElementsByTagName("title")[0].textContent;
              currentPlayingProgram = title; // Store the title of the current program
              console.log(currentPlayingProgram)
              currentPlaying.textContent= "Now Playing "+ currentPlayingProgram;
              break; // Stop iterating after finding the current program
            } else {
              currentPlayingProgram = "No data available"; // Default value if not playing
              currentPlaying.textContent= "Now Playing "+ currentPlayingProgram;
            }
          }
        }
  
        // Return the current playing program title or "No data available"
       currentPlaying.textContent= "Now Playing "+ currentPlayingProgram;
        return currentPlayingProgram;
      })
      
  }
  function generateEpgId(channelName) {
    // Remove unnecessary characters and spaces for a cleaner format
    const sanitizedName = channelName.replace(/\W/g, '.').toUpperCase();
    return `${sanitizedName}.IN`;
  }
function isProgramPlaying(programmeData) {
  // This function is not used directly in the corrected code,
  // but it's included for reference. It can be used for debugging or
  // additional processing if needed.

  var currentTime = getFormattedCurrentTime();
  var programStart = parseInt(programmeData.getAttribute("start"));
  var programStop = parseInt(programmeData.getAttribute("stop"));

  if (programStart < currentTime && currentTime < programStop) {
    return programmeData.getElementsByTagName("title")[0].textContent; // Return program title
  } else {
    return "No data available"; // Return default value
  }
}
function getFormattedCurrentTime() {
  var now = new Date();
  var year = now.getFullYear().toString().padStart(4, "0");
  var month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month (0-indexed)
  var day = now.getDate().toString().padStart(2, "0");
  var hour = now.getHours().toString().padStart(2, "0");
  var minute = now.getMinutes().toString().padStart(2, "0");
  var second = now.getSeconds().toString().padStart(2, "0");

  // Combine the formatted components into the desired format
  var formattedTime = year + month + day + hour + minute+"00";
  return formattedTime;
}

// Example usage
