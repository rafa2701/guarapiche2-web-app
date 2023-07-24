// import React from 'react'
import { useState } from "react";
// import reactLogo from "../assets/react.svg";
// import viteLogo from "/vite.svg";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { Form, Button, Alert } from 'react-bootstrap';
import { supabase } from '../utils/SupabaseClient';

const Registro = () => {
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cedula, setCedula] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [error, setError] = useState('');

  let registro = {
    phoneNumber: '',
    cedula: '',
    carPlate: ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!phoneNumber || !cedula || !carPlate) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    registro = {
        telefono: phoneNumber,
        cedula: cedula,
        placa: carPlate
      }
    // Handle form submission logic here
    // const { data, error } = await supabase
    // .from('Registros')
    // .insert([
    //   { telefono: phoneNumber,
    //     cedula: cedula,
    //     placa: carPlate },
    // ])
    // .select()
    async function checkAndInsertData() {
      const { data: Registros, error } = await supabase
        .from('registro')
        .select('*')
        .eq('telefono', Registros.telefono)
        .eq('cedula', Registros.cedula)
        .eq('placa', Registros.placa);
    
      if (error) {
        console.error('Ha Ocurrido un error:', error);
        return;
      }
    
      if (registro.length > 0) {
        console.log('Error: Value already exists in the database');
        return;
      }
    
      // Insert the row with the provided info
      const { data: registro, error: insertError } = await supabase
        .from('registro')
        .insert([registro]);
    
      if (insertError) {
        console.error('No hemos podido completar el registro:', insertError);
        return;
      }
    
      console.log('Data inserted successfully:', insertedData);
    }
    
    // Call the function to check and insert data
    checkAndInsertData();

    error?console.log(error):console.log(data);
    // Reset form
    setPhoneNumber('');
    setCedula('');
    setCarPlate('');
    setError('');
  };

  const handleReset = () => {
    setPhoneNumber('');
    setCedula('');
    setCarPlate('');
    setError('');
  };

  return (
    <>

      <div className="card">
      <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group controlId="phoneNumber">
        <Form.Label className="mt-2">Numero de Telefono</Form.Label>
        <Form.Control
          type="tel"
          placeholder="EJ: 042412345678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="cedula">
        <Form.Label className="mt-2">Cedula</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su número de cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="carPlate">
        <Form.Label className="mt-2">Placa de Vehiculo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese la placa de su vehiculo"
          value={carPlate}
          onChange={(e) => setCarPlate(e.target.value)}
        />
      </Form.Group>
        <div className="mt-4 flex gap-5">
            <Button className="mx-2" variant="primary" type="submit">
            Enviar
            </Button>

            <Button className="mx-2" variant="secondary" onClick={handleReset}>
                Limpiar
            </Button>
        </div>
      
    </Form>
       
      </div>
      <p className="mt-4 read-the-docs">
        Sistema de Censo Virtual para E/S Guarapiche 2
      </p>
    </>
  );
};

export default Registro;
