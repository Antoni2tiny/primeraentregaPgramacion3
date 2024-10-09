// Función que envía una notificación a un cliente cuando hay un cambio 
//en el estado de su reclamo

exports.notifyChange = (clientId, message) => {
   
    // Imprimimos un mensaje en la consola simulando el envío de la notificación
    console.log(`Notificación para el cliente ${clientId}: ${message}`);
};
