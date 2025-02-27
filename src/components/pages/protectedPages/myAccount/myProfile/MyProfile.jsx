import CircleIcon from "@mui/icons-material/Circle";
import { useMediaQuery } from "@mui/material";
import React from "react";
import { useGetUserSingleQuery } from "../../../../../api/siteSlice";
import useModal from "../../../../../hooks/useModal";
import { getSiteDetail } from "../../../../../utils/helpers";
import CustomModal from "../../../../common/CustomModal/CustomModal";
import LazyLoadPage from "../../../../common/lazyLoadPage/LazyLoadPage";
import PasswordForm from "./PasswordForm";
import ProfileForm from "./ProfileForm";
const MyProfile = () => {
   const userData = getSiteDetail()?.userData;
   const { modals, handleOpen, handleClose } = useModal();
   const isMobile = useMediaQuery("(max-width: 1048px)");

   const {
      data: userDetailData,
      isLoading: isUserDetailDataLoading,
      isFetching: isUserDetailDataFetching,
   } = useGetUserSingleQuery(userData?.id, { skip: !userData?.id });

   console.log({ userData });

   return (
      <>
         <div className="flex flex-col">
            <div className="text-[24px] font-[500] border-b-[1px] pb-[14px] w-fit mb-[36px] border-[#0D74D6]">
               My Profile
            </div>
            {isUserDetailDataFetching ? (
               <LazyLoadPage />
            ) : (
               <div>
                  <div className="flex flex-col max-w-[100%] mb-[40px]">
                     <div className="text-[20px] font-[500] mb-[12px] border-[#ddd] border-b-[1px] pb-[8px]">
                        Profile Details
                     </div>
                     <div className="flex flex-row mb-[10px]">
                        <div className="text-[18px] font-[400] min-w-[150px]">
                           Name:
                        </div>
                        <div className="text-[18px] font-[400] mr-[14px]">
                           {userDetailData?.data?.name}
                        </div>
                        <button
                           onClick={() =>
                              handleOpen("user_profile_name_edit")
                           }
                           className="font-[500] text-[12px] px-[10px] py-[-2px] rounded-[4px] text-[#0D74D6] bg-[#0d75d61f]"
                        >
                           Edit
                        </button>
                     </div>
                     <div className="flex flex-row">
                        <div className="text-[18px] font-[400] min-w-[150px]">
                           Email:
                        </div>
                        <div className="text-[18px] font-[400] mr-[14px]">
                           {userDetailData?.data?.email}
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col max-w-[100%]">
                     <div className="text-[20px] font-[500] mb-[12px] border-[#ddd] border-b-[1px] pb-[8px]">
                        Login Details
                     </div>
                     <div className="flex flex-row mb-[10px]">
                        <div className="text-[18px] font-[400] min-w-[150px]">
                           Password:
                        </div>
                        <div className="text-[18px] font-[400] flex flex-row mr-[14px]">
                           {[...Array(8)].map((_, index) => (
                              <div key={index}>
                                 <CircleIcon
                                    sx={{
                                       color: "#0D74D6",
                                       fontSize: "8px",
                                    }}
                                 />
                              </div>
                           ))}
                        </div>
                        <button
                           onClick={() =>
                              handleOpen("user_password_edit")
                           }
                           className="font-[500] text-[12px] px-[10px] py-[-2px] rounded-[4px] text-[#0D74D6] bg-[#0d75d61f]"
                        >
                           Edit
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>

         <CustomModal
            open={modals?.user_profile_name_edit}
            width={isMobile ? "90%" : "550px"}
            handleClose={() => handleClose("user_profile_name_edit")}
            modalTitle={"Update Profile"}
         >
            <ProfileForm
               row={userDetailData?.data}
               handleClose={() =>
                  handleClose("user_profile_name_edit")
               }
            />
         </CustomModal>
         <CustomModal
            open={modals?.user_password_edit}
            width={isMobile ? "90%" : "550px"}
            handleClose={() => handleClose("user_password_edit")}
            modalTitle={"Update Password"}
         >
            <PasswordForm
               row={userDetailData?.data}
               handleClose={() => handleClose("user_password_edit")}
            />
         </CustomModal>
      </>
   );
};

export default MyProfile;
