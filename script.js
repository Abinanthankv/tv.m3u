var player = videojs("myVideo",{
    playbackRates: [0.5, 1, 1.5, 2] // Optional playback rate options
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
          const logoImg = document.createElement("img");
          const listItem = document.createElement("li");
          logoImg.src = item.logo;
          listItem.textContent = item.name;
          listItem.insertAdjacentHTML(
            "beforeend",
            `<img src="${item.logo}">`
          );
          listItem.addEventListener("click", () => {
            channelName.textContent=item.name;
            channelLogo.src=item.logo;
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
  
