import Protected from "../components/common/protected";
import Cart from "../components/pages/protectedPages/cart/Cart";
import Wishlist from "../components/pages/protectedPages/wishlist/Wishlist";

const ProtectedRoutes = [
   {
      path: "/cart",
      component: (
         <Protected>
            <Cart />
         </Protected>
      ),
   },
   {
      path: "/wishlist",
      component: (
         <Protected>
            <Wishlist />
         </Protected>
      ),
   },
   //   {
   //     path: "/dashboard/ticket",
   //     component: (
   //       <Protected>
   //         <TicketPage />
   //       </Protected>
   //     )
   //   },
   //   {
   //     path: "/checkout",
   //     component: (
   //       <Protected>
   //         <CheckoutPage />
   //       </Protected>
   //     )
   //   },
   //   {
   //     path: "/confirmation",
   //     component: (
   //       <Protected>
   //         <ConfirmationPage />
   //       </Protected>
   //     )
   //   },
   //   {
   //     path: "/ticket-info/:bookingId",
   //     component: (
   //       <Protected>
   //         <TicketInfoPage />
   //       </Protected>
   //     )
   //   },
   //   {
   //     path: "/payment/failed/:bookingId",
   //     component: (
   //       <Protected>
   //         <PaymentFailed />
   //       </Protected>
   //     )
   //   }
];

export default ProtectedRoutes;
