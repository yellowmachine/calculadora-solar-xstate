import axios from "axios";

function radiation2matrix(r){
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    return r.map(x=>months.map(m=>x[m]))
}

function getRadiation(radiation){
    let json_data = null
    let items = []
    let processed = {'00:00': {}, '01:00': {}, '02:00': {}, '03:00': {}, '04:00': {}, '05:00': {},
                    '06:00': {}, '07:00': {}, '08:00': {}, '09:00': {}, '10:00': {}, '11:00': {},
                    '12:00': {}, '13:00': {}, '14:00': {}, '15:00': {}, '16:00': {}, '17:00': {},
                    '18:00': {}, '19:00': {}, '20:00': {}, '21:00': {}, '22:00': {}, '23:00': {},
                    }
    try{
      const raw = radiation
      json_data = raw
      for(let row of json_data){
        let h = row.time
        if(row.month >= 4 && row.month <= 10){
          h = parseInt(h.split(':')[0]) + 1
          h = h === 24 ? 0 : h
          h = (''+h).padStart(2, '0') + ':00'
        }
        processed[h][row.month] = row['G(i)']
      }
      items = Object.keys(processed).map(function(x){
        return {hour:x, ...processed[x]}
      })
      const radiation = radiation2matrix(items);
    }catch{

    }
}

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