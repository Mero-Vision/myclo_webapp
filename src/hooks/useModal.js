import { useCallback, useState } from "react";

/*Use this component as:

const { modals, row, handleOpen, handleClose } = useModal();
<Button onClick = {() => handleOpen("modalType", row)}>Open</Button>
handleClose={() => handleClose("modalType")}

*/

const useModal = () => {
   const [modals, setModals] = useState({});
   const [row, setRow] = useState();

   const handleOpen = useCallback((type, row) => {
      setRow(row);
      setModals((prev) => {
         return {
            ...prev,
            [type]: true,
         };
      });
   }, []);

   const handleClose = useCallback((type) => {
      setModals((prev) => {
         return {
            ...prev,
            [type]: false,
         };
      });
   }, []);

   return { modals, row, handleOpen, handleClose };
};

export default useModal;
