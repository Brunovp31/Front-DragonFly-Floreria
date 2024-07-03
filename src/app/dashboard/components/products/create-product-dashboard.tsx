import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

export default function CreateProductDashboard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const categories = [
    { key: "plantas", label: "Plantas" },
    { key: "macetas", label: "Macetas" },
    { key: "semillas", label: "Semillas" },
    { key: "herramientas", label: "Herramientas" },
    { key: "sustratos", label: "Sustratos" },
    { key: "fertilizantes", label: "Fertilizantes" },
    { key: "accesorios", label: "Accesorios" },
  ];
  return (
    <>
      <Button onPress={onOpen} color="success" className="text-white">
        Crear producto
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <form
                onSubmit={(e: any) => {
                  console.log(e);
                }}
              >
                <ModalHeader className="flex flex-col gap-1">
                  Crear producto
                </ModalHeader>
                <ModalBody>
                  <div className="flex gap-x-2">
                    {/* Nombre */}
                    <Input type="name" label="Nombre" isRequired />

                    {/* Descripción */}
                    <Input type="textarea" label="Descripción" isRequired />
                  </div>

                  <div className="flex gap-x-2">
                    {/* Precio */}
                    <Input
                      label="Precio"
                      placeholder="0.00"
                      type="number"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      isRequired
                    />

                    {/* Stock */}
                    <Input
                      label="Stock"
                      type="number"
                      placeholder="0"
                      isRequired
                    />
                  </div>

                  <div className="flex gap-x-2">
                    {/* Categoría */}
                    <Select label="Selecciona una categoria" isRequired>
                      {categories.map((category: any) => (
                        <SelectItem key={category.key}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </Select>

                    {/* Color */}
                    <Input
                      label="Color"
                      placeholder="Ejemplo: Verde"
                      isRequired
                    />
                  </div>

                  {/* Tipo de Planta */}
                  <Input
                    label="Tipo de planta"
                    placeholder="Ejemplo: Suculenta"
                    isRequired
                  />

                  {/* Descuento */}
                  <Input
                    label="Descuento"
                    placeholder="0.00"
                    type="number"
                    isRequired
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">%</span>
                      </div>
                    }
                  />

                  {/* SKU */}
                  <Input
                    label="SKU"
                    placeholder="Ejemplo: 123456"
                    description="El SKU es un código único para cada producto. Autogenerado."
                    isReadOnly
                    isDisabled
                  />

                  {/* Imagen */}
                  <Input
                    type="file"
                    description="Selecciona una imagen para tu producto."
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={onClose} type="submit">
                    Crear producto
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
