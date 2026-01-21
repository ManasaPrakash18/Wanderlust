

mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: listing.geometry.coordinates,
    zoom: 9
  });

  const mark = document.createElement("div");
  mark.style.color = '#fe424d'; 
  mark.style.height="200px";
  mark.style.width="200px";
  mark.innerHTML='<i class="fa-solid fa-location-arrow"></i>';
  mark.style.backgroundColor = "rgba(254, 66, 77, 0.3)";
  mark.style.borderRadius = "50%";
  mark.style.boxShadow = "0 0 6px rgba(0,0,0,0.5)";
  mark.style.display = "flex";
  mark.style.alignItems = "center";
  mark.style.justifyContent = "center";
  mark.style.fontSize = "22px";

  const marker= new mapboxgl.Marker({element:mark})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({offset:25})
    .setHTML(`<h4>${listing.location}</h4> <br> <p>Exact location will be provided after booking.<p>`)
  )
  .addTo(map);