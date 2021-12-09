import React, { FunctionComponent, useState } from "react";
import axios from "../config/axiosInstance";
import { useRouter } from "next/router";
import profileStyles from "../styles/Profile.module.scss";

interface IPost {
  date: string;
  title: string;
  description: string;
  author: string;
}

interface IProps {
  data: {
    buttonStatus: boolean;
    username: string;
    bio: string;
    showSubscribe: boolean;
    posts: IPost[];
  };
}

const ProfileForm: FunctionComponent<IProps> = ({ data }: IProps) => {
  const router = useRouter();
  const [button, setButton] = useState(data.buttonStatus);
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState(data.bio);

  return (
    <div className={profileStyles.profileInfoWrapper}>
      <div className={profileStyles.profileInfo}>
        <div className={profileStyles.name}>{data.username}</div>
        <div className={profileStyles.bio}>
          {!edit ? (
            bio
          ) : (
            <textarea onChange={(e) => setBio(e.target.value)} className={profileStyles.editBio}>
              {bio}
            </textarea>
          )}
        </div>
      </div>
      {!data.showSubscribe &&
        (!edit ? (
          <div className={profileStyles.subscribe} onClick={() => setEdit(!edit)}>
            Edit Bio
          </div>
        ) : (
          <div
            className={profileStyles.subscribe}
            onClick={() => {
              setEdit(!edit);
              axios.post(`bio/${router.query.username}`, { bio: bio }, { headers: { access_token: document.cookie.slice(13) } });
            }}
          >
            Save Bio
          </div>
        ))}
      {data.showSubscribe &&
        (button ? (
          <div onClick={() => axios.post(`subscribe/${router.query.username}`, {}, { headers: { access_token: document.cookie.slice(13) } }).then(() => setButton(!button))} className={profileStyles.subscribe}>
            Unsubscribe
          </div>
        ) : (
          <div
            onClick={() =>
              axios.post(`subscribe/${router.query.username}`, {}, { headers: { access_token: document.cookie.slice(13) } }).then(
                () => setButton(!button),
                () => alert("You are not logged in.")
              )
            }
            className={profileStyles.subscribe}
          >
            Subscribe
          </div>
        ))}
    </div>
  );
};

export default ProfileForm;
