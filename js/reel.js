// Reel: silent autoplay loop. A click restarts it with sound; when it ends it returns to the silent loop.
(function () {
  var video = document.getElementById("reel");
  var button = document.querySelector(".reel-sound");
  if (!video || !button) return;

  var label = button.querySelector("span");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // JS is running, so swap the native controls for the tap-for-sound button.
  video.removeAttribute("controls");
  button.hidden = false;

  function silentLoop() {
    video.muted = true;
    video.loop = true;
    video.currentTime = 0;
    label.textContent = "Tap for sound";
    button.hidden = false;
    video.play().catch(function () {});
  }

  if (reduceMotion) {
    video.pause();
    video.currentTime = 0;
    label.textContent = "Play with sound";
  }

  button.addEventListener("click", function () {
    video.muted = false;
    video.loop = false;
    video.currentTime = 0;
    button.hidden = true;
    video.play().catch(silentLoop);
  });

  video.addEventListener("ended", silentLoop);
})();
