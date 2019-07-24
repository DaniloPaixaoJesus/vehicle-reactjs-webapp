import React from 'react';



function DefaultCard ({infos}){
    return (
        <div className="card-list">
            {infos && infos.map(function(info,index){
                
                let status = 'online'; 
                if(info.status == 'OFF'){
                    status = 'offline';
                }
                
                return (<div className={"card "+status} key={index}>
                    <ul className="infos">
                        <li>
                            <h5>VIN</h5>
                            <p>{info.vin}</p>
                        </li>
                        <li>
                            <p>{info.driverName}</p>
                            <p>{info.driverLicenseCategory}</p>
                            <p>{info.driverAddress}</p>
                        </li>
                        <li className="status">
                            <span>{status}</span>
                        </li>
                    </ul>
                </div>
                )
            })}
        </div>
    );
}

export default DefaultCard;

