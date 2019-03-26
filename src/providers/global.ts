var data = JSON.parse(localStorage.getItem('userData'));
var idUser = "";
var idbikeUser = ""
var bikeAngel = "";
var idBikeUser = "";


if(data!=null)
{
    //id del usuario de local storage
    idUser = data.id;

    //si es biciusuario se obtiene el id del mismo
    if(data.bike_user != null)
    {
        idBikeUser = data.bike_user.id;
    }
    //si es biciangel se obtiene el id del mismo
    else if(data.bike_angel != null)
    {
        bikeAngel = data.bike_angel.id;
    }
}

//produccion
export var GLOBAL= {
    url: 'https://biciangel.org/api/',
    urlsergio:'https://biciangel.org/api/',
    bikeUser: idUser,
    idBikeUser: idBikeUser,
    bikeAngel: bikeAngel,
    idUserOfBikeAngel: idUser
};


//local santiagoo
// export var GLOBAL= {
//     url: 'http://192.168.1.2:8080/bici/public/api/',
//     urlsergio:'http://192.168.1.2:8080/bici/public/api/',
//     bikeUser: idUser,
//     idBikeUser: idBikeUser,
//     bikeAngel: bikeAngel,
//     idUserOfBikeAngel: idUser
// };


//local sergio
// export var GLOBAL= {
//     url: 'http://127.0.0.1:8000/api/',
//     urlsergio:'http://127.0.0.1:8000/api/',
//     bikeUser: idUser,
//     idBikeUser: idBikeUser,
//     bikeAngel: bikeAngel,
//     idUserOfBikeAngel: idUser
// };