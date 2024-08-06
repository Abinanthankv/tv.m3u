var player = videojs("myVideo", {
  playbackRates: [0.5, 1, 1.5, 2], // Optional playback rate options
  responsive: true,
  liveui: true,
   fill: true,
   enableSmoothSeeking: true,
   controls: true,
   controlBar: {
    skipButtons: {
      forward: 5,
     backward: 10, 
    },
    
   // nativeControlsForTouch:true
  }

  // fluid: true,
  // aspectRatio: '9:16'
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
const startTimeElement = document.createElement('span');
const stopTimeElement = document.createElement('span');
const remainingTimeElement = document.querySelector('.vjs-remaining-time-display');
const scrollfab=document.querySelector('.fab');
//const minusSpan = document.querySelector('span[aria-hidden="false"]');
//console.log(minusSpan)
//minusSpan.style.display="none";


//console.log(remainingTimeElement)
// Initially empty
var activeChannel = "";
let filteredData;
let isShowHD = false; 
let nowspan="";
let  starttime="";
let stoptime="";
let  currtime="";
let  rtdtime="";
let duration="";
var channelID="";


let timeoutId = null;

function detectBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Chrome") !== -1 || userAgent.indexOf("Chromium") !== -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Firefox") !== -1) {
    return "Firefox";
  } else if (userAgent.indexOf("Safari") !== -1) {
    return "Safari";
  } else {
    return "Unknown";
  }
}
/*function notifyAndRedirect() {
  const browser = detectBrowser();
  let extensionUrl;

  switch (browser) {
    case "Chrome":
      extensionUrl = "https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en";
      break;
    case "Firefox":
      extensionUrl = "https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/";
      break;
    case "Safari":
      // Safari App Store link if available
      extensionUrl = "";
      break;
    default:
      alert("Unsupported browser");
      return;
  }

  if (confirm("You need to install a CORS extension to access this content. Click OK to install.")) {
    window.open(extensionUrl, "_blank");
  }
}*/
function notifyUserForCorsExtension() {
  const browser = detectBrowser();
  let extensionUrl;

  switch (browser) {
    case "Chrome":
      extensionUrl = "https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en";
      break;
    case "Firefox":
      extensionUrl = "https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/";
      break;
    case "Safari":
      // Safari App Store link if available
      extensionUrl = "";
      break;
    default:
      alert("Unsupported browser");
      return;
  }
  const hasSeenMessage = localStorage.getItem('corsExtensionMessageShown');
  //hasSeenMessage='false';
  if (!hasSeenMessage) {
    const message = `You need to install a CORS extension to access this content. You can find extensions for your browser here:`;
    if (confirm("You need to install a CORS extension to access this content. Click OK to install.")) {
      window.open(extensionUrl, "_blank");
      localStorage.setItem('corsExtensionMessageShown', 'true');
    }
    //alert(`${message} \n ${extensionUrl}`);
    //localStorage.setItem('corsExtensionMessageShown', 'true');
  }
}
window.addEventListener("scroll", function() {
  if (window.scrollY > 90) {  // Hide after 100px scroll
    channelInfo.style.display = "none";
    scrollfab.style.display="block";

  } else {
    scrollfab.style.display="none";
    channelInfo.style.display = "flex";
    channelInfo.style.behavior= 'smooth'
  }
});

const scrollToTopButton = document.getElementById('scroll-to-top');

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


document.addEventListener('DOMContentLoaded', function() {
  notifyUserForCorsExtension();
 // notifyAndRedirect();
  //console.log("loaded");
  fetch("./jio5.json")
  .then((response) => response.json())
  .then((data) => {
        filtereditemlist(data);
  });
  function filtereditemlist(filteredData) {
    
    channelList.innerHTML = "";
    // to sort channel list alphabetically
    filteredData.sort((a, b) => a.name.localeCompare(b.name)).forEach((item) => {
     
    });
    //   
    for (const item of filteredData) {
      const listItem = document.createElement("li");
      listItem.id = "channelID";
      listItem.textContent = item.name;
      listItem.insertAdjacentHTML("beforeend", `<img src="${item.logo}">`);
      const nowPlayingSpan = document.createElement("span");
      nowPlayingSpan.id="nowplaying-span"// Add a class for styling
      listItem.appendChild(nowPlayingSpan);

      
      listItem.addEventListener("mouseenter", () => {
        // Mute the main player

        // player.muted(true);

        // Set a temporary source for preview

        // channelName.textContent = item.name;

     //   var channelData = getChannelDataById(item.epgid);
     //getChannelDataById(item.epgid)
    // .then(function(data) {
     //  nowPlayingSpan.textContent=data;
 // Use the retrieved data (e.g., display it on the webpage)
    // });
     

       // channelLogo.src = item.logo;

     //   channelName.textContent = item.name;
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
        const channelInfo=document.getElementById("channel-info");
        channelID=item.id;
      
       channelInfo.style.display="flex";
        for (const channelItem of channelList.children) {
          channelItem.style.backgroundColor = "";
        }
        // to change css style
        listItem.style.backgroundColor="lightgreen";
       // var channelData =  getChannelDataById(item.epgid);
        channelLogo.src=item.logo; 
        var jiochannelData=getjioChannelDataById(item.id);
      //  updatetime(item.id);
        

        
        if (item.id != null) {
    
      
          
         player.src({
    
      src:`https://fuji-reduction-euro-affects.trycloudflare.com/app/live.php?id=${item.id}&e=.m3u`,
       // type: 'application/x-mpegURL',
        type: 'application/vnd.apple.mpegURL'

          });
        
          player.load();
          player.play();  
          player.ready(function() {
            this.hotkeys({
              volumeStep: 0.1,
              seekStep: 5,
              
            });
           
          });
     
        }
      
      });
      channelList.appendChild(listItem);

    }
  }
fetch("./merged_data.json")
  .then((response) => response.json())
  .then((data) => {
    // Extract unique groups (languages) and categories from your JSON data
    const uniqueGroups = [...new Set(data.map((item) => item.language))];
    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    // Populate the filter select element with group (language) and category options
    uniqueGroups.sort().forEach((language) => {
      if(language==null ||language=="")
      {
        language="Others"
      }
      const option = document.createElement("option");
      option.value = language;
      option.text = language;
      filterLanguage.appendChild(option);
    });

    uniqueCategories.sort().forEach((category) => {
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
        HD.textContent = "All";
      } else {
        HD.textContent = "HD";
      }
      isShowHD= !isShowHD; // Toggle state for next click
      filtereditemlist(filteredData); // Update the channel list based on filtering*/
    });
  });
// });
}); 


function updateRemainingTime(channelID){
  const id1=channelID
  console.log("yes",id1);
 
 // updatetime(id1);

}

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
  channelLogo.style.display="block";
  //
  const currentPlaying = document.getElementById("current-playing");
  const currentPlayinginfo = document.getElementById("current-playing-info");
 // const upcomingPlaying = document.getElementById("upcoming-playing"); // Add element for upcoming info (optional)
 // const upcomingPlayinginfo = document.getElementById("upcoming-playing-info"); // Add element for upcoming info (optional)
  var currentTime = getTimeshiftedCurrentTime(19800);
  currentPlaying.innerHTML = "";
  currentPlayinginfo.innerHTML = "";
  //upcomingPlaying.innerHTML = ""; // Clear upcoming info if displayed (optional)
  //upcomingPlayinginfo.innerHTML = ""; // Clear upcoming info if displayed (optional)
  //currentPlaying.textContent= "Now Playing "
 return fetch("./prod1.json")
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
           
            currentPlaying.textContent = currentPlayingProgram;
            currentPlayinginfo.textContent =currentPlayingPrograminfo;
        
            console.log(currentPlayingPrograminfo);

            if(currentPlayingProgram.length === 0 &&tagid.style.display==="block")
              {
                channelInfo.style.display="none";
                upcoming.style.display="none";
                
              }
              else{
                tagid.style.display="block";
                upcoming.style.display="block";

              }
              
             foundCurrentProgram = true;
          }
          // Stop iterating after finding the current program
        } 
        /*else if (startTime > currentTime && programLimit > 0) {
        

          if (channelName === channelId) {
            upcomingProgram = title;

            upcomingPrograminfo = description;

            upcomingPlaying.textContent = upcomingProgram; // Display upcoming info if elements added (optional)

            upcomingPlayinginfo.textContent =
               upcomingPrograminfo; // Display upcoming info if elements added (optional)

            programLimit--;
          }
        }*/
        if (foundCurrentProgram) {
          break;
        }
      }
      return currentPlayingProgram;
    
    });

 
}



function getRemainingTime(starttime, stoptime) {
  // Split the time strings into hours and minutes
  
  const currentHour = parseInt(starttime.split(":")[0]);
  const currentMinute = parseInt(starttime.split(":")[1]);
  const stopHour = parseInt(stoptime.split(":")[0]);
  const stopMinute = parseInt(stoptime.split(":")[1]);

  // Convert everything to minutes for easier calculation
  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const stopTotalMinutes = stopHour * 60 + stopMinute;
   // Calculate total time in seconds for both start and stop
   //const currentTotalSeconds = currentHour * 60 * 60 + currentMinute * 60;
  // const stopTotalSeconds = stopHour * 60 * 60 + stopMinute * 60;
 

  // Calculate the total difference in minutes (handling negative values)
  //let difference = stopTotalMinutes - currentTotalMinutes-parseInt(player.currentTime());
  let difference = stopTotalMinutes - currentTotalMinutes;
  if (difference < 0) {
    difference += 24 * 60; // Add a day if the stop time is before current time
  }

  // Convert the difference back to hours and minutes
  //const remainingHours = Math.floor(difference / 60);
  //const remainingMinutes = difference % 60;

  // Format the remaining time as hh:mm string
    // Calculate remaining hours, minutes, and seconds
    const remainingHours = Math.floor(difference / 3600);
    const remainingMinutes = Math.floor((difference % 3600) / 60);
    const remainingSeconds = difference % 60;
  
   // return `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  return `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
}
function getjioChannelDataById(channelId) {
  var currentPlayingProgram = "";
  var currentPlayingPrograminfo = ""; // Initialize variable to store current program
//  var upcomingProgram = "";
//  var upcomingPrograminfo = "";
  var programLimit = 1;
  var tagid=document.getElementById("nowplayingtag");
  var upcoming=document.getElementById("upcoming");
  var channelLogo=document.getElementById("channel-logo");
  channelLogo.style.display="block";
  const currentPlaying = document.getElementById("current-playing");
  const currentPlayinginfo = document.getElementById("current-playing-info");
 // const upcomingPlaying = document.getElementById("upcoming-playing"); // Add element for upcoming info (optional)
 // const upcomingPlayinginfo = document.getElementById("upcoming-playing-info"); // Add element for upcoming info (optional)
  var currentTime = jioepgtimeformat();
  currentPlaying.innerHTML = "";
  currentPlayinginfo.innerHTML = "";
  //upcomingPlaying.innerHTML = ""; // Clear upcoming info if displayed (optional)
//  upcomingPlayinginfo.innerHTML = ""; // Clear upcoming info if displayed (optional)
  //currentPlaying.textContent= "Now Playing "
 
 return fetch("./prod1.json")
    .then((response) => response.json())
    .then((data) => {
      let foundCurrentProgram = false;
      for (var i = 0; i < data.length; i++) {
        var channel = data[i];
        const startTime = channel.start_time;
        const stopTime = channel.stop_time;
        const  title = channel.title;
        const description = channel.description;
       const jiochannelId = channel.id;
        //now playing data
        if (startTime < currentTime && currentTime < stopTime) {
          
          // Store the title of the current program
          if (jiochannelId=== channelId) {
            currentPlayingProgram = title;
            currentPlayingPrograminfo = description;
           // nowspan=title;
            currentPlaying.textContent = currentPlayingProgram;
            currentPlayinginfo.textContent =currentPlayingPrograminfo;
            
            starttime =convertTimeToHHMM(startTime.toString());
            stoptime =convertTimeToHHMM(stopTime.toString());
            currtime=convertTimeToHHMM(currentTime.toString());
           // rtdtime= getRemainingTime(currtime, stoptime)
            
          //  console.log("rtdtime",rtdtime)
          //  console.log("start",starttime)
          //  console.log("stop",stoptime)

      
            
   
            
            tagid.style.display="block";
         //   upcoming.style.display="block";
              
            // foundCurrentProgram = true;
          }
          // Stop iterating after finding the current program
          
        } 
        /*else if (startTime > currentTime && programLimit > 0) {
          
        

          if (jiochannelId === channelId) {
            upcomingProgram = title;

            upcomingPrograminfo = description;

            upcomingPlaying.textContent = upcomingProgram; // Display upcoming info if elements added (optional)

            upcomingPlayinginfo.textContent =
               upcomingPrograminfo; // Display upcoming info if elements added (optional)

            programLimit--;
          }
        }*/
        if (foundCurrentProgram) {
          break;
        }
      }
      return currentPlayingProgram;
    });

 
}
function updatetime(channelId) {
 
 // console.log("hi");

  fetch("./prod1.json")
    .then((response) => response.json())
    .then((data) => {
      
      for (var i = 0; i < data.length; i++) {
        var channel = data[i];
        const startTime = channel.start_time;
        const stopTime = channel.stop_time;
       const jiochannelId = channel.id;
       var currentTime = jioepgtimeformat();
        if (startTime < currentTime && currentTime < stopTime) {
          if (jiochannelId=== channelId)
            { 
            starttime =convertTimeToHHMM(startTime.toString());
            stoptime =convertTimeToHHMM(stopTime.toString());
            currtime=convertTimeToHHMM(currentTime.toString());
            rtdtime= getRemainingTime(currtime, stoptime);
           // duration=getRemainingTime(starttime,stoptime);
            remainingTimeElement.textContent=rtdtime;
          }
        }
      }
    });
    //const updateInterval = setInterval(updatetime(channelID), 30000);
}

function convertTimeToHHMM(timeString) {

  // Extract year, month, day, hour, minute from the string

  const year = timeString.slice(0, 4);
  const month = timeString.slice(4, 6) - 1; // Months are 0-indexed
  const day = timeString.slice(6, 8);
  const hour = timeString.slice(8, 10);
  const minute = timeString.slice(10, 12);



  return `${hour}:${minute}`;
}

function jioepgtimeformat() {
  var now = new Date();
  var year = now.getFullYear().toString().padStart(4, "0");
  var month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month (0-indexed)
  var day = now.getDate().toString().padStart(2, "0");
  var currentTime = now.getTime() / 1000;
  // Apply the time shift in seconds
  var adjustedTime = currentTime 
  // Convert adjusted time back to a Date object
  var adjustedDate = new Date(adjustedTime * 1000);
  // Extract and format time components from adjusted Date object
  var hour = adjustedDate.getHours().toString().padStart(2, "0");
  var minute = adjustedDate.getMinutes().toString().padStart(2, "0");
  var second = adjustedDate.getSeconds().toString().padStart(2, "0");
  var formattedTime = year + month + day + hour + minute + second;
  return formattedTime;
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


