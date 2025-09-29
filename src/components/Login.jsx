import { LogIn as LoginIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, firestore } from '../../firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

async function createUser(userData) {
  const userObject = userData.user;
  const { uid, displayName, email } = userObject;
  await setDoc(doc(firestore, "users", uid), {  //setDoc creates a user which doc is referencing(here user details) if it exists then it simply overwrites it thereby not creating the same user again
    email,
    name: displayName
  })
}

function Login() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const userData = await signInWithPopup(auth, new GoogleAuthProvider);
    await createUser(userData)
    navigate("/");
  }
  return (
    <>
      <div className="h-[200px] bg-[#23B180]">
        <div className="flex items-center ml-[200px] pt-[20px] z-0">
          <img src="https://www.pngplay.com/wp-content/uploads/8/Whatsapp-Download-Free-PNG.png" className="h-14 rounded-full" />
          <div className="text-white font-semibold">WHATSAPP</div>
        </div>
      </div>
      <div className="h-[calc(100vh-200px)] bg-white/80 flex items-center justify-center relative">
        <div className="bg-white h-[100%] w-[73%] shadow-2xl flex flex-col gap-4 justify-center items-center absolute -top-[100px] z-40">
          <img src="https://media.istockphoto.com/id/1439033600/vector/finger-print-vector-simple-logo-or-icon-incognito-man-concept-unidentified-person-people.jpg?s=612x612&w=0&k=20&c=6f3Ab1V7fmmzt0Llrnh-AVqwpBvxYhICKCJUVREfQ9k=" className="h-28 border-2 border-solid border-black rounded-full" />
          <div className="font-bold text-xl">Sign In</div>
          <p>Sign in with Google</p>
          <button onClick={handleLogin} className="group flex items-center justify-center gap-2 rounded-lg bg-[#23B180] text-white text-[20px] h-10 w-40">Sign In
            <LoginIcon />
          </button>
        </div>
      </div>
    </>
  )
}

export default Login