// ---- HTML5 Multimedia ----
const video = document.getElementById("demoVideo");

function playVideo() {
  video.play();
}
function pauseVideo() {
  video.pause();
}
function toggleMute() {
  video.muted = !video.muted;
}
function seek() {
  video.currentTime += 5;
}
function setSpeed() {
  video.playbackRate = 1.5;
}

// ---- Geolocation API ----
const geoStatus = document.getElementById("geoStatus");

function getLocation() {
  if (!navigator.geolocation) {
    geoStatus.textContent = "Geolocation not supported.";
    return;
  }
  geoStatus.textContent = "Fetching location...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      geoStatus.textContent = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;
    },
    () => (geoStatus.textContent = "Unable to fetch location.")
  );
}

function clearLocation() {
  geoStatus.textContent = "Idle — location not fetched.";
}

// ---- Async Data Simulation ----
const fetchResult = document.getElementById("fetchResult");

function simulateFetch() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Data fetched successfully!", time: new Date().toLocaleTimeString() });
    }, 1500);
  });
}

function fetchWithPromise() {
  fetchResult.textContent = "Fetching (Promise.then)...";
  simulateFetch().then((data) => {
    fetchResult.textContent = JSON.stringify(data, null, 2);
  });
}

async function fetchWithAsync() {
  fetchResult.textContent = "Fetching (async/await)...";
  const data = await simulateFetch();
  fetchResult.textContent = JSON.stringify(data, null, 2);
}

// ---- XML to JSON Conversion ----
function convertXMLtoJSON() {
  const xmlText = document.getElementById("xmlInput").value;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  const json = xmlToJson(xmlDoc);
  document.getElementById("jsonOutput").textContent = JSON.stringify(json, null, 2);
}

function xmlToJson(xml) {
  let obj = {};
  if (xml.nodeType === 1) {
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        let attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    obj = xml.nodeValue.trim();
  }

  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;
      const childObj = xmlToJson(item);
      if (typeof childObj === "string" && childObj === "") continue;
      if (typeof obj[nodeName] === "undefined") {
        obj[nodeName] = childObj;
      } else {
        if (!Array.isArray(obj[nodeName])) {
          obj[nodeName] = [obj[nodeName]];
        }
        obj[nodeName].push(childObj);
      }
    }
  }
  return obj;
}
