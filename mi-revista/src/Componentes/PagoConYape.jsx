import React, { useEffect, useState } from 'react';

// Este es el botón de pago que lleva a la página de Mercado Pago
const PagoConYape = () => {
  const [preferenceId, setPreferenceId] = useState('');

  useEffect(() => {
    // Enviar solicitud al backend para crear la preferencia de pago
    const crearPreferenciaDePago = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/create_preference', {
          method: 'POST',
        });
        const data = await response.json();
        setPreferenceId(data.preferenceId);  // Obtener el ID de preferencia
      } catch (error) {
        console.error('Error al crear preferencia de pago', error);
      }
    };

    crearPreferenciaDePago();
  }, []);

  const handlePago = () => {
    if (!preferenceId) {
      alert('Esperando a crear la preferencia...');
      return;
    }
    // Redirigir al usuario a la URL de pago de Mercado Pago
    window.location.href = `https://www.mercadopago.com.pe/checkout/v1/redirect?pref_id=${preferenceId}`;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Pagar con Yape/Plin</h2>
      <p className="text-gray-600 mb-4">Presiona el botón para proceder con el pago.</p>
      <button
        onClick={handlePago}
        className="bg-green-600 text-white p-3 rounded-full w-full hover:bg-green-700 transition"
      >
        Pagar ahora
      </button>
    </div>
  );
};

export default PagoConYape;
