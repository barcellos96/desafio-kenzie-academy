import { AppDataSource } from "../../data-source";
import { IContactUpdate } from "../../interfaces/Contact";
import { Contact } from "../../entities/contact.entity";

const contactUpdateSelfService = async ({
  id,
  name,
  email,
  contact,
  id_contact,
}: IContactUpdate) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contactsList = await contactRepository.find();
  const contactData = contactsList.find((contact) => contact.id === id_contact);

  const contactUpdate = {
    name: name || contactData?.name,
    email: email || contactData?.email,
    contact: contact || contactData?.contact,
  };

  await contactRepository.update(contactData!.id, {
    ...contactUpdate,
  });

  return { ...contactUpdate };
};

export default contactUpdateSelfService;
