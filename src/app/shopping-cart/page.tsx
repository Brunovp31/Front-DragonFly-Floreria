"use client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCart } from "../context/cart-context";
import { useState } from "react";
import Map from "@/components/google-map";

const documentRules = {
  DNI: 8,
  RUC: 11,
  "Carnet de extranjería": 12,
  Pasaporte: 9,
};

export default function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    documentType: "",
    documentNumber: "",
    shippingAddress: "",
    deliveryDate: "",
    deliveryTime: "",
  });
  const [isValid, setIsValid] = useState(true);
  const [docError, setDocError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    documentNumber: false,
    deliveryDate: false,
    deliveryTime: false,
  });

  const documentTypes = ["DNI", "RUC", "Carnet de extranjería", "Pasaporte"];
  const timeOptions = ["12:00 a 14:00", "15:00 a 17:00", "18:00 a 20:00"];

  // Calculate total
  const total = cart.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  const igvPercentage = 0.18; // 18%
  const subtotal = total / (1 + igvPercentage);
  const igv = total - subtotal;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "documentNumber") {
      const docType = customerDetails.documentType;
      const maxLength = documentRules[docType];
      if (value.length > maxLength) return;
      setDocError(value.length !== maxLength ? `Debe tener ${maxLength} caracteres` : "");
    }

    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Check if field is required and mark as invalid if empty
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value && (name !== "documentNumber" || customerDetails.documentType),
    }));
  };

  const handleDocumentTypeChange = (value: string) => {
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      documentType: value,
      documentNumber: "",
    }));
    setDocError("");
  };

  const validateForm = (): boolean => {
    const {
      firstName,
      lastName,
      email,
      phone,
      documentType,
      documentNumber,
      shippingAddress,
      deliveryDate,
      deliveryTime,
    } = customerDetails;

    const isValid = [
      firstName,
      lastName,
      email,
      phone,
      documentType,
      documentNumber,
      shippingAddress,
      deliveryDate,
      deliveryTime,
    ].every(Boolean);

    setIsValid(isValid);
    return isValid;
  };
  
  const handleProceedToPayment = () => {
   window.open("https://mpago.la/2k1anq8","_self")
    // const valid = validateForm();
    // if (valid) {
    //   alert("Formulario válido. Procediendo al pago...");
    //   // Add logic to process payment
    // } else {
    //   alert("Por favor completa todos los campos obligatorios.");
    //   // Update field errors to show validation messages
    //   setFieldErrors({
    //     firstName: !customerDetails.firstName,
    //     lastName: !customerDetails.lastName,
    //     email: !customerDetails.email,
    //     phone: !customerDetails.phone,
    //     documentNumber: !customerDetails.documentNumber,
    //     deliveryDate: !customerDetails.deliveryDate,
    //     deliveryTime: !customerDetails.deliveryTime,
    //   });
    // }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Información del Cliente</h2>
          <form className="flex flex-col gap-6">
            <div className="flex items-center gap-x-2 justify-between">
              <Input
                label="Nombres"
                name="firstName"
                value={customerDetails.firstName}
                onChange={handleInputChange}
                required
                className={fieldErrors.firstName ? "border-red-500" : ""}
              />
              <Input
                label="Apellidos"
                name="lastName"
                value={customerDetails.lastName}
                onChange={handleInputChange}
                required
                className={fieldErrors.lastName ? "border-red-500" : ""}
              />
            </div>
            <div className="flex items-center gap-x-2 justify-between">
              <Input
                label="Correo Electrónico"
                name="email"
                value={customerDetails.email}
                onChange={handleInputChange}
                required
                className={fieldErrors.email ? "border-red-500" : ""}
              />
              <Input
                label="Número de Teléfono"
                name="phone"
                value={customerDetails.phone}
                onChange={handleInputChange}
                required
                className={fieldErrors.phone ? "border-red-500" : ""}
              />
            </div>
            <div className="flex items-center gap-x-2 justify-between">
              <Select
                label="Tipo de Documento"
                name="documentType"
                value={customerDetails.documentType}
                onChange={(e) => handleDocumentTypeChange(e.target.value)}
                required
                className={fieldErrors.documentType ? "border-red-500" : ""}
              >
                <SelectItem value="">Seleccionar...</SelectItem>
                {documentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Número de Documento"
                name="documentNumber"
                value={customerDetails.documentNumber}
                onChange={handleInputChange}
                required
                className={fieldErrors.documentNumber ? "border-red-500" : ""}
              />
              {docError && <p className="text-red-500">{docError}</p>}
            </div>

            <h2 className="text-2xl font-bold mb-4">Datos de envío</h2>
            <div className="flex items-center gap-x-2 justify-between">
              <Input
                type="date"
                label="Fecha de Entrega"
                name="deliveryDate"
                value={customerDetails.deliveryDate}
                onChange={handleInputChange}
                required
                className={fieldErrors.deliveryDate ? "border-red-500" : ""}
              />
              <Select
                label="Rango de Hora"
                name="deliveryTime"
                value={customerDetails.deliveryTime}
                onChange={handleInputChange}
                required
                className={fieldErrors.deliveryTime ? "border-red-500" : ""}
              >
                <SelectItem value="">Seleccionar...</SelectItem>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </form>
          {!isValid && (
            <p className="text-red-500">
              Por favor completa todos los campos obligatorios.
            </p>
          )}
        </div>

        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md h-auto min-h-[400px]">
          <h2 className="text-2xl font-bold mb-4">Resumen del Pedido</h2>
          <Table>
            <TableHeader>
              <TableColumn>Imagen</TableColumn>
              <TableColumn>Producto</TableColumn>
              <TableColumn>Cantidad</TableColumn>
              <TableColumn>Precio</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = Number(e.target.value);
                        updateQuantity(item.id, newQuantity);

                        // Remove item if quantity is 0
                        if (newQuantity === 0) {
                          removeFromCart(item.id);
                        }
                      }}
                      className="w-16"
                    />
                  </TableCell>
                  <TableCell>S/. {item.productPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <p>
              <strong>Subtotal:</strong> S/. {subtotal.toFixed(2)}
            </p>
            <p>
              <strong>IGV (18%):</strong> S/. {igv.toFixed(2)}
            </p>
            <p>
              <strong>Total:</strong> S/. {total.toFixed(2)}
            </p>
          </div>
          <Button className="mt-4" onClick={handleProceedToPayment}>
            Proceder al Pago
          </Button>
        </div>

      </div>
      <Map />
    </div>
  );
}
