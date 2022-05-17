import axios from "axios";

export default async function handler(request, response) {
    const {lat, lng, azimut, angle} = request.query;
    const month = 0;
    const url = `https://re.jrc.ec.europa.eu/api/DRcalc?lat={lat}&lon={lng}&raddatabase=PVGIS-SARAH&angle={angle}&aspect={azimut}&outputformat=json&userhorizon=&usehorizon=1&js=1&select_database_daily=PVGIS-SARAH&month={month}&localtime=1&global=1&clearsky=1&dangle={angle}&daspect={azimut}&glob_2axis=1`
    const r = await axios.get(url)
    response.status(200).json(r);
}