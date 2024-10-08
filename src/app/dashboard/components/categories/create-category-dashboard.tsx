import { createCategory } from "@/services/categories-service";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function CreateCategoryDashboard({
  handleReload,
}: {
  handleReload: () => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleCreateCategory = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };

    await createCategory(data);
    handleReload(); 
  };
  return (
    <>
      <Button onPress={onOpen} color="success" className="text-white">
        Crear categoria
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <form
                onSubmit={(e) => {
                  handleCreateCategory(e);
                  onClose();
                }}
              >
                <ModalHeader className="flex flex-col gap-1">
                  Crear categoria
                </ModalHeader>
                <ModalBody>
                  <div className="flex gap-x-2">
                    {/* Nombre */}
                    <Input type="text" name="name" label="Nombre" isRequired />

                    {/* Descripción */}
                    <Input
                      type="textarea"
                      name="description"
                      label="Descripción"
                      isRequired
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit">
                    Crear categoria
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
