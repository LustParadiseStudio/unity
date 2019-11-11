function isFullscreen() {
  return (
    document.fullscreenElement != null ||
    document.webkitFullscreenElement != null ||
    document.mozFullScreenElement != null ||
    document.msFullscreenElement != null
  );
}

function openFullscreen() {
  if (isFullscreen()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    return;
  }

  var webDiv = document.getElementById("webgl-content");
  if (webDiv.requestFullscreen) {
    webDiv.requestFullscreen();
  } else if (webDiv.mozRequestFullScreen) {
    webDiv.mozRequestFullScreen();
  } else if (webDiv.webkitRequestFullscreen) {
    webDiv.webkitRequestFullscreen();
  } else if (webDiv.msRequestFullscreen) {
    webDiv.msRequestFullscreen();
  }
}

function onResize() {
  var canvas = document.getElementById("unityContainer");
  var aspectRatioTarget = 1.25;
  var height = "100%";

  if (!isFullscreen()) {
    var width = canvas.offsetWidth;
    height = Math.round(width / aspectRatioTarget) + "px";
  }

  canvas.style.height = height;
}

function onLoading(unity, progress) {
  var loadingDiv = document.getElementById("loading-screen");
  var progressFill = document.getElementById("progress-fill");

  progressFill.style.width = 100 * progress + "%";

  if (progress == 1) {
    loadingDiv.style.display = "none";
  }
}

function loadingGame() {
  document.getElementById("info").style.display = "none";
  document.getElementById("progress").style.display = "block";

  UnityLoader.instantiate("unityContainer", "Build/Build.json", {
    onProgress: onLoading
  });
}

window.addEventListener("resize", onResize);
window.addEventListener("load", onResize);
