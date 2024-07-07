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
    filterSelect.addEventListener("DOMContentLoaded", loadallchannel());

    function loadallchannel() {
      // Code to be executed after the DOM is loaded (may not wait for all resources)
      filterSelect.value = "all";
      const selectedGroup = filterSelect.value;
      let filteredData;
      if (selectedGroup === "all") {
        filteredData = data;
      } else {
        filteredData = data.filter((item) => item.group === selectedGroup);
      }
      channelList.innerHTML = "";
      for (const item of filteredData) {
        const logoImg = document.createElement("img");
        const listItem = document.createElement("li");
        logoImg.src = item.logo;
        listItem.textContent = item.name;
        listItem.insertAdjacentHTML("beforeend", `<img src="${item.logo}">`);
        channelList.appendChild(listItem);
      }
    }

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
        const logoImg = document.createElement("img");
        const listItem = document.createElement("li");
        logoImg.src = item.logo;
        listItem.textContent = item.name;
        listItem.insertAdjacentHTML("beforeend", `<img src="${item.logo}">`);
        listItem.addEventListener("click", () => {
          var channelData = getChannelDataById(item.id);
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
  fetch("./epg.xml")
    .then((response) => response.text())
    .then((xmlData) => {
      // Parse the XML data using DOMParser (as shown in previous example)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "text/xml");
      var channels = xmlDoc.getElementsByTagName("programme");
      for (var i = 0; i < channels.length; i++) {
        var channel = channels[i];
        var isPlaying = isProgramPlaying(channel);

        var currentChannelId = channel.getAttribute("channel");
        if (currentChannelId === channelId) {
          // Extract relevant data from the channel element
          var displayName =
            channel.getElementsByTagName("title")[0].textContent;
          var iconSrc = channel
            .getElementsByTagName("icon")[0]
            .getAttribute("src");
          // if (isPlaying) {
          //   console.log("Program", channel.getElementsByTagName("title")[0].textContent, "is currently playing");
          // } else {
          //   console.log("Program is not currently playing");
          // }
          // Return an object containing the extracted data
        }
      }

      // Channel ID not found, return null
      return null;
    });
}
function isProgramPlaying(programmeData) {
  var currentTime = getFormattedCurrentTime();
  //var currentMillis = currentTime.getTime();

  var programStart = parseInt(programmeData.getAttribute("start"));
  var programStop = parseInt(programmeData.getAttribute("stop"));
  if (programStart < currentTime && currentTime < programStop) {
    var title = programmeData.getElementsByTagName("title")[0].textContent;
    console.log(title);
  } else {
    console.log("No data available");
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
  var formattedTime = year + month + day + hour + minute + second;
  return formattedTime;
}

// Example usage
