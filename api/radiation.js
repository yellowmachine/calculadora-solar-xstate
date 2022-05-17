import axios from "axios";

export default async function handler(request, response) {
    let {lat, lng, azimut, angle} = request.query;
    lat = parseFloat(lat)
    lng = parseFloat(lng)
    azimut = parseFloat(azimut)
    angle = parseFloat(angle)
    const month = 0;
    const url = `https://re.jrc.ec.europa.eu/api/DRcalc?lat=${lat}&lon=${lng}&raddatabase=PVGIS-SARAH&angle=${angle}&aspect=${azimut}&outputformat=json&userhorizon=&usehorizon=1&js=1&select_database_daily=PVGIS-SARAH&month=${month}&localtime=1&global=1&clearsky=1&dangle=${angle}&daspect=${azimut}&glob_2axis=1`
    //const {data} = await axios.get(url)
    const data = {}
    response.status(200).json(data);
}