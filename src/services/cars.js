

const GetAllCars = async () =>{   
    

    const response = await fetch(
        'http://swedish-challenge.danilopaixao.com.br:8080/vehicle-service/api/v1/vehicles',
        {headers:{'Access-Control-Allow-Origin':'*'}}
    );
    const cars = await response.json();
    return cars;
}

const GetCarByVin = async (vin) =>{   
    const response = await fetch(
        `http://swedish-challenge.danilopaixao.com.br:8080/vehicle-service/api/v1/vehicles/${vin}`,
        {headers:{'Access-Control-Allow-Origin':'*'}}
    );
    const car = await response.json();
    return car;
}

export {GetAllCars, GetCarByVin};