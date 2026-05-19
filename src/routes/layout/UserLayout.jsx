import { Footer } from '@/components/footer';
import { Header } from '@/components/Header';
// import { getLoggedInUser } from '@/service/auth.service';
// import { useAuthStore } from '@/store/auth';
// import { useQuery } from '@tanstack/react-query';
// import { useEffect } from 'react';

const UserLayout = ({ children }) => {
  // const {user,removeUser} = useAuthStore(state => state)

  // const { data: userDetail, isLoading: isUserLoading,isError} = useQuery({
  //   queryKey: ["user"],
  //   queryFn: getLoggedInUser,

  //   // enabled: !user
  // });

  // useEffect(()=>{

  //   if(isError){
  //     removeUser();
  //   }

  // },[isError])

  // if(isUserLoading){
  //   return "loading...."
  // };

  // console.log(user)
  // console.log(error);

  return (
    <div>
      {/*----------------------------- header start here ------------ */}
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
