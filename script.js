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
const channelInfo=document.getElementById("channel-info")


const scrollableDiv = document.getElementById("your-scrollable-div");
const tagid=document.getElementsByClassName("nowplayingtag");
const HD=document.getElementById("toggle-HD");
const bd=document.getElementById("body");
// Initially empty


var activeChannel = "";
let filteredData;
let isShowHD = false; 
let nowspan="";



document.addEventListener('DOMContentLoaded', function() {

  //console.log("loaded");
  fetch("./streams.json")
  .then((response) => response.json())
  .then((data) => {
        filtereditemlist(data);
  });
  function filtereditemlist(filteredData) {
    // Clear existing channel list and repopulate with filtered data

    channelList.innerHTML = "";
    
    for (const item of filteredData) {
      //  const logoImg = document.createElement("img");
      const listItem = document.createElement("li");
      listItem.id = "channelID";
      // logoImg.src = item.logo;
      
      listItem.textContent = item.name;
      listItem.insertAdjacentHTML("beforeend", `<img src="${item.logo}">`);
      
      const nowPlayingSpan = document.createElement("span");
      // nowPlayingSpan.classList.add("nowplaying-span"); 
       nowPlayingSpan.id="nowplaying-span"// Add a class for styling
      

       


       listItem.appendChild(nowPlayingSpan);
     
   
   
      
      
     listItem.addEventListener("mouseenter", () => {
        // Mute the main player

        // player.muted(true);

        // Set a temporary source for preview

        // channelName.textContent = item.name;

     //   var channelData = getChannelDataById(item.epgid);
     getChannelDataById(item.epgid)
       .then(function(data) {
         nowPlayingSpan.textContent=data;
   // Use the retrieved data (e.g., display it on the webpage)
       });
     

        channelLogo.src = item.logo;

        channelName.textContent = item.name;
      //  listItem.style.backgroundColor="green";

        //  player .src({

        //    src: `https://fifaxbd.fun/JIOxRANAPK/stream.m3u8?id=${item.id}&e=.m3u8`,

        //   type: "application/x-mpegURL",

        // });

        // Play the preview at a muted and slower playback rate

        // player .playbackRate(1);

        // player .load();

        // player .play();
      });

     /* listItem.addEventListener("mouseleave", () => {
        // Unmute the main player

        // player.muted(false);

        // Reset the preview source and playback state

        //player.pause();
       // listItem.style.backgroundColor="#f1f1f1";

        channelLogo.src = activeChannel.logo;

        channelName.textContent = activeChannel.name;

        var channelData = getChannelDataById(activeChannel.epgid);
      });*/

      listItem.addEventListener("click", () => {
        const channelInfo=document.getElementById("channel-info")
       channelInfo.style.display="flex";
        for (const channelItem of channelList.children) {
          channelItem.style.backgroundColor = "";
        }
      
        // to change css style
        listItem.style.backgroundColor="lightgreen";
        //var channelData =  getChannelDataById(item.epgid);
      
        //console.log("channeldata",channelData);
    
        
        
        //activeChannel = item;
        
        
        channelName.textContent = item.name;
        channelLogo.src = item.logo;
        if (item.id != null) {
          player.pause();

          player.src({
         src: `https://fifaxbd.fun/JIOxRANAPK/stream.m3u8?id=${item.id}&e=.m3u8`,
         // src: `https://fifaxbd.fun/JIOxRANAPK/stream.m3u8?id=598&e=.m3u8`,
        
            type: "application/x-mpegURL",

         
          });

          player.load();

          player.play();
         
        }
     
      });

      channelList.appendChild(listItem);
    }
  }
      
  


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
      // Filter data based on selected group (language) and category

      if (selectedGroup === "all" && selectedCategory === "all" ) {
        filteredData = data;
      } else if (selectedGroup === "all" ) {
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
    HD.addEventListener("click", function () {
     // Get the checked state of the toggle button
    
      channelList.innerHTML="";
      const language=filterLanguage.value;
      const category=filterCategory.value;
      

      if (language === "all" && category === "all" &&isShowHD ) {
        filteredData = data.filter(
          (item) =>
            item.group==="HD"   
        );
      }
      else if(language === "all" && category === "all"){
        filteredData=data;
      } 
      else if (language === "all" &&isShowHD ) {
        filteredData = data.filter(
          (item) => item.category === category&&item.group==="HD"
        );
      } 
      else if (language === "all"  ) {
        filteredData = data.filter(
          (item) => item.category === category
        );
      }
      else if (category=== "all"&&isShowHD ) {
        filteredData = data.filter((item) => item.language === language &&item.group==="HD");
      }
      else if (category=== "all" ) {
        filteredData = data.filter((item) => item.language === language );
      }
       else {
        if(isShowHD)
        {
          filteredData = data.filter(
            (item) =>
              item.language === language &&
              item.category === category &&
              item.group ==="HD"   
          );
        }
        else{
          filteredData = data.filter(
            (item) =>
              item.language === language &&
              item.category === category &&
              item.group ==="SD"     
          );
        }  
      }
      if (isShowHD) {
        HD.textContent = "SD";
      } else {
        HD.textContent = "HD";
      }
      isShowHD= !isShowHD; // Toggle state for next click
      filtereditemlist(filteredData); // Update the channel list based on filtering*/
    });
  });
// });
}); 

function getChannelDataById(channelId) {
  var currentPlayingProgram = "";
  var currentPlayingPrograminfo = ""; // Initialize variable to store current program
  var upcomingProgram = "";
  var upcomingPrograminfo = "";
  var programLimit = 1;
  var tagid=document.getElementById("nowplayingtag");
  var upcoming=document.getElementById("upcoming");
  var channelLogo=document.getElementById("channel-logo");
  //

  //
  tagid.style.display="block";
  upcoming.style.display="block";
  channelLogo.style.display="block";
 
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
 return fetch("./prod.json")
    .then((response) => response.json())
    .then((data) => {
      let foundCurrentProgram = false;
      for (var i = 0; i < data.length; i++) {
        var channel = data[i];
        const startTime = channel.start_time;
        const stopTime = channel.stop_time;
        const  title = channel.title;
        const description = channel.description;
        const channelName = channel.name;
        
        //now playing data
        if (startTime < currentTime && currentTime < stopTime) {
          // Store the title of the current program
          if (channelName === channelId) {
            currentPlayingProgram = title;
            currentPlayingPrograminfo = description;
            nowspan=title;
            currentPlaying.textContent = currentPlayingProgram;
            currentPlayinginfo.textContent =currentPlayingPrograminfo;
           /* const starttimefrmtd= convertTimeToHHMM(startTime,0);
            const completedTime = currentTime - startTime;
            const hours = Math.floor(completedTime / 3600);
            const minutes = Math.floor((completedTime  % 3600) / 60);
            const seconds = Math.floor((completedTime  % 3600) % 60);
            const formattedCompletedTime  =`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Add element to display completed time (replace with your desired placement)
            const completedTimeDisplay = document.createElement("div");
            completedTimeDisplay.textContent = `Completed: ${starttimefrmtd}`;
            currentPlaying.appendChild(completedTimeDisplay);*/

          
            // foundCurrentProgram = true;
          }
          // Stop iterating after finding the current program
        } else if (startTime > currentTime && programLimit > 0) {
        

          if (channelName === channelId) {
            upcomingProgram = title;

            upcomingPrograminfo = description;

            upcomingPlaying.textContent = upcomingProgram; // Display upcoming info if elements added (optional)

            upcomingPlayinginfo.textContent =
               upcomingPrograminfo; // Display upcoming info if elements added (optional)

            programLimit--;
          }
        }
        if (foundCurrentProgram) {
          break;
        }
      }
      return currentPlayingProgram;
    
    });

 
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

  

  return formattedTime;
}

//unwanted codes
const toggleButton = document.getElementById("toggle-list-size");
const channelid=document.getElementById("channel-list");
let isListExpanded = true; // Initial state (list starts expanded)
toggleButton.addEventListener("click", function() {
  if (isListExpanded) {
    // Collapse the list
    channelid.classList.add("collapsed");
    toggleButton.textContent = "collapse List";
   // nowinfo.textContent="block";
 //   nowinfo.style.display="block";
   // bd.style.background="#333333";
  } else {
    // Expand the list
    channelid.classList.remove("collapsed");
    toggleButton.textContent = "Expand List";
  }
  isListExpanded = !isListExpanded; // Toggle state for next click
});
// Update the current time display every second


