import axios from 'axios'
export default async function(url){
    let res = await axios.get(url);
    let {erron,data} = await res.data;
    if(erron===0){
        return data
    }else{
        console.log('请求错误')
    }
}