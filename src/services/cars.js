

const GetAllCars = async () =>{   
    

    const response = await fetch(
        process.env.REACT_APP_API_VEHICLES_ENDPOINT,
        {headers:{'Access-Control-Allow-Origin':'*'}}
    );
    const cars = await response.json();
    return cars.vehicleList;
}

const GetCarByVin = async (vin) =>{   
    const response = await fetch(
        `${process.env.REACT_APP_API_VEHICLES_ENDPOINT}/${vin}`,
        {headers:{'Access-Control-Allow-Origin':'*'}}
    );
    const car = await response.json();
    return car;
}

export {GetAllCars, GetCarByVin};