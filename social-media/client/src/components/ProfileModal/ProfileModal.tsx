import { useState } from "react";
import "./ProfileModal.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { uploadFile } from "@/apis/upload";
import { updateUser } from "@/apis/user";
import { updatingFail, updatingStart, updatingSuccess } from "@/feature/authSlice";

const ProfileModal = ({ modalOpened, setModalOpened, user }: any) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { password, ...data } = user;
  const [formData, setFormData] = useState(data);
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [coverPicture, setCoverPicture] = useState<any>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let newData = formData;
    if (profilePicture) {
      const data = new FormData();
      const filename = crypto.randomUUID() + profilePicture.name;
      data.append("name", filename);
      data.append("file", profilePicture);
      newData.profilePicture = filename;
      try {
        uploadFile(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (coverPicture) {
      const data = new FormData();
      const filename = crypto.randomUUID() + coverPicture.name;
      data.append("name", filename);
      data.append("file", coverPicture);
      newData.coverPicture = filename;
      try {
        uploadFile(data);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updatingStart());
    const { data, status } = await updateUser(user._id, newData);
    if (status === 200) dispatch(updatingSuccess(data));
    else dispatch(updatingFail(data));
    setModalOpened(false);
  };

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
          <input
            type="text"
            className="info-input"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.fullName}
          />
          <input
            type="text"
            className="info-input"
            name="userName"
            placeholder="User Name"
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div>
          <input
            type="text"
            className="info-input"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="info-input"
            name="livesIn"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesIn}
          />
          <input
            type="text"
            className="info-input"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div>
          <input
            type="text"
            className="info-input"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        <div>
          Profile Image
          <input
            type="file"
            name="profilePicture"
            onChange={(e: any) => setProfilePicture(e.target.files[0])}
          />
          Cover Image
          <input
            type="file"
            name="coverPicture"
            onChange={(e: any) => setCoverPicture(e.target.files[0])}
          />
        </div>
        <button className="button info-button" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
