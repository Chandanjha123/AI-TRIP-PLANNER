import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const Header = () => {
    const [openDialog, setOpenDialog] = useState(false);


   const user = JSON.parse(localStorage.getItem('user'))

     const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error(error),
  });

    const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: { Authorization: `Bearer ${tokenInfo.access_token}` },
        }
      );
      localStorage.setItem("user", JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload()
    } catch (err) {
      console.error("Failed to get user profile:", err);
      toast("Failed to sign in. Try again.");
    }
  };

   useEffect(() => (
      console.log(user)
   ))
   return (
      <div className='p-3 shadow-sm flex justify-between items-center bg-white'>
         <a href="/">
         <img src="/logonew.svg" alt="" className='w-[10rem] hover:scale-105 cursor-pointer'  />
         </a>
         <div className='mr-2'>
            {user ?
               <div className='flex items-center gap-3 '>

                  <a href="/my-trips">
                  <Button variant={"outline"} className={"rounded-full"}>My Trips</Button>
                  </a>

                  <DropdownMenu>
                     <DropdownMenuTrigger><img src={user?.picture} alt="" className='h-[35px] w-[35px] rounded-full ' /></DropdownMenuTrigger>
                     <DropdownMenuContent>
                        <DropdownMenuItem

                           className="px-3 py-2 text-red-600 hover:bg-slate-100 cursor-pointer">

                           <h2 onClick={() => {
                              googleLogout();
                              localStorage.clear();
                              window.location.reload();
                              

                              

                           }}>LogOut</h2></DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div> :
               <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
            }
         </div>
         <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>
                     <img src="/logonew.svg" alt="Logo" className="w-[8rem]" />
                  </DialogTitle>
                  <DialogDescription>
                     <h2 className="font-bold text-lg text-gray-500 mt-7">Sign In with Google</h2>
                     <p>You must be logged in to create a trip.</p>
                     <Button onClick={login} className="w-full mt-5 flex gap-4 items-center shadow-sm">
                        <FcGoogle className="h-9 w-9" /> Sign In with Google
                     </Button>
                  </DialogDescription>
               </DialogHeader>
            </DialogContent>
         </Dialog>
      </div>
   )
}

export default Header
