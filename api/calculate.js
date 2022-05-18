import axios from "axios";

export default async function handler(request, response) {
    const { body } = request;
    console.log(body);
    const url = "http://solarjl-prod-solar-sbe3e5.mo1.mogenius.io"
    const {data} = await axios.post(url, body);
    //const data = {}
    response.status(200).json(data);
}