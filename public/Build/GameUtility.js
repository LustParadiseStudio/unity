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
window.addEventListener("load", function() {
  var webgl = this.document.getElementById("webgl-content");
  webgl.style = webglContent_style;

  webgl.innerHTML =
    fullscreen_style + unityContainer_style + loadingScreen_style;
  onResize();
});

var gameName = "<h3>Painel</h3>";
var description = "<p>Jogo possui um tamanho aproximadamente de 15mb</p>";

var webglContent_style =
  "position: relative;margin: 0 auto;max-width: 940px;font-family: 'Roboto', sans-serif;text-align: center;";
var fullscreen_style =
  "<button style = 'position: absolute;top: 0;left: 0;width: 38px;height: 38px;margin: 10px;padding: 0;border: 0;background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAIAAAAnX375AAAACXBIWXMAAAsSAAALEgHS3X78AAABC0lEQVRYw2OUW3eZgb6AiYHuYNTKUStHrRy1koGBgYUSzRbC3LMt5fhYmZEF5ddfoaEvT7z9GnHk/rXPP+gasFc//Lj69jtdrewxlA5VEKSflcj2rX7wnsgQJj/58LEyawtzQiP1zdeS80/5WJmPuqsR1MjMH55FnpU///3f/PijKBsLIzNj3NGHP//9//nv/6FXX17/+INfI+NgbxWgZUFaWaktwAG3b6W9Yo+hNIUWE7ZyhY0iHyszxD4tXo5QBcGV9oq0LfAgljEwMGjxQr1Lat4nJ5PALYPkv5LzT+mXfCi3j2QrtYU54amJTlZq8XKssFG0EOambVwSrP9GGyKjVo5aOWrl0LASABsZTYue2xSgAAAAAElFTkSuQmCC\");z-index: 999;' onclick='openFullscreen()'></button>";
var unityContainer_style =
  "<div id='unityContainer' style='padding: 0;margin: 0;padding: 0px;margin: 0px;border: 0px none;position: relative;'></div>";
var playButton_style =
  "<button style ='height: 33px;width: 200px;margin-top: 15px;padding: 0;border: 0;background-color: #4848f1;color: white;border-radius: 5px;border: 3px solid #6a6acf;' onmouseout=\"this.style.backgroundColor = '#4848f1'\" onmouseover=\"this.style.backgroundColor = '#6a6acf'\" onclick='loadingGame()'>Carregar o jogo</button>";
var info =
  "<div id='info'>" + gameName + description + playButton_style + "</div>";
var progressBar_style =
  "<div style = 'background: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAATUlEQVRo3u3aIQ4AIAwEQUr4/5cPiyMVBDOj0M2mCKgkGdAwjYCudZzLOLiITYPrCdEgGkSDaEA0iAbRIBpEA6JBNHx1vnL7V4NNwxsbCNMGI3YImu0AAAAASUVORK5CYII=\") no-repeat scroll right center / cover;position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: inline-block;'></div>";
var progressFill_style =
  "<div id='progress-fill' style ='background: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAASCAYAAABmbl0zAAAACXBIWXMAAAsSAAALEgHS3X78AAAAO0lEQVRo3u3SQREAAAjDMMC/56EB3omEXjtJCg5GAkyDaTANpsE0YBpMg2kwDaYB02AaTINpMA2Yhr8FO18EIBpZMeQAAAAASUVORK5CYII=\") no-repeat scroll left center / cover;position: absolute;top: 0;left: 0;height: 100%;display: inline-block;'></div>";
var progress_style =
  "<div id='progress' style ='display: none;position: relative;height: 18px;width: 141px;margin-top: 30px;'>" +
  progressBar_style +
  progressFill_style +
  "</div>";
var logobase64 =
  "src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNjQgNDUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2NCA0NTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzI4MjgyODt9DQoJLnN0MXtmaWxsOiNGRkZGRkY7fQ0KCS5zdDJ7ZmlsbDojMTcxNzE3O30NCgkuc3Qze2ZpbGw6I0FGMjUyNTt9DQoJLnN0NHtmaWxsOiNGRjlEMDA7fQ0KCS5zdDV7ZmlsbDojQUExRjFGO30NCgkuc3Q2e2ZpbGw6dXJsKCNYTUxJRF83OTVfKTt9DQoJLnN0N3tmaWxsOiMwQTgyRTU7fQ0KCS5zdDh7ZmlsbDojMDA3MUUyO30NCgkuc3Q5e2ZpbGw6I0Y0QzgxMTt9DQoJLnN0MTB7ZmlsbDp1cmwoI1hNTElEXzc5Nl8pO30NCgkuc3QxMXtmaWxsOiMwNzMxM0U7fQ0KCS5zdDEye2ZpbGw6dXJsKCNYTUxJRF83OTdfKTt9DQoJLnN0MTN7ZmlsbDojRjA0RTIzO30NCgkuc3QxNHtmaWxsOnVybCgjWE1MSURfNzk4Xyk7fQ0KCS5zdDE1e2ZpbGw6dXJsKCNYTUxJRF83OTlfKTt9DQoJLnN0MTZ7ZmlsbDp1cmwoI1hNTElEXzgwMF8pO30NCgkuc3QxN3tmaWxsOiMwQjUyQTA7fQ0KCS5zdDE4e2ZpbGw6IzdBREYwMDt9DQoJLnN0MTl7ZmlsbDpub25lO3N0cm9rZTojMEE4MkU1O3N0cm9rZS1taXRlcmxpbWl0OjEwO30NCgkuc3QyMHtmaWxsOiMwM0NGMDA7fQ0KCS5zdDIxe2ZpbGw6IzAzQ0YwMDtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MTA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KCS5zdDIye2ZpbGw6dXJsKCNYTUxJRF84MDVfKTt9DQoJLnN0MjN7ZmlsbDp1cmwoI1hNTElEXzgwNl8pO30NCgkuc3QyNHtmaWxsOiNGRjZEMDA7fQ0KCS5zdDI1e2ZpbGw6I0ZGRTYwMDt9DQoJLnN0MjZ7ZmlsbDp1cmwoI1hNTElEXzgwN18pO30NCgkuc3QyN3tmaWxsOiNGQ0VFMjE7fQ0KCS5zdDI4e2ZpbGw6I0YxNTkzMDt9DQoJLnN0Mjl7ZmlsbDojMjMxRjIwO30NCgkuc3QzMHtmaWxsOiMwOTNENEQ7fQ0KCS5zdDMxe2ZpbGw6IzBDM0Q0RDt9DQoJLnN0MzJ7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojQ0NDQ0NDO30NCgkuc3QzM3tmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGRjg0NkM7fQ0KCS5zdDM0e2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZGRkZGRjt9DQoJLnN0MzV7ZmlsbDojNDBBQ0M2O30NCgkuc3QzNntmaWxsOiNGRkZGRkY7c3Ryb2tlOiMyMzFGMjA7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KCS5zdDM3e2ZpbGw6I0ZGQUEwMDt9DQoJLnN0Mzh7ZmlsbDojRkY2NzAwO30NCgkuc3QzOXtmaWxsOiNGRjU1MDA7fQ0KCS5zdDQwe2ZpbGw6I0VGNEIwMzt9DQoJLnN0NDF7ZmlsbDpub25lO30NCgkuc3Q0MntmaWxsOiM0MjQyNDI7fQ0KCS5zdDQze2ZpbGw6IzBGOTk0ODtzdHJva2U6I0ZGRkZGRjtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9DQoJLnN0NDR7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDozO3N0cm9rZS1taXRlcmxpbWl0OjEwO30NCgkuc3Q0NXtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KCS5zdDQ2e2ZpbGw6I0ZGNzYwRDt9DQoJLnN0NDd7ZmlsbDojRkY3NjBEO3N0cm9rZTojRkY3NjBEO3N0cm9rZS1taXRlcmxpbWl0OjEwO30NCgkuc3Q0OHtmaWxsOiNENUQ1RDU7fQ0KCS5zdDQ5e2ZpbGw6I0U4RThFODt9DQoJLnN0NTB7ZmlsbDojMDA5NEJCO30NCjwvc3R5bGU+DQo8ZyBpZD0iWE1MSURfMzY0XyI+DQoJPHBhdGggaWQ9IlhNTElEXzU4N18iIGNsYXNzPSJzdDM4IiBkPSJNMjIuMSwyNS4xTDE3LDIxLjlMMzAuMiw2LjRsOC4yLDUuMnYwQzM0LjgsNiwyOC42LDIuNCwyMS41LDIuNGMtMTEuMSwwLTIwLjEsOS0yMC4xLDIwLjEgICBzOSwyMC4xLDIwLjEsMjAuMWMwLjEsMCwwLjEsMCwwLjIsMGwtNi43LTRMMjIuMSwyNS4xeiIvPg0KCTxwYXRoIGlkPSJYTUxJRF81ODBfIiBjbGFzcz0ic3Q0MCIgZD0iTTM4LjQsMTEuNkwzOC40LDExLjZsLTguMi01LjJMMjQsMTkuOWMyLjIsMSw0LjMsMi4xLDYuNSwzLjFjLTUuMSw1LjEtMTAuMiwxMC4yLTE1LjMsMTUuMyAgIEwxNSwzOC42bDYuNyw0YzExLTAuMSwxOS45LTkuMSwxOS45LTIwLjFDNDEuNywxOC41LDQwLjUsMTQuNywzOC40LDExLjZ6Ii8+DQoJPHBhdGggaWQ9IlhNTElEXzU3OV8iIGNsYXNzPSJzdDM3IiBkPSJNMjQsMTkuOWw2LjItMTMuNUMyNi43LDkuNiwxNSwxOS41LDEyLjYsMjEuM2MyLjgsMS42LDUuNiwzLjEsOC40LDQuNyAgIGMtMiw0LjItNC4xLDguNC02LjEsMTIuNmMwLjEtMC4xLDAuMi0wLjIsMC4zLTAuM2M1LjEtNS4xLDEwLjItMTAuMiwxNS4zLTE1LjNDMjguMywyMS45LDI2LjIsMjAuOSwyNCwxOS45eiIvPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00Ni4xLDE5LjZjLTAuNC0wLjItMC43LTAuMy0xLjEtMC41Yy0wLjMtMC4yLTAuNi0wLjQtMC44LTAuNmMtMC4yLTAuMi0wLjQtMC41LTAuNS0wLjkgICAgYy0wLjEtMC4zLTAuMi0wLjgtMC4yLTEuMmMwLTAuNiwwLjEtMS4xLDAuMy0xLjZjMC4yLTAuNSwwLjUtMC44LDAuOS0xLjFjMC40LTAuMywwLjgtMC41LDEuMy0wLjdjMC41LTAuMiwxLjEtMC4yLDEuOC0wLjIgICAgYzAuNiwwLDEuMSwwLjEsMS43LDAuMmMwLjUsMC4xLDEuMSwwLjMsMS42LDAuNWMtMC4xLDAuNy0wLjMsMS4zLTAuNiwyYy0wLjItMC4xLTAuMy0wLjEtMC41LTAuMmMtMC4yLTAuMS0wLjQtMC4xLTAuNi0wLjIgICAgYy0wLjIsMC0wLjQtMC4xLTAuNy0wLjFjLTAuMywwLTAuNSwwLTAuOSwwYy0wLjIsMC0wLjQsMC0wLjYsMC4xYy0wLjIsMC0wLjQsMC4xLTAuNSwwLjJjLTAuMiwwLjEtMC4zLDAuMi0wLjQsMC40ICAgIGMtMC4xLDAuMi0wLjIsMC40LTAuMiwwLjdjMCwwLjIsMCwwLjQsMC4xLDAuNmMwLjEsMC4yLDAuMiwwLjMsMC4zLDAuNGMwLjEsMC4xLDAuMywwLjIsMC41LDAuM2MwLjIsMC4xLDAuMywwLjEsMC41LDAuMmwxLDAuNCAgICBjMC40LDAuMiwwLjgsMC40LDEuMiwwLjVjMC40LDAuMiwwLjcsMC40LDAuOSwwLjdjMC4yLDAuMywwLjQsMC42LDAuNiwxYzAuMSwwLjQsMC4yLDAuOSwwLjIsMS40YzAsMC42LTAuMSwxLjEtMC4zLDEuNiAgICBjLTAuMiwwLjUtMC41LDAuOS0wLjksMS4yYy0wLjQsMC4zLTAuOSwwLjYtMS41LDAuOGMtMC42LDAuMi0xLjMsMC4zLTIuMSwwLjNjLTAuNCwwLTAuNywwLTEsMGMtMC4zLDAtMC42LTAuMS0wLjktMC4xICAgIGMtMC4zLTAuMS0wLjUtMC4xLTAuOC0wLjJjLTAuMy0wLjEtMC41LTAuMi0wLjgtMC4zYzAtMC4zLDAuMS0wLjcsMC4yLTFjMC4xLTAuNCwwLjItMC43LDAuMy0xLjFjMC41LDAuMiwwLjksMC4zLDEuNCwwLjQgICAgYzAuNCwwLjEsMC45LDAuMSwxLjQsMC4xYzAuNywwLDEuMy0wLjEsMS43LTAuNGMwLjQtMC4zLDAuNi0wLjcsMC42LTEuMmMwLTAuMywwLTAuNS0wLjEtMC43Yy0wLjEtMC4yLTAuMi0wLjMtMC40LTAuNSAgICBjLTAuMi0wLjEtMC4zLTAuMi0wLjUtMC4zYy0wLjItMC4xLTAuNC0wLjItMC42LTAuM0w0Ni4xLDE5LjZ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik01Ny44LDE5LjRjMC0wLjMsMC0wLjUtMC4xLTAuN2MtMC4xLTAuMi0wLjItMC4zLTAuNC0wLjRjLTAuMi0wLjEtMC40LTAuMi0wLjYtMC4yYy0wLjIsMC0wLjUtMC4xLTAuOC0wLjEgICAgYy0wLjYsMC0xLjMsMC4xLTIsMC40Yy0wLjItMC4zLTAuMy0wLjYtMC40LTAuOGMtMC4xLTAuMy0wLjEtMC42LTAuMS0xYzAuNS0wLjIsMS0wLjMsMS41LTAuNGMwLjUtMC4xLDEtMC4xLDEuNC0wLjEgICAgYzEuMiwwLDIuMSwwLjMsMi44LDAuOWMwLjcsMC42LDEsMS41LDEsMi44VjI1Yy0wLjQsMC4xLTAuOSwwLjItMS41LDAuNGMtMC42LDAuMS0xLjIsMC4yLTIsMC4yYy0wLjYsMC0xLjEtMC4xLTEuNi0wLjIgICAgYy0wLjUtMC4xLTAuOS0wLjMtMS4zLTAuNWMtMC40LTAuMi0wLjYtMC42LTAuOC0wLjljLTAuMi0wLjQtMC4zLTAuOC0wLjMtMS40YzAtMC42LDAuMS0xLDAuNC0xLjRjMC4yLTAuNCwwLjUtMC43LDAuOS0wLjkgICAgYzAuNC0wLjIsMC44LTAuNCwxLjMtMC41YzAuNS0wLjEsMC45LTAuMSwxLjQtMC4xYzAuMywwLDAuNywwLDEuMSwwLjFWMTkuNHogTTU3LjgsMjEuMmMtMC4xLDAtMC4zLDAtMC41LTAuMWMtMC4yLDAtMC4zLDAtMC40LDAgICAgYy0wLjYsMC0xLDAuMS0xLjMsMC4zYy0wLjMsMC4yLTAuNSwwLjUtMC41LDFjMCwwLjMsMC4xLDAuNSwwLjIsMC43YzAuMSwwLjIsMC4zLDAuMywwLjUsMC40YzAuMiwwLjEsMC40LDAuMSwwLjYsMC4xICAgIGMwLjIsMCwwLjQsMCwwLjUsMGMwLjIsMCwwLjMsMCwwLjUsMGMwLjIsMCwwLjMtMC4xLDAuNS0wLjFWMjEuMnoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTYyLjMsMTIuN2MwLjQtMC4xLDAuOC0wLjEsMS4yLTAuMWMwLjQsMCwwLjgsMCwxLjIsMC4xdjkuMWMwLDAuNCwwLDAuNiwwLjEsMC45YzAsMC4yLDAuMSwwLjQsMC4yLDAuNSAgICBjMC4xLDAuMSwwLjIsMC4yLDAuMywwLjNjMC4xLDAsMC4zLDAuMSwwLjUsMC4xYzAuMSwwLDAuMiwwLDAuMywwYzAuMSwwLDAuMiwwLDAuMy0wLjFjMC4xLDAuNSwwLjIsMC45LDAuMiwxLjQgICAgYzAsMC4xLDAsMC4yLDAsMC4zYzAsMC4xLDAsMC4yLDAsMC4zYy0wLjIsMC4xLTAuNCwwLjEtMC43LDAuMWMtMC4zLDAtMC41LDAtMC43LDBjLTAuOSwwLTEuNi0wLjItMi4xLTAuNyAgICBjLTAuNS0wLjUtMC44LTEuMy0wLjgtMi40VjEyLjd6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik03Mi41LDE5LjRjMC0wLjMsMC0wLjUtMC4xLTAuN2MtMC4xLTAuMi0wLjItMC4zLTAuNC0wLjRjLTAuMi0wLjEtMC40LTAuMi0wLjYtMC4yYy0wLjIsMC0wLjUtMC4xLTAuOC0wLjEgICAgYy0wLjYsMC0xLjMsMC4xLTIsMC40Yy0wLjItMC4zLTAuMy0wLjYtMC40LTAuOGMtMC4xLTAuMy0wLjEtMC42LTAuMS0xYzAuNS0wLjIsMS0wLjMsMS41LTAuNGMwLjUtMC4xLDEtMC4xLDEuNC0wLjEgICAgYzEuMiwwLDIuMSwwLjMsMi44LDAuOWMwLjcsMC42LDEsMS41LDEsMi44VjI1Yy0wLjQsMC4xLTAuOSwwLjItMS41LDAuNGMtMC42LDAuMS0xLjIsMC4yLTIsMC4yYy0wLjYsMC0xLjEtMC4xLTEuNi0wLjIgICAgYy0wLjUtMC4xLTAuOS0wLjMtMS4zLTAuNWMtMC40LTAuMi0wLjYtMC42LTAuOC0wLjljLTAuMi0wLjQtMC4zLTAuOC0wLjMtMS40YzAtMC42LDAuMS0xLDAuNC0xLjRjMC4yLTAuNCwwLjUtMC43LDAuOS0wLjkgICAgYzAuNC0wLjIsMC44LTAuNCwxLjMtMC41YzAuNS0wLjEsMC45LTAuMSwxLjQtMC4xYzAuMywwLDAuNywwLDEuMSwwLjFWMTkuNHogTTcyLjUsMjEuMmMtMC4xLDAtMC4zLDAtMC41LTAuMWMtMC4yLDAtMC4zLDAtMC40LDAgICAgYy0wLjYsMC0xLDAuMS0xLjMsMC4zYy0wLjMsMC4yLTAuNSwwLjUtMC41LDFjMCwwLjMsMC4xLDAuNSwwLjIsMC43YzAuMSwwLjIsMC4zLDAuMywwLjUsMC40YzAuMiwwLjEsMC40LDAuMSwwLjYsMC4xICAgIGMwLjIsMCwwLjQsMCwwLjUsMGMwLjIsMCwwLjMsMCwwLjUsMGMwLjIsMCwwLjMtMC4xLDAuNS0wLjFWMjEuMnoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTg2LjIsMTIuN2MwLjIsMCwwLjQtMC4xLDAuNi0wLjFjMC4yLDAsMC40LDAsMC42LDBjMC4yLDAsMC40LDAsMC42LDBjMC4yLDAsMC40LDAsMC42LDAuMVYyNSAgICBjLTAuNSwwLjItMS4xLDAuMy0xLjcsMC40Yy0wLjYsMC4xLTEuMiwwLjEtMiwwLjFjLTAuNiwwLTEuMi0wLjEtMS44LTAuM2MtMC42LTAuMi0xLjEtMC40LTEuNS0wLjhjLTAuNC0wLjQtMC44LTAuOC0xLTEuNCAgICBjLTAuMi0wLjYtMC40LTEuMy0wLjQtMi4xYzAtMC43LDAuMS0xLjMsMC4zLTEuOWMwLjItMC42LDAuNS0xLjEsMC45LTEuNWMwLjQtMC40LDAuOS0wLjgsMS40LTFjMC42LTAuMiwxLjItMC40LDEuOS0wLjQgICAgYzAuMiwwLDAuNCwwLDAuNywwYzAuMiwwLDAuNCwwLjEsMC43LDAuMVYxMi43eiBNODYuMiwxOC4yYy0wLjItMC4xLTAuNC0wLjEtMC42LTAuMWMtMC4xLDAtMC4zLDAtMC41LDBjLTAuNCwwLTAuNywwLjEtMSwwLjIgICAgYy0wLjMsMC4yLTAuNSwwLjQtMC43LDAuNmMtMC4yLDAuMy0wLjMsMC42LTAuNCwwLjljLTAuMSwwLjQtMC4xLDAuNy0wLjEsMS4xYzAsMC41LDAuMSwwLjksMC4yLDEuMmMwLjEsMC4zLDAuMywwLjYsMC41LDAuOCAgICBjMC4yLDAuMiwwLjQsMC4zLDAuNywwLjRzMC42LDAuMSwwLjksMC4xYzAuMiwwLDAuNCwwLDAuNSwwYzAuMiwwLDAuMy0wLjEsMC41LTAuMVYxOC4yeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNOTUuNSwxOS40YzAtMC4zLDAtMC41LTAuMS0wLjdjLTAuMS0wLjItMC4yLTAuMy0wLjQtMC40Yy0wLjItMC4xLTAuNC0wLjItMC42LTAuMmMtMC4yLDAtMC41LTAuMS0wLjgtMC4xICAgIGMtMC42LDAtMS4zLDAuMS0yLDAuNGMtMC4yLTAuMy0wLjMtMC42LTAuNC0wLjhjLTAuMS0wLjMtMC4xLTAuNi0wLjEtMWMwLjUtMC4yLDEtMC4zLDEuNS0wLjRjMC41LTAuMSwxLTAuMSwxLjQtMC4xICAgIGMxLjIsMCwyLjEsMC4zLDIuOCwwLjljMC43LDAuNiwxLDEuNSwxLDIuOFYyNWMtMC40LDAuMS0wLjksMC4yLTEuNSwwLjRjLTAuNiwwLjEtMS4yLDAuMi0yLDAuMmMtMC42LDAtMS4xLTAuMS0xLjYtMC4yICAgIGMtMC41LTAuMS0wLjktMC4zLTEuMy0wLjVjLTAuNC0wLjItMC42LTAuNi0wLjgtMC45Yy0wLjItMC40LTAuMy0wLjgtMC4zLTEuNGMwLTAuNiwwLjEtMSwwLjQtMS40YzAuMi0wLjQsMC41LTAuNywwLjktMC45ICAgIGMwLjQtMC4yLDAuOC0wLjQsMS4zLTAuNWMwLjUtMC4xLDAuOS0wLjEsMS40LTAuMWMwLjMsMCwwLjcsMCwxLjEsMC4xVjE5LjR6IE05NS41LDIxLjJjLTAuMSwwLTAuMywwLTAuNS0wLjFjLTAuMiwwLTAuMywwLTAuNCwwICAgIGMtMC42LDAtMSwwLjEtMS4zLDAuM2MtMC4zLDAuMi0wLjUsMC41LTAuNSwxYzAsMC4zLDAuMSwwLjUsMC4yLDAuN2MwLjEsMC4yLDAuMywwLjMsMC41LDAuNGMwLjIsMC4xLDAuNCwwLjEsMC42LDAuMSAgICBjMC4yLDAsMC40LDAsMC41LDBjMC4yLDAsMC4zLDAsMC41LDBjMC4yLDAsMC4zLTAuMSwwLjUtMC4xVjIxLjJ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMDMuOSwxMi45aDcuMWMwLjEsMC4zLDAuMSwwLjcsMC4xLDEuMWMwLDAuNCwwLDAuNy0wLjEsMS4xaC00LjV2Mi43aDMuNmMwLjEsMC40LDAuMSwwLjcsMC4xLDEuMSAgICBjMCwwLjQsMCwwLjctMC4xLDEuMWgtMy42djMuM2g0LjdjMC4xLDAuMywwLjEsMC43LDAuMSwxLjFjMCwwLjQsMCwwLjctMC4xLDEuMWgtNy4yVjEyLjl6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMTMuMSwxMi43YzAuNC0wLjEsMC44LTAuMSwxLjItMC4xYzAuNCwwLDAuOCwwLDEuMiwwLjF2OS4xYzAsMC40LDAsMC42LDAuMSwwLjljMCwwLjIsMC4xLDAuNCwwLjIsMC41ICAgIGMwLjEsMC4xLDAuMiwwLjIsMC4zLDAuM2MwLjEsMCwwLjMsMC4xLDAuNSwwLjFjMC4xLDAsMC4yLDAsMC4zLDBjMC4xLDAsMC4yLDAsMC4zLTAuMWMwLjEsMC41LDAuMiwwLjksMC4yLDEuNCAgICBjMCwwLjEsMCwwLjIsMCwwLjNjMCwwLjEsMCwwLjIsMCwwLjNjLTAuMiwwLjEtMC40LDAuMS0wLjcsMC4xYy0wLjMsMC0wLjUsMC0wLjcsMGMtMC45LDAtMS42LTAuMi0yLjEtMC43ICAgIGMtMC41LTAuNS0wLjgtMS4zLTAuOC0yLjRWMTIuN3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEyMC43LDIxLjZjMCwwLjcsMC4zLDEuMiwwLjcsMS41YzAuNCwwLjMsMSwwLjUsMS43LDAuNWMwLjQsMCwwLjgsMCwxLjItMC4xYzAuNC0wLjEsMC44LTAuMiwxLjItMC4zICAgIGMwLjEsMC4yLDAuMiwwLjUsMC4zLDAuOGMwLjEsMC4zLDAuMSwwLjcsMC4yLDFjLTAuOSwwLjMtMS45LDAuNS0zLjEsMC41Yy0wLjgsMC0xLjUtMC4xLTIuMS0wLjNjLTAuNi0wLjItMS4xLTAuNi0xLjUtMSAgICBjLTAuNC0wLjQtMC43LTAuOS0wLjgtMS41Yy0wLjItMC42LTAuMy0xLjItMC4zLTEuOWMwLTAuNywwLjEtMS4zLDAuMy0xLjljMC4yLTAuNiwwLjUtMS4xLDAuOC0xLjVjMC40LTAuNCwwLjgtMC44LDEuNC0xICAgIGMwLjUtMC4yLDEuMi0wLjQsMS45LTAuNGMwLjYsMCwxLjIsMC4xLDEuNywwLjNjMC41LDAuMiwwLjksMC41LDEuMiwwLjljMC4zLDAuNCwwLjYsMC44LDAuOCwxLjRjMC4yLDAuNSwwLjMsMS4xLDAuMywxLjcgICAgYzAsMC4yLDAsMC40LDAsMC43YzAsMC4yLDAsMC40LTAuMSwwLjVIMTIwLjd6IE0xMjQuMiwxOS45YzAtMC42LTAuMi0xLTAuNS0xLjNjLTAuMy0wLjMtMC43LTAuNS0xLjItMC41Yy0wLjYsMC0xLDAuMi0xLjMsMC41ICAgIGMtMC4zLDAuMy0wLjUsMC44LTAuNSwxLjRIMTI0LjJ6IE0xMjIuOCwxMi45YzAuNS0wLjEsMS0wLjEsMS42LTAuMWMwLjMsMCwwLjYsMCwwLjgsMGMwLjIsMCwwLjQsMCwwLjcsMC4xbC0yLjYsMi4xICAgIGMtMC4yLDAtMC4zLDAtMC41LDAuMWMtMC4yLDAtMC40LDAtMC43LDBjLTAuNCwwLTAuNywwLTEuMS0wLjFMMTIyLjgsMTIuOXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEyOC44LDE4LjJoLTEuMWwtMC4xLTAuM2wzLjItNC4xaDAuNHYyLjZoMi4xYzAsMC4yLDAuMSwwLjMsMC4xLDAuNWMwLDAuMSwwLDAuMywwLDAuNGMwLDAuMiwwLDAuMywwLDAuNSAgICBjMCwwLjIsMCwwLjMtMC4xLDAuNWgtMi4xdjMuNWMwLDAuNCwwLDAuNiwwLjEsMC45YzAuMSwwLjIsMC4xLDAuNCwwLjMsMC41YzAuMSwwLjEsMC4yLDAuMiwwLjQsMC4zYzAuMiwwLDAuNCwwLjEsMC42LDAuMSAgICBjMC4yLDAsMC4zLDAsMC41LDBjMC4yLDAsMC4zLTAuMSwwLjQtMC4xYzAuMSwwLjIsMC4xLDAuNCwwLjIsMC43YzAsMC4yLDAuMSwwLjQsMC4xLDAuNmMwLDAuMSwwLDAuMiwwLDAuM2MwLDAuMSwwLDAuMiwwLDAuMyAgICBjLTAuNSwwLjEtMS4xLDAuMi0xLjYsMC4yYy0xLjEsMC0xLjktMC4yLTIuNC0wLjdjLTAuNi0wLjUtMC44LTEuMy0wLjgtMi40VjE4LjJ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMzUuMiwxNi40YzAuMiwwLDAuMy0wLjEsMC41LTAuMWMwLjIsMCwwLjMsMCwwLjUsMGMwLjIsMCwwLjMsMCwwLjUsMGMwLjIsMCwwLjMsMC4xLDAuNSwwLjEgICAgYzAsMC4xLDAuMSwwLjEsMC4xLDAuM2MwLDAuMSwwLjEsMC4yLDAuMSwwLjNjMCwwLjEsMCwwLjIsMC4xLDAuNGMwLDAuMSwwLDAuMiwwLDAuM2MwLjMtMC40LDAuNi0wLjcsMC45LTEgICAgYzAuNC0wLjMsMC44LTAuNCwxLjQtMC40YzAuMSwwLDAuMiwwLDAuNCwwYzAuMiwwLDAuMywwLDAuMywwLjFjMCwwLjEsMCwwLjIsMC4xLDAuNGMwLDAuMiwwLDAuMywwLDAuNWMwLDAuMiwwLDAuNCwwLDAuNiAgICBjMCwwLjIsMCwwLjUtMC4xLDAuN2MtMC4xLDAtMC4zLDAtMC40LDBzLTAuMywwLTAuMywwYy0wLjIsMC0wLjQsMC0wLjcsMC4xYy0wLjIsMC0wLjUsMC4xLTAuNywwLjNjLTAuMiwwLjItMC40LDAuNC0wLjUsMC44ICAgIGMtMC4xLDAuMy0wLjIsMC44LTAuMiwxLjV2NC4zYy0wLjIsMC0wLjQsMC4xLTAuNiwwLjFjLTAuMiwwLTAuNCwwLTAuNiwwYy0wLjIsMC0wLjQsMC0wLjYsMGMtMC4yLDAtMC40LDAtMC42LTAuMVYxNi40eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTQyLjYsMTguMmgtMS4yYzAtMC4yLTAuMS0wLjMtMC4xLTAuNWMwLTAuMiwwLTAuMywwLTAuNWMwLTAuMywwLTAuNiwwLjEtMC45aDMuNnY5ICAgIGMtMC40LDAuMS0wLjgsMC4xLTEuMiwwLjFjLTAuNCwwLTAuOCwwLTEuMi0wLjFWMTguMnogTTE0Mi4zLDE0LjljLTAuMS0wLjQtMC4xLTAuOC0wLjEtMS4yYzAtMC40LDAtMC44LDAuMS0xLjIgICAgYzAuMiwwLDAuNC0wLjEsMC42LTAuMWMwLjIsMCwwLjQsMCwwLjYsMGMwLjIsMCwwLjQsMCwwLjYsMGMwLjIsMCwwLjQsMCwwLjYsMC4xYzAsMC4yLDAuMSwwLjQsMC4xLDAuNmMwLDAuMiwwLDAuNCwwLDAuNiAgICBjMCwwLjIsMCwwLjQsMCwwLjZjMCwwLjIsMCwwLjQtMC4xLDAuNmMtMC4yLDAtMC40LDAuMS0wLjYsMC4xYy0wLjIsMC0wLjQsMC0wLjYsMGMtMC4yLDAtMC40LDAtMC42LDAgICAgQzE0Mi43LDE0LjksMTQyLjQsMTQuOSwxNDIuMywxNC45eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTUzLjUsMjMuMmMwLjEsMC4yLDAuMywwLjUsMC4zLDAuOGMwLjEsMC4zLDAuMSwwLjcsMC4xLDEuMWMtMC41LDAuMi0wLjksMC4zLTEuMywwLjQgICAgYy0wLjQsMC4xLTAuOCwwLjEtMS4zLDAuMWMtMC44LDAtMS40LTAuMS0yLTAuNGMtMC42LTAuMi0xLTAuNi0xLjQtMWMtMC40LTAuNC0wLjYtMC45LTAuOC0xLjVjLTAuMi0wLjYtMC4zLTEuMi0wLjMtMS45ICAgIGMwLTAuNywwLjEtMS4zLDAuMy0xLjhjMC4yLTAuNiwwLjUtMS4xLDAuOC0xLjVjMC40LTAuNCwwLjgtMC44LDEuNC0xYzAuNS0wLjIsMS4yLTAuNCwxLjktMC40YzAuMywwLDAuNSwwLDAuNywwICAgIGMwLjIsMCwwLjQsMCwwLjYsMC4xYzAuMiwwLDAuNCwwLjEsMC42LDAuMWMwLjIsMC4xLDAuNCwwLjEsMC43LDAuMmMwLDAuMywwLDAuNi0wLjEsMC45Yy0wLjEsMC4zLTAuMiwwLjYtMC4zLDAuOSAgICBjLTAuMy0wLjEtMC43LTAuMi0wLjktMC4yYy0wLjMsMC0wLjYtMC4xLTAuOS0wLjFjLTAuNywwLTEuMywwLjItMS42LDAuN2MtMC40LDAuNS0wLjUsMS4xLTAuNSwyYzAsMC45LDAuMiwxLjYsMC42LDIgICAgYzAuNCwwLjQsMC45LDAuNiwxLjYsMC42YzAuMiwwLDAuMywwLDAuNSwwYzAuMSwwLDAuMywwLDAuNCwwYzAuMSwwLDAuMy0wLjEsMC40LTAuMUMxNTMuMSwyMy4zLDE1My4zLDIzLjMsMTUzLjUsMjMuMnoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE2MC4yLDE5LjRjMC0wLjMsMC0wLjUtMC4xLTAuN2MtMC4xLTAuMi0wLjItMC4zLTAuNC0wLjRjLTAuMi0wLjEtMC40LTAuMi0wLjYtMC4yYy0wLjIsMC0wLjUtMC4xLTAuOC0wLjEgICAgYy0wLjYsMC0xLjMsMC4xLTIsMC40Yy0wLjItMC4zLTAuMy0wLjYtMC40LTAuOGMtMC4xLTAuMy0wLjEtMC42LTAuMS0xYzAuNS0wLjIsMS0wLjMsMS41LTAuNGMwLjUtMC4xLDEtMC4xLDEuNC0wLjEgICAgYzEuMiwwLDIuMSwwLjMsMi44LDAuOWMwLjcsMC42LDEsMS41LDEsMi44VjI1Yy0wLjQsMC4xLTAuOSwwLjItMS41LDAuNGMtMC42LDAuMS0xLjIsMC4yLTIsMC4yYy0wLjYsMC0xLjEtMC4xLTEuNi0wLjIgICAgYy0wLjUtMC4xLTAuOS0wLjMtMS4zLTAuNWMtMC40LTAuMi0wLjYtMC42LTAuOC0wLjljLTAuMi0wLjQtMC4zLTAuOC0wLjMtMS40YzAtMC42LDAuMS0xLDAuNC0xLjRjMC4yLTAuNCwwLjUtMC43LDAuOS0wLjkgICAgYzAuNC0wLjIsMC44LTAuNCwxLjMtMC41YzAuNS0wLjEsMC45LTAuMSwxLjQtMC4xYzAuMywwLDAuNywwLDEuMSwwLjFWMTkuNHogTTE2MC4yLDIxLjJjLTAuMSwwLTAuMywwLTAuNS0wLjEgICAgYy0wLjIsMC0wLjMsMC0wLjQsMGMtMC42LDAtMSwwLjEtMS4zLDAuM2MtMC4zLDAuMi0wLjUsMC41LTAuNSwxYzAsMC4zLDAuMSwwLjUsMC4yLDAuN2MwLjEsMC4yLDAuMywwLjMsMC41LDAuNCAgICBjMC4yLDAuMSwwLjQsMC4xLDAuNiwwLjFjMC4yLDAsMC40LDAsMC41LDBjMC4yLDAsMC4zLDAsMC41LDBjMC4yLDAsMC4zLTAuMSwwLjUtMC4xVjIxLjJ6Ii8+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDUuNCwyOC4xYzAuNiwwLDEuMSwwLjIsMS42LDAuNmMwLDAuMSwwLDAuMSwwLDAuMnYwYzAsMC4yLTAuMSwwLjMtMC4zLDAuM2gwYy0wLjEsMC0wLjMtMC4xLTAuNS0wLjMgICAgYy0wLjItMC4xLTAuNS0wLjItMC43LTAuMmgtMC4xYy0wLjYsMC0xLjEsMC4zLTEuNCwxYy0wLjEsMC4yLTAuMSwwLjQtMC4xLDAuNmMwLDAuNiwwLjMsMS4xLDEsMS41YzAuMiwwLjEsMC40LDAuMSwwLjYsMC4xICAgIGMwLjQsMCwwLjctMC4yLDEuMS0wLjVsMC4xLDBoMC4xYzAuMiwwLDAuMywwLjEsMC4zLDAuM3YwYzAsMC4yLTAuMywwLjUtMSwwLjdjLTAuMiwwLTAuNCwwLjEtMC41LDAuMWgtMC4xICAgIGMtMC42LDAtMS4yLTAuMy0xLjctMC44Yy0wLjMtMC40LTAuNS0wLjktMC41LTEuNGMwLTAuNywwLjMtMS4zLDEtMS44QzQ0LjYsMjguMiw0NSwyOC4xLDQ1LjQsMjguMXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQ5LjksMjguMWMwLjYsMCwxLjEsMC4yLDEuNiwwLjZjMC40LDAuNSwwLjcsMSwwLjcsMS42YzAsMC44LTAuNCwxLjUtMS4yLDJjLTAuMywwLjItMC43LDAuMy0xLDAuM2gtMC4xICAgIGMtMC42LDAtMS4xLTAuMy0xLjctMC44Yy0wLjMtMC40LTAuNS0wLjktMC41LTEuNGMwLTAuNywwLjMtMS4zLDEtMS44QzQ5LjEsMjguMyw0OS41LDI4LjEsNDkuOSwyOC4xeiBNNDguNCwzMC4zTDQ4LjQsMzAuMyAgICBjMCwwLjcsMC4zLDEuMSwwLjksMS41YzAuMiwwLjEsMC40LDAuMiwwLjcsMC4ySDUwYzAuNiwwLDEuMS0wLjMsMS40LTFjMC4xLTAuMiwwLjEtMC40LDAuMS0wLjZ2LTAuMWMwLTAuNS0wLjItMC45LTAuNy0xLjIgICAgYy0wLjMtMC4yLTAuNi0wLjMtMC45LTAuM2MtMC43LDAtMS4yLDAuMy0xLjUsMUM0OC40LDMwLDQ4LjQsMzAuMiw0OC40LDMwLjN6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik01My4zLDI4LjFjMC4yLDAuMSwwLjMsMC4xLDAuMywwLjN2MC40YzAuNS0wLjQsMS0wLjYsMS41LTAuNmMwLjYsMCwxLjIsMC4zLDEuNiwwLjggICAgYzAuMywwLjQsMC41LDAuOSwwLjUsMS4zdjIuMWMwLDAuMS0wLjEsMC4yLTAuMywwLjNoMGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zdi0xLjhjMC0wLjgtMC40LTEuNC0xLjEtMS42Yy0wLjIsMC0wLjMtMC4xLTAuNS0wLjEgICAgaDBjLTAuNiwwLTEsMC4zLTEuNCwwLjljLTAuMSwwLjItMC4xLDAuNS0wLjEsMC45djEuN2MwLDAuMi0wLjEsMC4zLTAuMywwLjNoMGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zdi0zLjcgICAgQzUzLDI4LjIsNTMuMSwyOC4xLDUzLjMsMjguMXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTU4LjQsMjYuNEw1OC40LDI2LjRjMC4zLDAsMC40LDAuMSwwLjQsMC4zdjJjMC40LTAuNCwwLjktMC41LDEuMy0wLjVjMC43LDAsMS4zLDAuMywxLjgsMSAgICBjMC4yLDAuMywwLjIsMC42LDAuMiwwLjl2Mi4zYzAsMC4yLTAuMSwwLjMtMC4zLDAuM2gwYy0wLjIsMC0wLjMtMC4xLTAuMy0wLjN2LTIuMmMwLTAuNi0wLjMtMS0wLjktMS4zYy0wLjEsMC0wLjMtMC4xLTAuNC0wLjEgICAgYy0wLjYsMC0xLDAuMy0xLjMsMWMwLDAuMS0wLjEsMC40LTAuMSwwLjd2MS45YzAsMC4yLTAuMSwwLjMtMC4zLDAuM2gwYy0wLjIsMC0wLjMtMC4xLTAuMy0wLjN2LTUuNiAgICBDNTguMiwyNi41LDU4LjMsMjYuNCw1OC40LDI2LjR6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02NS4xLDI4LjFjMC45LDAsMS41LDAuNCwyLDEuMmMwLjIsMC4zLDAuMiwwLjcsMC4yLDF2MC4xYzAsMC4yLTAuMSwwLjMtMC4zLDAuM2gtMy40YzAuMSwwLjQsMC40LDAuOCwwLjgsMSAgICBjMC4yLDAuMSwwLjUsMC4xLDAuNywwLjFjMC4zLDAsMC41LTAuMSwwLjktMC4yaDAuMWMwLjIsMCwwLjMsMC4xLDAuMywwLjN2MGMwLDAuMy0wLjQsMC41LTEuMiwwLjZoLTAuMWMtMC44LDAtMS40LTAuNC0xLjktMS4xICAgIGMtMC4yLTAuNC0wLjMtMC43LTAuMy0xLjFjMC0wLjgsMC40LTEuNSwxLjItMS45QzY0LjQsMjguMiw2NC44LDI4LjEsNjUuMSwyOC4xeiBNNjMuNSwzMC4xaDMuMWMwLTAuMi0wLjEtMC41LTAuNC0wLjkgICAgYy0wLjQtMC4zLTAuNy0wLjUtMS4xLTAuNUg2NWMtMC41LDAtMSwwLjMtMS4zLDAuOEM2My42LDI5LjcsNjMuNiwyOS45LDYzLjUsMzAuMXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTcwLjIsMjguMWMwLjYsMCwxLjEsMC4yLDEuNiwwLjZjMCwwLjEsMCwwLjEsMCwwLjJ2MGMwLDAuMi0wLjEsMC4zLTAuMywwLjNoMGMtMC4xLDAtMC4zLTAuMS0wLjUtMC4zICAgIGMtMC4yLTAuMS0wLjUtMC4yLTAuNy0wLjJoLTAuMWMtMC42LDAtMS4xLDAuMy0xLjQsMWMtMC4xLDAuMi0wLjEsMC40LTAuMSwwLjZjMCwwLjYsMC4zLDEuMSwxLDEuNWMwLjIsMC4xLDAuNCwwLjEsMC42LDAuMSAgICBjMC40LDAsMC43LTAuMiwxLjEtMC41bDAuMSwwaDAuMWMwLjIsMCwwLjMsMC4xLDAuMywwLjN2MGMwLDAuMi0wLjMsMC41LTEsMC43Yy0wLjIsMC0wLjQsMC4xLTAuNSwwLjFoLTAuMSAgICBjLTAuNiwwLTEuMi0wLjMtMS43LTAuOGMtMC4zLTAuNC0wLjUtMC45LTAuNS0xLjRjMC0wLjcsMC4zLTEuMywxLTEuOEM2OS4zLDI4LjIsNjkuNywyOC4xLDcwLjIsMjguMXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTczLjEsMjdjMC4yLDAuMSwwLjMsMC4xLDAuMywwLjN2MC4xYzAsMC4yLTAuMSwwLjItMC4zLDAuM2MtMC4xLDAtMC4yLTAuMS0wLjMtMC4zICAgIEM3Mi44LDI3LjEsNzIuOSwyNyw3My4xLDI3eiBNNzMuMSwyOC4xYzAuMiwwLjEsMC4zLDAuMSwwLjMsMC4zdjMuOWMwLDAuMi0wLjEsMC4zLTAuMywwLjNoMGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zdi0zLjggICAgQzcyLjgsMjguMiw3Mi45LDI4LjEsNzMuMSwyOC4xeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNzQuOCwyOC4yYzAuMiwwLjEsMC4zLDAuMSwwLjMsMC4zdjAuMmMwLjQtMC4zLDAuNy0wLjQsMS4yLTAuNGMwLjYsMCwxLDAuMywxLjUsMC44ICAgIGMwLjItMC4zLDAuNS0wLjYsMS4xLTAuN2wwLjQsMGMwLjcsMCwxLjIsMC4zLDEuNiwxYzAuMSwwLjMsMC4yLDAuNSwwLjIsMC44djIuNGMwLDAuMS0wLjEsMC4yLTAuMywwLjNoMGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zICAgIFYzMGMwLTAuNS0wLjMtMC45LTAuOC0xLjFsLTAuMiwwSDc5Yy0wLjQsMC0wLjgsMC4zLTEsMC44YzAsMC4xLDAsMC4yLDAsMC4zdjIuNGMwLDAuMi0wLjEsMC4zLTAuMywwLjNoMGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zICAgIHYtMmMwLTAuNS0wLjEtMC45LTAuMi0xYy0wLjItMC4zLTAuNS0wLjUtMC45LTAuNWgwYy0wLjUsMC0wLjksMC4zLTEuMSwwLjhjMCwwLjEsMCwwLjMsMCwwLjV2Mi4xYzAsMC4yLTAuMSwwLjMtMC4zLDAuM2gwICAgIGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zdi0zLjdDNzQuNSwyOC4zLDc0LjYsMjguMiw3NC44LDI4LjJ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik04My44LDI4LjFjMC45LDAsMS41LDAuNCwyLDEuMmMwLjIsMC4zLDAuMiwwLjcsMC4yLDF2MC4xYzAsMC4yLTAuMSwwLjMtMC4zLDAuM2gtMy40YzAuMSwwLjQsMC40LDAuOCwwLjgsMSAgICBjMC4yLDAuMSwwLjUsMC4xLDAuNywwLjFjMC4zLDAsMC41LTAuMSwwLjktMC4yaDAuMWMwLjIsMCwwLjMsMC4xLDAuMywwLjN2MGMwLDAuMy0wLjQsMC41LTEuMiwwLjZoLTAuMWMtMC44LDAtMS40LTAuNC0xLjktMS4xICAgIGMtMC4yLTAuNC0wLjMtMC43LTAuMy0xLjFjMC0wLjgsMC40LTEuNSwxLjItMS45QzgzLjEsMjguMiw4My41LDI4LjEsODMuOCwyOC4xeiBNODIuMywzMC4xaDMuMWMwLTAuMi0wLjEtMC41LTAuNC0wLjkgICAgYy0wLjQtMC4zLTAuNy0wLjUtMS4xLTAuNWgtMC4yYy0wLjUsMC0xLDAuMy0xLjMsMC44QzgyLjQsMjkuNyw4Mi4zLDI5LjksODIuMywzMC4xeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNODcuMiwyOC4xYzAuMiwwLjEsMC4zLDAuMSwwLjMsMC4zdjAuNGMwLjUtMC40LDEtMC42LDEuNS0wLjZjMC42LDAsMS4yLDAuMywxLjYsMC44ICAgIGMwLjMsMC40LDAuNSwwLjksMC41LDEuM3YyLjFjMCwwLjEtMC4xLDAuMi0wLjMsMC4zaDBjLTAuMiwwLTAuMy0wLjEtMC4zLTAuM3YtMS44YzAtMC44LTAuNC0xLjQtMS4xLTEuNmMtMC4yLDAtMC4zLTAuMS0wLjUtMC4xICAgIGgwYy0wLjYsMC0xLDAuMy0xLjQsMC45Yy0wLjEsMC4yLTAuMSwwLjUtMC4xLDAuOXYxLjdjMCwwLjItMC4xLDAuMy0wLjMsMC4zaDBjLTAuMiwwLTAuMy0wLjEtMC4zLTAuM3YtMy43ICAgIEM4Ni45LDI4LjIsODcsMjguMSw4Ny4yLDI4LjF6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik05Mi45LDI2LjVMOTIuOSwyNi41YzAuMywwLDAuMywwLjEsMC4zLDAuM3YxLjRoMC43bDAuMSwwYzAuMSwwLDAuMiwwLjEsMC4zLDAuM2MwLDAuMS0wLjEsMC4zLTAuMywwLjMgICAgbC0wLjIsMGgtMC42djIuM2MwLDAuNCwwLjEsMC43LDAuNCwwLjhsMC40LDBoMC4yYzAuMSwwLDAuMiwwLjEsMC4zLDAuM3YwYzAsMC4yLTAuMSwwLjMtMC4zLDAuM2gtMC4zYy0wLjUsMC0wLjktMC4zLTEuMS0wLjggICAgYzAtMC4xLTAuMS0wLjMtMC4xLTAuNXYtMi40aC0wLjNsLTAuMywwYy0wLjItMC4xLTAuMy0wLjItMC4zLTAuM2MwLTAuMiwwLjEtMC4zLDAuMy0wLjN2MGwwLjIsMGgwLjR2LTEuMyAgICBDOTIuNywyNi42LDkyLjgsMjYuNSw5Mi45LDI2LjV6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik05Ny4yLDI4LjFjMC42LDAsMS4xLDAuMiwxLjYsMC42YzAuNCwwLjUsMC43LDEsMC43LDEuNmMwLDAuOC0wLjQsMS41LTEuMiwyYy0wLjMsMC4yLTAuNywwLjMtMSwwLjNoLTAuMSAgICBjLTAuNiwwLTEuMS0wLjMtMS43LTAuOGMtMC4zLTAuNC0wLjUtMC45LTAuNS0xLjRjMC0wLjcsMC4zLTEuMywxLTEuOEM5Ni4zLDI4LjMsOTYuNywyOC4xLDk3LjIsMjguMXogTTk1LjYsMzAuM0w5NS42LDMwLjMgICAgYzAsMC43LDAuMywxLjEsMC45LDEuNWMwLjIsMC4xLDAuNCwwLjIsMC43LDAuMmgwLjFjMC42LDAsMS4xLTAuMywxLjQtMWMwLjEtMC4yLDAuMS0wLjQsMC4xLTAuNnYtMC4xYzAtMC41LTAuMi0wLjktMC43LTEuMiAgICBjLTAuMy0wLjItMC42LTAuMy0wLjktMC4zYy0wLjcsMC0xLjIsMC4zLTEuNSwxQzk1LjYsMzAsOTUuNiwzMC4yLDk1LjYsMzAuM3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwNC41LDI4LjFjMC44LDAsMS41LDAuNCwyLDEuMmMwLjIsMC4zLDAuMiwwLjcsMC4yLDF2MS45YzAsMC4yLTAuMSwwLjMtMC4zLDAuM2gwYy0wLjEsMC0wLjItMC4xLTAuMy0wLjIgICAgdjBsMC0wLjR2MGMtMC41LDAuNS0xLDAuNy0xLjUsMC43aC0wLjFjLTAuOCwwLTEuNC0wLjQtMS45LTEuMWMtMC4yLTAuNC0wLjMtMC43LTAuMy0xLjFjMC0wLjgsMC40LTEuNSwxLjItMiAgICBDMTAzLjgsMjguMiwxMDQuMiwyOC4xLDEwNC41LDI4LjF6IE0xMDIuOSwzMC4zTDEwMi45LDMwLjNjMCwwLjcsMC4zLDEuMiwxLDEuNWMwLjIsMC4xLDAuNCwwLjEsMC42LDAuMWgwLjFjMC41LDAsMS0wLjMsMS4zLTAuOCAgICBjMC4xLTAuMywwLjItMC41LDAuMi0wLjd2LTAuMWMwLTAuNi0wLjMtMS4xLTAuOS0xLjRjLTAuMi0wLjEtMC40LTAuMS0wLjctMC4xaDBjLTAuNywwLTEuMSwwLjMtMS41LDEgICAgQzEwMi45LDMwLDEwMi45LDMwLjIsMTAyLjksMzAuM3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwOS43LDI4LjFjMC42LDAsMS4xLDAuMiwxLjYsMC42YzAuNCwwLjUsMC43LDEsMC43LDEuNmMwLDAuOC0wLjQsMS41LTEuMiwyYy0wLjMsMC4yLTAuNywwLjMtMSwwLjNoLTAuMSAgICBjLTAuNiwwLTEuMS0wLjMtMS43LTAuOGMtMC4zLTAuNC0wLjUtMC45LTAuNS0xLjRjMC0wLjcsMC4zLTEuMywxLTEuOEMxMDguOCwyOC4zLDEwOS4yLDI4LjEsMTA5LjcsMjguMXogTTEwOC4xLDMwLjNMMTA4LjEsMzAuMyAgICBjMCwwLjcsMC4zLDEuMSwwLjksMS41YzAuMiwwLjEsMC40LDAuMiwwLjcsMC4yaDAuMWMwLjYsMCwxLjEtMC4zLDEuNC0xYzAuMS0wLjIsMC4xLTAuNCwwLjEtMC42di0wLjFjMC0wLjUtMC4yLTAuOS0wLjctMS4yICAgIGMtMC4zLTAuMi0wLjYtMC4zLTAuOS0wLjNjLTAuNywwLTEuMiwwLjMtMS41LDFDMTA4LjEsMzAsMTA4LjEsMzAuMiwxMDguMSwzMC4zeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTE2LjUsMjguMWMwLjcsMCwxLjMsMC4zLDEuOCwxbDAsMC4xdjBjMCwwLjItMC4xLDAuMy0wLjMsMC4zYy0wLjEsMC0wLjMtMC4xLTAuNC0wLjQgICAgYy0wLjMtMC4zLTAuNi0wLjQtMS0wLjRjLTAuNSwwLTAuOSwwLjItMS4yLDAuN2wwLDAuMWMwLDAuMSwwLjIsMC4yLDAuNSwwLjNjMS4yLDAuMywxLjksMC41LDIsMC41YzAuMywwLjIsMC41LDAuNSwwLjUsMC44djAgICAgYzAsMC40LTAuMywwLjktMSwxLjJjLTAuMywwLjEtMC42LDAuMi0wLjksMC4yYy0wLjcsMC0xLjItMC4zLTEuNy0wLjljMC0wLjEtMC4xLTAuMS0wLjEtMC4ydi0wLjFjMC0wLjIsMC4xLTAuMiwwLjQtMC4zICAgIGMwLjEsMCwwLjIsMC4xLDAuNCwwLjRjMC4zLDAuMywwLjYsMC40LDEsMC40YzAuNSwwLDAuOC0wLjIsMS4xLTAuNmwwLTAuMXYwYzAtMC4xLTAuMS0wLjItMC4zLTAuMmMtMS40LTAuMy0yLjItMC41LTIuMy0wLjYgICAgYy0wLjMtMC4yLTAuNC0wLjQtMC40LTAuN2MwLTAuNCwwLjMtMC44LDAuOS0xLjJDMTE1LjksMjguMiwxMTYuMiwyOC4xLDExNi41LDI4LjF6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMjEuMiwyOC4xYzAuOSwwLDEuNSwwLjQsMiwxLjJjMC4yLDAuMywwLjIsMC43LDAuMiwxdjAuMWMwLDAuMi0wLjEsMC4zLTAuMywwLjNoLTMuNCAgICBjMC4xLDAuNCwwLjQsMC44LDAuOCwxYzAuMiwwLjEsMC41LDAuMSwwLjcsMC4xYzAuMywwLDAuNS0wLjEsMC45LTAuMmgwLjFjMC4yLDAsMC4zLDAuMSwwLjMsMC4zdjBjMCwwLjMtMC40LDAuNS0xLjIsMC42aC0wLjEgICAgYy0wLjgsMC0xLjQtMC40LTEuOS0xLjFjLTAuMi0wLjQtMC4zLTAuNy0wLjMtMS4xYzAtMC44LDAuNC0xLjUsMS4yLTEuOUMxMjAuNSwyOC4yLDEyMC44LDI4LjEsMTIxLjIsMjguMXogTTExOS42LDMwLjFoMy4xICAgIGMwLTAuMi0wLjEtMC41LTAuNC0wLjljLTAuNC0wLjMtMC43LTAuNS0xLjEtMC41aC0wLjJjLTAuNSwwLTEsMC4zLTEuMywwLjhDMTE5LjcsMjkuNywxMTkuNywyOS45LDExOS42LDMwLjF6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMjQuNSwyOC4xYzAuMiwwLjEsMC4zLDAuMSwwLjMsMC4zdjEuN2MwLDAuNywwLjIsMS4yLDAuNiwxLjVjMC4zLDAuMiwwLjYsMC4zLDAuOSwwLjNjMC42LDAsMS4xLTAuMywxLjQtMSAgICBjMC4xLTAuMiwwLjEtMC40LDAuMS0wLjZ2LTEuOWMwLTAuMiwwLjItMC4zLDAuMy0wLjNjMC4yLDAsMC4zLDAuMSwwLjMsMC4zdjMuOWMwLDAuMS0wLjEsMC4yLTAuMywwLjNoMGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zICAgIFYzMmgwYy0wLjUsMC40LTAuOSwwLjYtMS41LDAuNmgtMC4xYy0wLjcsMC0xLjMtMC4zLTEuOC0xYy0wLjItMC40LTAuMy0wLjgtMC4zLTEuM3YtMS44QzEyNC4yLDI4LjIsMTI0LjMsMjguMSwxMjQuNSwyOC4xeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTMzLjcsMjguMWMwLjgsMCwxLjUsMC40LDIsMS4yYzAuMiwwLjMsMC4yLDAuNywwLjIsMXYxLjljMCwwLjItMC4xLDAuMy0wLjMsMC4zaDBjLTAuMSwwLTAuMi0wLjEtMC4zLTAuMiAgICB2MGwwLTAuNHYwYy0wLjUsMC41LTEsMC43LTEuNSwwLjdoLTAuMWMtMC44LDAtMS40LTAuNC0xLjktMS4xYy0wLjItMC40LTAuMy0wLjctMC4zLTEuMWMwLTAuOCwwLjQtMS41LDEuMi0yICAgIEMxMzMsMjguMiwxMzMuMywyOC4xLDEzMy43LDI4LjF6IE0xMzIuMSwzMC4zTDEzMi4xLDMwLjNjMCwwLjcsMC4zLDEuMiwxLDEuNWMwLjIsMC4xLDAuNCwwLjEsMC42LDAuMWgwLjFjMC41LDAsMS0wLjMsMS4zLTAuOCAgICBjMC4xLTAuMywwLjItMC41LDAuMi0wLjd2LTAuMWMwLTAuNi0wLjMtMS4xLTAuOS0xLjRjLTAuMi0wLjEtMC40LTAuMS0wLjctMC4xaDBjLTAuNywwLTEuMSwwLjMtMS41LDEgICAgQzEzMi4xLDMwLDEzMi4xLDMwLjIsMTMyLjEsMzAuM3oiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzNywyNi40TDEzNywyNi40YzAuMywwLDAuNCwwLjEsMC40LDAuM3Y1LjNoMC4zYzAuMSwwLDAuMiwwLjEsMC4zLDAuM3YwYzAsMC4yLTAuMSwwLjMtMC4zLDAuM2gtMC42ICAgIGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zdi01LjVDMTM2LjgsMjYuNSwxMzYuOSwyNi40LDEzNywyNi40eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTQwLjksMjguMWMwLjYsMCwxLjEsMC4yLDEuNiwwLjZjMCwwLjEsMCwwLjEsMCwwLjJ2MGMwLDAuMi0wLjEsMC4zLTAuMywwLjNoMGMtMC4xLDAtMC4zLTAuMS0wLjUtMC4zICAgIGMtMC4yLTAuMS0wLjUtMC4yLTAuNy0wLjJoLTAuMWMtMC42LDAtMS4xLDAuMy0xLjQsMWMtMC4xLDAuMi0wLjEsMC40LTAuMSwwLjZjMCwwLjYsMC4zLDEuMSwxLDEuNWMwLjIsMC4xLDAuNCwwLjEsMC42LDAuMSAgICBjMC40LDAsMC43LTAuMiwxLjEtMC41bDAuMSwwaDAuMWMwLjIsMCwwLjMsMC4xLDAuMywwLjN2MGMwLDAuMi0wLjMsMC41LTEsMC43Yy0wLjIsMC0wLjQsMC4xLTAuNSwwLjFoLTAuMSAgICBjLTAuNiwwLTEuMi0wLjMtMS43LTAuOGMtMC4zLTAuNC0wLjUtMC45LTAuNS0xLjRjMC0wLjcsMC4zLTEuMywxLTEuOEMxNDAsMjguMiwxNDAuNSwyOC4xLDE0MC45LDI4LjF6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNDUuNCwyOC4xYzAuOCwwLDEuNSwwLjQsMiwxLjJjMC4yLDAuMywwLjIsMC43LDAuMiwxdjEuOWMwLDAuMi0wLjEsMC4zLTAuMywwLjNoMGMtMC4xLDAtMC4yLTAuMS0wLjMtMC4yICAgIHYwbDAtMC40djBjLTAuNSwwLjUtMSwwLjctMS41LDAuN2gtMC4xYy0wLjgsMC0xLjQtMC40LTEuOS0xLjFjLTAuMi0wLjQtMC4zLTAuNy0wLjMtMS4xYzAtMC44LDAuNC0xLjUsMS4yLTIgICAgQzE0NC44LDI4LjIsMTQ1LjEsMjguMSwxNDUuNCwyOC4xeiBNMTQzLjksMzAuM0wxNDMuOSwzMC4zYzAsMC43LDAuMywxLjIsMSwxLjVjMC4yLDAuMSwwLjQsMC4xLDAuNiwwLjFoMC4xYzAuNSwwLDEtMC4zLDEuMy0wLjggICAgYzAuMS0wLjMsMC4yLTAuNSwwLjItMC43di0wLjFjMC0wLjYtMC4zLTEuMS0wLjktMS40Yy0wLjItMC4xLTAuNC0wLjEtMC43LTAuMWgwYy0wLjcsMC0xLjEsMC4zLTEuNSwxICAgIEMxNDMuOSwzMCwxNDMuOSwzMC4yLDE0My45LDMwLjN6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNDguOSwyOC4xYzAuMiwwLjEsMC4zLDAuMSwwLjMsMC4zdjAuNGMwLjUtMC40LDEtMC42LDEuNS0wLjZjMC42LDAsMS4yLDAuMywxLjYsMC44ICAgIGMwLjMsMC40LDAuNSwwLjksMC41LDEuM3YyLjFjMCwwLjEtMC4xLDAuMi0wLjMsMC4zaDBjLTAuMiwwLTAuMy0wLjEtMC4zLTAuM3YtMS44YzAtMC44LTAuNC0xLjQtMS4xLTEuNmMtMC4yLDAtMC4zLTAuMS0wLjUtMC4xICAgIGgwYy0wLjYsMC0xLDAuMy0xLjQsMC45Yy0wLjEsMC4yLTAuMSwwLjUtMC4xLDAuOXYxLjdjMCwwLjItMC4xLDAuMy0wLjMsMC4zaDBjLTAuMiwwLTAuMy0wLjEtMC4zLTAuM3YtMy43ICAgIEMxNDguNiwyOC4yLDE0OC43LDI4LjEsMTQ4LjksMjguMXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE1NS44LDI4LjFjMC42LDAsMS4xLDAuMiwxLjYsMC42YzAsMC4xLDAsMC4xLDAsMC4ydjBjMCwwLjItMC4xLDAuMy0wLjMsMC4zaDBjLTAuMSwwLTAuMy0wLjEtMC41LTAuMyAgICBjLTAuMi0wLjEtMC41LTAuMi0wLjctMC4yaC0wLjFjLTAuNiwwLTEuMSwwLjMtMS40LDFjLTAuMSwwLjItMC4xLDAuNC0wLjEsMC42YzAsMC42LDAuMywxLjEsMSwxLjVjMC4yLDAuMSwwLjQsMC4xLDAuNiwwLjEgICAgYzAuNCwwLDAuNy0wLjIsMS4xLTAuNWwwLjEsMGgwLjFjMC4yLDAsMC4zLDAuMSwwLjMsMC4zdjBjMCwwLjItMC4zLDAuNS0xLDAuN2MtMC4yLDAtMC40LDAuMS0wLjUsMC4xaC0wLjEgICAgYy0wLjYsMC0xLjItMC4zLTEuNy0wLjhjLTAuMy0wLjQtMC41LTAuOS0wLjUtMS40YzAtMC43LDAuMy0xLjMsMS0xLjhDMTU1LDI4LjIsMTU1LjQsMjguMSwxNTUuOCwyOC4xeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTYwLjMsMjguMWMwLjksMCwxLjUsMC40LDIsMS4yYzAuMiwwLjMsMC4yLDAuNywwLjIsMXYwLjFjMCwwLjItMC4xLDAuMy0wLjMsMC4zaC0zLjQgICAgYzAuMSwwLjQsMC40LDAuOCwwLjgsMWMwLjIsMC4xLDAuNSwwLjEsMC43LDAuMWMwLjMsMCwwLjUtMC4xLDAuOS0wLjJoMC4xYzAuMiwwLDAuMywwLjEsMC4zLDAuM3YwYzAsMC4zLTAuNCwwLjUtMS4yLDAuNmgtMC4xICAgIGMtMC44LDAtMS40LTAuNC0xLjktMS4xYy0wLjItMC40LTAuMy0wLjctMC4zLTEuMWMwLTAuOCwwLjQtMS41LDEuMi0xLjlDMTU5LjYsMjguMiwxNjAsMjguMSwxNjAuMywyOC4xeiBNMTU4LjgsMzAuMWgzLjEgICAgYzAtMC4yLTAuMS0wLjUtMC40LTAuOWMtMC40LTAuMy0wLjctMC41LTEuMS0wLjVoLTAuMmMtMC41LDAtMSwwLjMtMS4zLDAuOEMxNTguOSwyOS43LDE1OC44LDI5LjksMTU4LjgsMzAuMXoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4='";
var logo_style =
  "<img style ='width: 60%;max-width: 940px;'" + logobase64 + ">";

var loadingScreen_style =
  "<div id='loading-screen' style='position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: #ffac4e;display: flex;justify-content: center;align-items: center;flex-direction: column;'>" +
  logo_style +
  info +
  progress_style +
  "</div>";
