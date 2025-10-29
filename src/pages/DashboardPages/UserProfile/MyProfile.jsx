import React, { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import Container from "../../../components/shared/Container";
import PersonalInfoUpdateForm from "../../../components/Dashboard/Sidebar/PersonalInfoUpdate";
import AddressUpdateForm from "../../../components/Dashboard/Sidebar/AddressUpdateForm";
import Button from "../../../components/shared/Buttons/Button";
import PasswordUpdateForm from "../../../components/Dashboard/Sidebar/PasswordUpdate";
import PasswordUpdate from "../../../components/Dashboard/Sidebar/PasswordUpdate";
import {useAuth} from "../../../hooks/useAuth";

const MyProfile = () => {
  const {user, loading} = useAuth();
  const { theme } = useTheme();
  const [isInfoModal, setIsInfoModal] = useState(true);
  const [isAddressModal, setIsAddressModal] = useState(false);
  const [isPasswordModal, setIsPasswordModal] = useState(false);

  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =
    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";
    if(loading) return <h2>loading ...</h2>

  return (
    <div className={`${themeBackgroundStyle} min-h-screen`}>
      <Container>
        <div className="flex items-center justify-end ">
          <Button
            label="Update Info"
            onClick={() => {
              setIsInfoModal(true),
                setIsAddressModal(false),
                setIsPasswordModal(false);
            }}
          />

          <Button
            label="Update Address"
            onClick={() => {
              setIsInfoModal(false),
                setIsAddressModal(true),
                setIsPasswordModal(false);
            }}
          />

          <Button
            label="Update Password"
            onClick={() => {
              setIsInfoModal(false),
                setIsAddressModal(false),
                setIsPasswordModal(true);
            }}
          />
        </div>
        {/* User Info Update ------------------------------------------------ */}
        <div
          className={`${themeForegroundStyle} min-h-[calc(100vh-80px)] rounded-md overflow-hidden pb-6 px-6 flex flex-col gap-6 justify-end`}
        >
          <div className={`${themeFgOfFgStyle} w-full bg-orange-200 h-30 rounded-lg `}>
            <div className="w-20 h-20 rounded-full overflow-hidden"> 
              <img
              src={user?.photoURL}
              className="w-full h-full object-cover"
            />
            </div>
          </div>

          <div>
            {isInfoModal && <PersonalInfoUpdateForm />}
            {isAddressModal && <AddressUpdateForm />}
            {isPasswordModal && <PasswordUpdate />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyProfile;
