/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidW1hci1ha3JhbSIsImEiOiJjbGJ5dWptMTMwNTloM25xcTEzMDh1a2txIn0.1J0k5O0oy8_hMxc_H-gZJw';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/umar-akram/clbyvhzlv001z14mp5k3fzqty',
    scrollZoom: false,
    //   center: [-118.6926022, 34.0207289],
    //   zoom: 9,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((location) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(location.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(location.coordinates)
      .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
      .addTo(map);
    bounds.extend(location.coordinates);
  });

  map.fitBounds(bounds, {
    padding: 150,
  });
};
