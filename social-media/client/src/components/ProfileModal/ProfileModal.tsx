import { Modal, useMantineTheme } from "@mantine/core";

const ProfileModal = ({ modalOpened, setModalOpened }: any) => {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayProps={{
        color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      title="Edit Your Info"
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="info-form">
        <h3>Your info</h3>
        <div>
          <input type="text" className="info-input" name="FirstName" placeholder="First Name" />
          <input type="text" className="info-input" name="LastName" placeholder="Last Name" />
        </div>
        <div>
          <input type="text" className="info-input" name="worksAT" placeholder="Works at" />
        </div>
        <div>
          <input type="text" className="info-input" name="livesIN" placeholder="LIves in" />
          <input type="text" className="info-input" name="Country" placeholder="Country" />
        </div>
        <div>
          <input type="text" className="info-input" placeholder="RelationShip Status" />
        </div>
        <div>
          Profile Image
          <input type="file" name="profileImg" />
          Cover Image
          <input type="file" name="coverImg" />
        </div>
        <button className="button info-button">Update</button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
