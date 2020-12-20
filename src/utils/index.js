import axios from 'axios'

function getCurrentCityInfo() {
    return new Promise((resolve, reject) => {
        try {
            let currentCity = JSON.parse(localStorage.getItem('hkzf_currentCity'))
            if (currentCity) {
                resolve(currentCity)
            } else {
                let myCity = new window.BMap.LocalCity();

                myCity.get(async (result) => {

                    const res = await axios.get(`http://157.122.54.189:9060/area/info`, {
                        params: {
                            name: result.name
                        }
                    })
                    // console.log(res);
                    resolve(res.data.body)
                    localStorage.setItem('hkzf_currentCity', JSON.stringify(res.data.body))
                });


            }
        } catch (e) {
            reject(e)
        }



    })

}

export {
    getCurrentCityInfo
}