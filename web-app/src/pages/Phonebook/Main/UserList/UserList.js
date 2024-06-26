import { useEffect, useState } from "react";
import AccountItem from "./AccountItem/AccountItem";
import Layout from "../Layout/Layout";
const Users = [
   {
      name: "Nguyễn Văn A",
      avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
   },
   {
      name: "Nguyễn Văn A",
      avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
   },
   {
      name: "Nguyễn Văn A",
      avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
   },
   {
      name: "Nguyễn Văn A",
      avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
   },
   {
      name: "Nguyễn Văn A",
      avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
   }
]
function UserList() {

   useEffect(() => {
   }, [])
   const [data, setData] = useState([]);

   const handleSearchUser = () => {
   }

   return (
      <Layout
         onSearch={handleSearchUser}
      >
         <div id="user_list" style={{ padding: "16px" }}>
            {Users.map((item, index) => (
               <AccountItem
                  key={index}
                  name={item.name}
                  avatar={item.avatar}
               />
            ))}
         </div>
      </Layout>
   );
}

export default UserList;