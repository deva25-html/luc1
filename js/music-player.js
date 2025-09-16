document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");
  let isPlaying = false;

  // Function to play music
  function playMusic() {
    music.play();
    musicIcon.innerHTML = "⏸"; // Pause icon
    isPlaying = true;
  }

  // Function to pause music
  function pauseMusic() {
    music.pause();
    musicIcon.innerHTML = "&#9654"; // Play icon
    isPlaying = false;
  }

  // Toggle music on button click
  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  // Set initial volume
  music.volume = 0.5;
});
