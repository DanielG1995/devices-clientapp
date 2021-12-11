import axios, { Method } from "axios";
import { Device } from "../Utils/interfaces";


export const api = (url: string, method: Method = 'post', data?: Device) => {
    try {
        if (method.toLowerCase() === 'post' || method.toLowerCase()==='put'){
          return axios({
              method,
              url,
              data,
          })
      }  else{
        return axios({
              method,
              url,
              responseType:'json'
          })
      }

    } catch (error) {
        console.log(error);
    }
}
