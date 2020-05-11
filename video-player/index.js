const video = document.querySelector('#video');
const play = document.querySelector('#play');
const stop = document.querySelector('#stop');
const timestamp = document.querySelector('#timestamp');
const progress = document.querySelector('#progress');

// PLay & Pause video
function toggleVideoStatus() {
  // using the video API
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update the play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Update progress & timestamp
function updateProgress() {
  // console log the currentTime to see the formatted seconds
  console.log(video.currentTime);
  // Set the progress input value to a percentage by getting
  // the videos currentTime divided by the video duration
  // then multiply by 100 to get a percentage
  progress.value = (video.currentTime / video.duration) * 100;
  // console log the progress value
  console.log(progress.value);
  // get the minutes by taking the video time and divide by 60
  let minutes = Math.floor(video.currentTime / 60);
  // To format the timestamp
  // If the minutes are less than 10 - concat a 0 in front
  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }

  // get the seconds by taking the video time and
  // using the modulus operator to get the remainder of 60
  let seconds = Math.floor(video.currentTime % 60);
  // To format the timestamp
  // If the mins are less than 10 - concat a 0 in front
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }

  // setting the UI timestamp to the minutes and seconds
  timestamp.textContent = `${minutes}:${seconds}`;
}

// set video time to progress
function setVideoProgress() {
  // Set the video's current time to
  // the progress.value multiplied by the video duration
  // then divide by 100
  video.currentTime = (Number(progress.value) * video.duration) / 100;
}

// Stop video
function stopVideo() {
  // set the surrent time to 0 to go back to the beginning
  video.currentTime = 0;
  // then we pause it at the beginning of the video
  video.pause();
}

// Video click event to toggle the play/pause/stop status
video.addEventListener('click', toggleVideoStatus);
// Video pause event to update the icons
video.addEventListener('pause', updatePlayIcon);
// Video pause event to update the icons
video.addEventListener('play', updatePlayIcon);
// Video timeupdate event - as the video plays this event will get called
video.addEventListener('timeupdate', updateProgress);

// Play click event that calls the toggleVideoStatus function
play.addEventListener('click', toggleVideoStatus);
// Stop click event that calls stopVideo function
stop.addEventListener('click', stopVideo);
// Progress change event (because its a range input) that calls setVideoProgress progress
progress.addEventListener('change', setVideoProgress);
