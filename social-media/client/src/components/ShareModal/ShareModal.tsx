import { Modal, useMantineTheme } from "@mantine/core";
import { PostShare } from "@/components";

const ShareModal = ({ modalOpened, setModalOpened }: any) => {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayProps={{
        color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      title="Share Your Thought"
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <PostShare />
    </Modal>
  );
};
export default ShareModal;
