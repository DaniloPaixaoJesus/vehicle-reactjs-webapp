

const GetAllCars = async () =>{   
    

    const response = await fetch(
        'http://localhost:8081/api/v1/vehicles',
        {headers:{'Access-Control-Allow-Origin':'*'}}
    );
    const cars = await response.json();
    return cars.vehicleList;
}

const GetCarByVin = async (vin) =>{   
    const response = await fetch(
        `http://localhost:8081/api/v1/vehicles/${vin}`,
        {headers:{'Access-Control-Allow-Origin':'*'}}
    );
    const car = await response.json();
    return car;
}

export {GetAllCars, GetCarByVin};