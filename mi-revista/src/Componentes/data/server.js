const express = require('express');
const mercadopago = require('mercadopago');

// Configura el token de Mercado Pago (en producción usa tu token real)
mercadopago.configurations.setAccessToken('TU_ACCESS_TOKEN_DE_MERCADO_PAGO');

const app = express();
const PORT = 5000;

app.use(express.json());

// Ruta para crear la preferencia de pago
app.post('/api/create_preference', (req, res) => {
  const preference = {
    items: [
      {
        title: 'Suscripción Premium',
        unit_price: 5.00,
        quantity: 1,
      },
    ],
    back_urls: {
      success: 'http://localhost:3000/pago-exitoso',
      failure: 'http://localhost:3000/pago-fallido',
      pending: 'http://localhost:3000/pago-pendiente',
    },
    auto_return: 'approved',
  };

  mercadopago.preferences.create(preference)
    .then((response) => {
      res.json({ preferenceId: response.body.id });
    })
    .catch((error) => {
      console.error('Error al crear la preferencia', error);
      res.status(500).send('Error al crear la preferencia');
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
